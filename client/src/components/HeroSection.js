import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../carousel.css'; // Custom styles for the carousel
import { useNavigate } from 'react-router-dom';

const CustomCarousel = ({ heading, description, buttonText, image }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/shop');
  };

  return (

    <Carousel className="carousel-container">
      <Carousel.Item>
        <div
          className="carousel-item"
          style={{
            backgroundImage: `url(${image})`, // Dynamically set the background image
          }}
        >
          <div className="carousel-content">
            <h2 className="carousel-heading">{heading}</h2>
            <p className="carousel-text" dangerouslySetInnerHTML={{ __html: description }}></p>
            <button onClick={handleButtonClick} className="cta-button bg-success">{buttonText}</button>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
