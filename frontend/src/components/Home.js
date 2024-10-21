import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "../components/LandingPages/Clock.js";
import About from "../components/LandingPages/About.js";
import TopIndustry from "../components/LandingPages/TopIndustries.js";
import PhotoGrid from "../components/LandingPages/PhotoGrid.js";
import CustomSlider from "./CustomSlider.js";

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };


  return (
    <>
      {/* Render Clock component first with proper z-index */}
      

      {/* Slider */}
      <CustomSlider />
      
      {/* Other sections */}
      <About />
      <TopIndustry />
      <PhotoGrid />
    </>
  );
};

export default Home;
