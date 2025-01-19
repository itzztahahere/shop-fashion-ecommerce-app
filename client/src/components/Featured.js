import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../my.css';
import { useCart } from '../context/Cart';

const EditorsPick = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { cart, setCart } = useCart();


  // Fetch the featured products from the API
  const getFeaturedProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3308/get-products"); // Replace with your API endpoint
      setProducts(data?.data.slice(0, 4)); // Get only the first 8 products
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the products');
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <section className="editors-pick-section" style={{backgroundColor:'#f8f9fa'}}>
      {/* Section Title and Subtitle */}
      <div className="section-header">
        <h2>FEATURED PRODUCTS</h2>
        <p>Discover our top picks for this season</p>
      </div>

      {/* Error Message if Fetching Fails */}
      {error && <p className="error-message">{error}</p>}

      {/* Product Cards Container */}
      <div className="product-container">
      {products.length > 0 ? (
  products.map((product) => {
    return (
      <div className="product-card" key={product.p_id}>
        <div
          className="product-image"
          style={{
            backgroundImage: `url(http://localhost:3308/${product.p_image})`,
          }}
        ></div>
        <div className="product-info">
          <div className="product-title" style={{ color: '#333', fontSize: '18px' }}>
            {product.p_name}
          </div>
          <div className="product-category" style={{ color: '#555', fontSize: '12px' }}>
            {product.c_name}
          </div>
          <div
            className="product-description"
            style={{
              color: '#555',
              fontSize: '12px',
              maxHeight: '45px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.p_description.length > 100
              ? product.p_description.substring(0, 75) + '...'
              : product.p_description}
          </div>
          <div style={{ color: 'rgb(0,120,0)', fontSize: '25px' }} className="product-price">
            {product.p_price}
          </div>
        </div>
        <button
          className="add-to-cart-button"
          onClick={() => {
            alert('Item Added to Cart');
            setCart([...cart, product]);
            localStorage.setItem('cart', JSON.stringify([...cart, product]));
          }}
        >
          Add To Cart
        </button>
      </div>
    );
  })
) : (
  <p>No featured products available.</p>
)}

      </div>
    </section>
  );
};

export default EditorsPick;
