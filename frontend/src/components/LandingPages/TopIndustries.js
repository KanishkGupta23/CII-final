import React, { Component } from "react";
import Slider from "react-slick";
import Carousel from "./Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TopIndustry() {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,

    infinite: false,
    // autoplay: true,
    // speed: 1000,
    // autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flex justify-center bg-customBackgroundBlue my-20">
      <div className="lg:w-[90%]  w-[80%] h-96   ">
        <div className="text-center font-bold text-4xl font-sans">
          Top Industries and Institutions
        </div>
        <Slider {...settings} className="">
          <div className="mt-10">
            <Carousel />
          </div>
          {/* <div className="mt-10">
            <Carousel />
          </div>
          <div className="mt-10">
            <Carousel />
          </div>
          <div className="mt-10">
            <Carousel />
          </div>
          <div className="mt-10">
            <Carousel />
          </div> */}
        </Slider>
      </div>
    </div>
  );
}

export default TopIndustry;
