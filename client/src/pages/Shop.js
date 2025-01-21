import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pb from '../components/PageBanner'

import axios from 'axios';
import useCategory from "../hooks/useCategory";
import { useCart } from '../context/Cart';
import '../shop.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import React Icons
import apiUrl from '../utils/config'

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const [products, setProducts] = useState([]);
    const categories = useCategory();
    const { cart, setCart } = useCart();
    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'Shop', link: '/shop' }
    ];

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${apiUrl}/get-products`
            );
            setProducts(data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);
    // Get current products based on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / productsPerPage);
    return (
        <>
            <Pb pageTitle="Shop" breadcrumbs={breadcrumbs} />
            {/* <div className="shop-container">

                <div className="shop-header">
                    <h1 className="page-title">SHOP</h1>
                    <div className="breadcrumb">
                        <Link to="/" className="breadcrumb-link">Home</Link> &gt; <span> Shop</span>
                    </div>
                </div>


                    <div className="category-card">
                        <div className="category-image kids"></div>
                        <div className="category-info">
                            <div>
                                <h3>Kids</h3>
                                <p>50 items</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <p>Showing all 12 results </p>
                    </div>
                    <div className='col-6' style={{ display: 'flex', justifyContent: 'right' }}>
                        <p>Sort:</p>
                    </div>
                </div>
                <div className="shop-body">
                    <div className="product-list">
                        {products.map((product, index) => (
                            <div key={index} className="product-card">
                                <div className="product-image" style={{ backgroundImage: `url('/images/men.jpg')` }}></div>
                                <div className="product-info">
                                    <h4>{product.name}</h4>
                                    <p>{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div> */}
            <div className="shop-container">
                <div className="shop-header">
                    <h1 className="page-title">SHOP</h1>
                    <div className="breadcrumb">
                        <Link to="/" className="breadcrumb-link">Home</Link> &gt; <span> Shop</span>
                    </div>
                </div>

                <div className='category-cards'>
                    {categories?.map((c) => {
                        // Map each category name to a corresponding image filename
                        const getCategoryImage = (categoryName) => {
                            const images = {
                                Men: "images/men.jpg",
                                Women: "images/Women.webp",
                                Kids: "images/kids.jpg",
                            };
                            return images[categoryName] || "images/default.jpg"; // Fallback to a default image
                        };
                        return (
                            <Link
                                key={c.c_id}
                                to={`/get-products-by-category/${c.c_name}`}
                                className="category-card-link"
                            >
                                <div className="category-card">
                                    <div className="category-image" style={{ backgroundImage: `url('${getCategoryImage(c.c_name)}')`, }}></div>
                                    <div className="category-info">
                                        <div>
                                            <h3>{c.c_name}</h3>
                                            <p>{c.product_count || '0'} items</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>


                <div className='row'>
                    <div className='col-6'>
                        <p>Showing all {products.length} results </p>
                    </div>
                    <div className='col-6' style={{ display: 'flex', justifyContent: 'right' }}>
                        <p>Sort:</p>
                    </div>
                </div>
                {/* Products & Filter Section */}
                <div className="shop-body">
                    {/* <div className="product-list">
                        {currentProducts?.map((p) => (
                            
                            <div key={p.p_id} className="product-card">
                                
                                <div className="product-image" style={{ backgroundImage: `url('../public/images/${p.p_img}')` }}></div>
                                <div className="product-info">
                                    <h4>{p.p_name}</h4>
                                    <p>{p.p_description.length > 100 ? p.p_description.substring(0, 75) + '...' : p.p_description}</p>
                                    <p className='p-price'>{p.p_price}</p>
                                </div>
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => {
                                        alert('Item Added to Cart')

                                        setCart([...cart, p]);
                                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                    }}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        ))}
                    </div> */}

                    {/* <div className="product-list">
                        {currentProducts.map((p) => {
                            const productImage = p.p_img
                                ? `${apiUrl}/${p.p_image}`
                                : "/images/men.jpg";

                            return (
                                <div className="product-card" key={p.p_id}>
                                    <div
                                        className="product-image"
                                        style={{ backgroundImage: `url('${productImage}')` }}
                                    ></div>
                                    <div className="product-info">
                                        <div style={{ color: '#333', fontSize: '20px', padding: '0' }}>{p.p_name}</div>
                                        <div style={{ color: '#555', fontSize: '12px' }}>{p.c_name}</div>
                                        <div style={{ color: '#555', fontSize: '12px' }}>
                                            {p.p_description.length > 100 ? p.p_description.substring(0, 75) + '...' : p.p_description}
                                        </div>
                                        <div className='p-price'>{p.p_price}</div>
                                    </div>
                                    <button
                                        className="add-to-cart-button"
                                        onClick={() => {
                                            const updatedCart = [...cart, p];
                                            alert('Item Added to Cart')

                                            setCart(updatedCart);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify(updatedCart)
                                            );
                                        }}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            );
                        })

                        }
                    </div> */}
                    <div className="product-list">
                    {products?.map((p) => (
                        <div  className="product-card">
                            <div className="product-image" style={{backgroundImage: `url(${apiUrl}/${p.p_image})`
 }}></div>
                            <div className="product-info">
                                <h4 style={{ color: '#333', fontSize: '20px', padding: '0' }}>{p.p_name}</h4>
                                <p  style={{ color: '#555', fontSize: '12px'}}>{p.p_description.length > 100 ? p.p_description.substring(0, 75) + '...' : p.p_description}</p>
                                <p className='p-price'>{p.p_price}</p>
                        </div>
                        <div >
                        <button
                      className="add-to-cart-button"
                      onClick={() => {
                       setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        ); //set cart in local storage
                      }}
                    >
                      Add To Cart
                    </button>
                        </div>
                        </div>
                    ))}
                </div>
                </div>
                {/* Pagination */}
                <div className="pagination-container my-5 w-100 mx-auto text-center">
                    <button
                        className="pagination-button" style={{ backgroundColor: 'transparent', color: 'rgb(0,80,0)', border: 'none' }}
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FaChevronLeft />
                    </button>
                    <span>
                        {currentPage} of {totalPages}
                    </span>
                    <button

                        className="pagination-button" style={{ backgroundColor: 'transparent', color: 'rgb(0,80,0)', border: 'none' }}
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <FaChevronRight />
                    </button>
                </div>

            </div>
        </>
    );
};

export default Shop;
