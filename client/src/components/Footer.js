import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../footer.css';
import axios from 'axios';

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter valid email address');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('${apiUrl}/add-subscriber', { email });
      if (response.data.success) {
        setMessage('Successfully subscribed!');
        setTimeout(() => {
        alert('Successfully subscribed!');
      }, 0);
        setEmail(''); // Clear the email field
      }
    } catch (error) {
      setMessage('Error subscribing. Please try again.');
      setTimeout(() => {
        alert('Error subscribing! Check Email');
      }, 0);

    } finally {
      setIsLoading(false);
    }
  };
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span onClick={() => navigate('/')} className="footer-brand-name" style={{ cursor: 'pointer' }}>SOFT</span>
        </div>
        <div className="footer-socials">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={24} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-column">
          <h4>Useful Links</h4>
          <ul>
            <li onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</li>
            <li onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About</li>
            <li onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>Shop</li>
            <li onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li onClick={() => navigate('/faqs')} style={{ cursor: 'pointer' }}>FAQ</li>
            <li onClick={() => navigate('#')} style={{ cursor: 'pointer' }}>Shipping</li>
            <li onClick={() => navigate('#')} style={{ cursor: 'pointer' }}>Returns</li>
            <li onClick={() => navigate('/privacy-policy')} style={{ cursor: 'pointer' }}>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Site Map</h4>
          <ul>
            <li onClick={() => navigate('/new-arrivals')} style={{ cursor: 'pointer' }}>New Arrivals</li>
            <li onClick={() => navigate('/sales')} style={{ cursor: 'pointer' }}>Sales</li>
            <li onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>Collections</li>
            <li onClick={() => navigate('/store-locator')} style={{ cursor: 'pointer' }}>Store Locator</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Get in Touch</h4>
          <input className='form-control' 
            value={email}
            onChange={handleEmailChange}

            type="email" placeholder="Enter your email" />
          <button onClick={handleSubscribe} disabled={isLoading}>
            {isLoading ? 'Subscribing...' : 'Subscribe'}</button>
          
        </div>
      </div>

      <div className="footer-bottom-row">
        <p>&copy; 2024 SOFT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
