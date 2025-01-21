import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pb from "../components/PageBanner";
import axios from "axios";
import { useCart } from "../context/Cart";
import "../shop.css";
import apiUrl from '../utils/config'

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { cart, setCart } = useCart();


  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Shop", link: "/shop" },
    { label: 'New Arrivals', link: "/new-arrivals" },
  ];

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/new-arrivals`
      );
      setProducts(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  // const getProductsbyCategory = async () => {
  //     try {
  //         const { data } = await axios.get(`/get-products-by-category/${categoryName}`);
  //         if (data.success) {
  //             setProducts(data.products);
  //             setCategory(data.category);
  //         } else {
  //             setError("No products found for this category.");
  //         }
  //     } catch (error) {
  //         setError("An error occurred while fetching products.");
  //         console.error(error);
  //     }
  // };

  // useEffect(() => {
  //     if (categoryName) {
  //         getProductsbyCategory();
  //     }
  // }, [categoryName]);

  return (
    <>
      {/* <Pb pageTitle={'New Arrivals'} breadcrumbs={breadcrumbs} /> */}

      <div className="shop-container">
        <div className="shop-header">
          <h1 className="page-title">New Arrivals</h1>
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>{" "}
            &gt; <span>New Arrivals</span>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <p>Showing {products.length} results for New Arrivals</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="shop-body mb-5">
          <div className="product-list">
            {products.length > 0 ? (
              products.map((p) => {
                return ( // Added return statement here
                  <div className="product-card" key={p.p_id}>
                    <div
                      className="product-image"
                      style={{
                        backgroundImage: `url(${apiUrl}/${p.p_image})`,
                      }}
                    ></div>
                    <div className="product-info">
                      <div
                        style={{ color: '#333', fontSize: '20px', padding: '0' }}
                      >
                        {p.p_name}
                      </div>
                      <div style={{ color: '#555', fontSize: '12px' }}>{p.c_name}</div>
                      <div style={{ color: '#555', fontSize: '12px' }}>
                        {p.p_description.length > 100
                          ? p.p_description.substring(0, 75) + '...'
                          : p.p_description}
                      </div>
                      <div className="p-price">{p.p_price}</div>
                    </div>
                    <button
                      className="add-to-cart-button"
                      onClick={() => {
                        const updatedCart = [...cart, p];
                        alert('Item Added to Cart');

                        setCart(updatedCart);
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                );
              })
            ) : (
              <p>No products available in this category.</p>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default NewArrivals;
