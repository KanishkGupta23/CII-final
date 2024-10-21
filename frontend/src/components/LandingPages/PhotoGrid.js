// src/components/PhotoGrid.js
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PhotoGrid = () => {
  const design = 'w-44'; // Adjusted class name for image design

  const settings = {
    dots: false,          // Disable dots under the slider
    infinite: true,       // Infinite loop for the slider
    speed: 500,           // Speed of slide transition (500ms)
    slidesToShow: 5,      // Show 4 logos at a time
    slidesToScroll: 1,    // Scroll one logo at a time
    autoplay: true,       // Enable autoplay
    autoplaySpeed: 2000,  // Slide every 2 seconds
    pauseOnHover: true,   // Pause the slide on hover
    responsive: [
      {
        breakpoint: 1024, // Adjust for screens smaller than 1024px
        settings: {
          slidesToShow: 4, // Show 3 logos at a time on medium screens
        },
      },
      {
        breakpoint: 600,   // Adjust for screens smaller than 600px
        settings: {
          slidesToShow: 2, // Show 2 logos at a time on small screens
        },
      },
      {
        breakpoint: 480,   // Adjust for screens smaller than 480px
        settings: {
          slidesToShow: 1, // Show 1 logo at a time on very small screens
        },
      },
    ],
  };

  return (
    <div className="mt-10 mb-10 xl:h-24 p-4 max-w-7xl flex  items-center m-auto justify-center">
      <div className="w-full h-full">
      <Slider {...settings}>
        <div>
          <img src="company1.jpg" alt="Photo 1" className={design} />
        </div>
        <div>
          <img src="company2.jpg" alt="Photo 2" className={design} />
        </div>
        <div>
          <img src="company3.jpg" alt="Photo 3" className={design} />
        </div>
        <div>
          <img src="company4.jpg" alt="Photo 4" className={design} />
        </div>
        <div>
          <img src="company5.jpg" alt="Photo 5" className={design} />
        </div>
        <div>
          <img src="company6.jpg" alt="Photo 6" className={design} />
        </div>
      </Slider>
      </div>
    </div>
  );
};

export default PhotoGrid;
