import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';  // Import the shopping cart icon
import PageBanner from './PageBanner'; // Import your PageBanner component
import '../Wishlist.css'; // Ensure you have the corresponding CSS file

const Wishlist = () => {
  // Dummy data for wishlisted products
  const wishlistedProducts = [
    { id: 1, name: 'Product 1', price: '$100', imageUrl: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: '$200', imageUrl: '/images/product2.jpg' },
    { id: 3, name: 'Product 3', price: '$300', imageUrl: '/images/product3.jpg' },
  ];

  const [wishlist, setWishlist] = useState(wishlistedProducts);

  // Function to add item to cart
  const handleAddToCart = (product) => {
    console.log(`${product.name} added to cart.`);
    // Logic to add the product to the cart (could be through a cart context or state)
  };

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(product => product.id !== id);
    setWishlist(updatedWishlist);
  };

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Wishlist', link: '/wishlist' }
  ];

  return (
    <>
      <PageBanner pageTitle="My Wishlist" breadcrumbs={breadcrumbs} />
      <div className="wishlist-page">
        {/* Page Banner with breadcrumbs */}
        <section className="wishlist-container">
          <div className="wishlist-heading">
            <h2>Your Wishlisted Products</h2>
          </div>

          {/* Wishlist Products List */}
          <div className="wishlist-products">
            {wishlist.length > 0 ? (
              wishlist.map((product) => (
                <div key={product.id} className="wishlist-product-card">
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price}</p>

                    {/* Add to Cart Button */}
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart />
                    </button>

                    {/* Remove from Wishlist Button */}
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your wishlist is currently empty.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Wishlist;
