import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../CSS/salonCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import shop5 from "../../assets/images/shop5.jpg";
import shop2 from "../../assets/images/shop2.avif";
import shop3 from "../../assets/images/shop3-2063795648.jpg";
import shop4 from "../../assets/images/shop4.jpg";

const ImageCarousel: React.FC = () => {
  return (
    <div className="carousel-container  ">
      <Carousel
       
     
     
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoPlay={true}
        stopOnHover={true}
        interval={3000}
        transitionTime={1000}
        swipeable={true}
      >
        <div>
          <img  className="rounded-lg"  src={shop5} alt="Carousel Image 1" />
          <p className="legend">GENTLEMENS IS THE ONE OF THE BEST SALON IN THE WORLD</p>
        </div>
        <div>
          <img className="rounded-lg" src={shop2} alt="Carousel Image 2" />
          <p className="legend">Caption for Image 2</p>
        </div>
        <div>
          <img className="rounded-lg" src={shop3} alt="Carousel Image 3" />
          <p className="legend">Caption for Image 3</p>
        </div>
        <div>
          <img className="rounded-lg" src={shop4} alt="Carousel Image 4" />
          <h1 className="legend">These are our worldwide happy clients</h1>
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
