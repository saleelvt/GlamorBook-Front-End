import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../../CSS/userCarousel.css"

// Define the settings for the carousel
const settings = {
  dots: true, // Show dots for navigation
  infinite: true, // Infinite loop
  speed: 300, // Transition speed
  slidesToShow: 1, // Number of slides to show at once
  slidesToScroll: 1, // Number of slides to scroll at once
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

import IMG1 from "../../assets/images/CarousleIMG1eda6de3a9a7970e6b2099c545a71ff8a.jpg";
import IMG2 from "../../assets/images/CarousleIMG1r-2063795648.jpg";
import IMG3 from "../../assets/images/1.png";
import IMG4 from "../../assets/images/1_jvZL4h-yHD0ImM2x9BqG_w.jpg";
import IMG5 from "../../assets/images/images.jpeg";

const UserCarousel: React.FC = () => {
  return (
    <div className=" ">

    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={IMG1} alt="Slide 1"/>
        </div>
        <div>
          <img src={IMG2} alt="Slide 2" />
        </div>
        <div>
          <img src={IMG3} alt="Slide 3" />
        </div>
        <div>
          <img src={IMG4} alt="Slide 4" />
        </div>
        <div>
          <img src={IMG5} alt="Slide 5" />
        </div>
      </Slider>
    </div>
    </div>
  );
};

export default UserCarousel;
