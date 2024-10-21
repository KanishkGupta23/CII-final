import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    image: "HomeBg1.jpg", // Replace with your image URL
    alt: "Slide 1",
  },
  {
    id: 2,
    image: "HomeBg2.jpg", // Replace with your image URL
    alt: "Slide 2",
  },
  {
    id: 3,
    image: "HomeBg3.jpg", // Replace with your image URL
    alt: "Slide 3",
  },
];

const NextArrow = ({ onClick }) => {
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
      <FaArrowRight
        className="text-white text-3xl cursor-pointer hover:scale-110 transition"
        onClick={onClick}
      />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
      <FaArrowLeft
        className="text-white text-3xl cursor-pointer hover:scale-110 transition"
        onClick={onClick}
      />
    </div>
  );
};

const CustomSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Slider {...settings} className="w-full h-[80vh]">
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[80vh]">
            <img
              src={slide.image}
              alt={slide.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </Slider>

      {/* Static Text Box */}
      <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 text-center bg-blue-900 text-white p-4 w-[70%] z-10">
        <h2 className="text-2xl font-bold">
          CII IWN Annual Leadership Conclave 2022
        </h2>
        <p className="text-md mt-2">
          Dr (Smt) Tamilisai Soundararajan, Hon'ble Governor of Telangana and
          Hon'ble Lt. Governor of Puducherry addressing at the CII IWN Telangana
          Annual Leadership Conclave 2022 held in Hyderabad on 14 October 2022.
        </p>
      </div>
      <div id="about"></div>
    </div >
  );
};

export default CustomSlider;
