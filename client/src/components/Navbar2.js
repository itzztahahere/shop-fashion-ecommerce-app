import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSearch, FaShoppingCart, FaHeart, FaChevronDown } from 'react-icons/fa';
import '../navbar.css';
import { useUser } from '../context/userAuth'; // Import User Context
import { useCart } from '../context/Cart';
import useCategory from "../hooks/useCategory";
import apiUrl from '../utils/config'

const Navbar = () => {
  const navigate = useNavigate();
  const categories = useCategory();
  const { isLoggedIn, logout } = useUser();
  const { cart, setCart } = useCart();
  const [keyword, setKeyword] = useState('');




  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To control dropdown menu visibility

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchModal = () => setIsSearchModalOpen(!isSearchModalOpen); // Toggle search modal

  // Function for avatar click behavior
  const handleAvatarClick = () => {
    if (isLoggedIn) {
      setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span><Link className='n' to="/">SOFT</Link></span>
      </div>
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/new-arrivals">New Arrivals</Link></li>
        <li className="dropdown">
          <Link to="/shop">Shop <FaChevronDown size={10} className="dropdown-arrow" /></Link>
          <ul className="dropdown-menu">
            <li>
            </li>
            {categories?.map((c) => (
              <li key={c.id}>
                <Link
                  className="dropdown-item"
                  to={`/get-products-by-category/${c.c_name}`}
                >
                  {c.c_name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="icons">
        <div className="user-avatar">
          <FaUser size={18} onClick={handleAvatarClick} />  {/* User avatar icon */}
          {isLoggedIn && isDropdownOpen && (
            <div className="dropdown-menu">
              {/* <Link to="/profile/edit" className="dropdown-item">Edit Profile</Link> */}
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
            </div>
          )}
        </div>
        <Link to="#" onClick={toggleSearchModal}><FaSearch size={18} /> </Link> {/* Search icon */}
        {/* <Link to="#"><FaShoppingCart size={18} /></Link> Cart ic
        on */}
        <Link to="/Cart"><FaShoppingCart size={18} />{cart?.length}</Link> {/* Cart icon */}
        <Link to="/wishlist"><FaHeart size={18} /></Link> {/* Wishlist icon */}
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        &#9776;
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="search-modal-overlay" onClick={toggleSearchModal}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <input
              value={keyword}
              type="text"
              placeholder="Search..."
              className="search-input"
              onChange={(e) => setKeyword(e.target.value)} // Update keyword state
            />
            <button
              className="btn btn-outline-success"
              onClick={() => {
                if (keyword.trim()) {
                  // Ensure `keyword` is not empty or just spaces
                  fetch(`${apiUrl}/search-products/${keyword}`)
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.success) {
                        localStorage.setItem('searchResults', JSON.stringify(data.products));
                        navigate(`/search-products/${keyword}`);

                      } else {
                        alert(data.message || 'No products found.');
                      }
                    })
                    .catch((err) => console.error('Error:', err));
                } else {
                  alert('Please enter a search term.');
                }
              }}
              style={{ padding: '12px 18px' }}
            >
              Search
            </button>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
