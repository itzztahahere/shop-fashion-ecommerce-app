import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Topbar.css';

const Navbar = () => {
  return (
    <div className="container-fluid p-0 m-0">
      {/* Topbar */}
      <div className="row px-3 py-2 text-light" style={{ backgroundColor: '#252B42' }}>
        {/* Left Section: Phone and Email */}
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-start">
          <FaPhoneAlt size={18} className="me-2" />
          <span>+923272498799</span>
          <FaEnvelope size={18} className="mx-3" />
          <span>SOFT@gmail.com</span>
        </div>

        {/* Center Text */}
        <div className="col-12 col-md-4 text-center">
          <span>Free Delivery All Over Karachi!</span>
        </div>

        {/* Right Section: Social Icons */}
        <div className="col-12 col-md-4 d-flex justify-content-end align-items-center socials">
          <FaFacebook className="mx-2" size={18} />
          <FaInstagram className="mx-2" size={18} />
          <FaLinkedin className="mx-2" size={18} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
