// About.js
import React, { useState } from "react";

const About = () => {
  const [isShow, setIsShow] = useState(false);

  const handleText = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[70vh] ">
      <div  className="flex flex-col md:flex-row items-start md:pl-16  max-w-7xl ">
        {/* Left Side */}
        <div className="md:w-1/2 w-full md:pr-8 text-left">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-customBlueHeading">
            About CII
          </h1>
          <br />

          <p className="text md:text-md mb-6 text-gray-500 font-normal font-sans leading-7">
            The Confederation of Indian Industries is a perfect amalgam of intellectuals from
            various industrial domains, who play a very important role in enhancing efficiency,
            competitiveness, and business opportunities for Industries. The CII is an organization
            that aims to create and sustain a realm, instrumental in the development of India,
            partnering industries, government, and civil society through advisory, consultative processes,
            and by working in the vicinity of government on policy issues.
            <hr />
            <br />
            CII has been on a journey of evolution for more than 125 years with the goal of providing
            an edge to India’s development paradigm and transforming the engagement of Indian 
            industries in national development.
          </p>
          {/* Lower Text */}
      {isShow && (
        <div className="text-left text md:text-md mb-6 text-gray-500 font-normal font-sans leading-7">
          <p className="text md:text-md mb-6">
            It is a non-government, not-for-profit, industry-led, and managed organization
            commemorating around 9000 members from the private as well as public sectors,
            including SMEs and MNCs, and an indirect membership of over 300,000 enterprises 
            from 286 national and regional sectoral industry bodies.
            <br /><br />
            CII stretches its objective beyond the circumference of business, as it assists the
            industries to identify and execute corporate citizenship programs and various other
            integrated and inclusive development programs across diverse domains including
            affirmative action, livelihoods, diversity management, skill development, empowerment 
            of women, and sustainable development, to name a few.
          </p>
        </div>
      )}

          {!isShow && (
            <button
              className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
              onClick={handleText}
            >
              Learn More
            </button>
          )}
        </div>

        {/* Right Side Image */}
        <div className="md:w-1/2 w-full mt-8 md:mt-0 flex justify-center">
          <img
            src="About.jpg"
            alt="About Image"
            className="object-cover md:h-[40vh] w-[80%]  shadow-lg"
          />
        </div>
      </div>

      
      </div>
    </>
  );
};

export default About;