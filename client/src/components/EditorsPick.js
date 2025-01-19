import React from 'react';
import {useNavigate } from 'react-router-dom';

import '../Editors.css'; // Ensure you import your custom styles

const EditorsPick = () => {
  const navigate = useNavigate();
  const handleMenClick = () => {

    navigate("/get-products-by-category/Men"); // Redirect to login if not logged in

  };
  const handleWomenClick = () => {

    navigate("/get-products-by-category/Women"); // Redirect to login if not logged in

  };
  const handleKidsClick = () => {

    navigate("/get-products-by-category/Kids"); // Redirect to login if not logged in

  };

  return (
    <section className="editors-pick-section">
      {/* Section Title and Subtitle */}
      <div className="section-header">
        <h2>FASHION FOR ALL</h2>
        <p>Discover our categories</p>
      </div>

      {/* Three Columns */}
      <div className="columns-container">
        <div className="column" style={{ backgroundImage: 'url("/images/men.jpg")' }}>
          <button onClick={handleMenClick} className="cta2-button">Men</button>
        </div>
        <div className="column" style={{ backgroundImage: 'url("/images/Women.webp")' }}>
          <button onClick={handleWomenClick} className="cta2-button">Women</button>
        </div>
        <div className="column" style={{ backgroundImage: 'url("/images/kids.jpg")' }}>
          <button onClick={handleKidsClick} className="cta2-button">Kids</button>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
