// src/components/Carousel.tsx

import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Carousel } from "react-responsive-carousel";
import "../../CSS/salonCarousel.css";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS for the carousel

import  shop5 from "../../assets/images/shop5.jpg";
import  shop2 from "../../assets/images/shop2.avif";
import  shop3 from "../../assets/images/shop3-2063795648.jpg";
import  shop4 from "../../assets/images/shop4.jpg";

const ImageCarousel: React.FC = () => {
  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoPlay={true}
        stopOnHover={true}
        interval={3000}
        transitionTime={1000}
        swipeable={true}
      >
        <div>
          <img src={shop5} alt="Carousel Image 1" />
          <p className="legend">GENTLEMENS IS THE ONE FO THE BEST SALON IN WORLD  </p>
        </div>
        <div>
          <img src={shop2} alt="Carousel Image 2" />
          <p className="legend">Caption for Image 2</p>
        </div>
        <div>
          <img src={shop3}  alt="Carousel Image 3" />
          <p className="legend">Caption for Image </p>
         
        </div>
        <div>
          <img src={shop4}  alt="Carousel Image " />
          <h1 className="text-4xl">These are World wide Bra Ower Happy Clients with us</h1>
        </div>

      </Carousel>
 
    </div>
  );
};

export default ImageCarousel;
