import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const navigate =  useNavigate()

  // Fetch data from the backend
  useEffect(() => {
    fetch('https://cii-final-2.onrender.com/api/industries/')
      .then((response) => response.json())
      .then((data) => {
        // console.log('API Response:', data); // Check if data is coming
        setCarouselData(data.data || []); // Check if `data.data` exists and set it
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // If data is still loading or empty
  if (carouselData.length === 0) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="flex space-x-4 overflow-x-auto p-4">
      {/* Loop through each industry data and render a card */}
      {carouselData.map((industry) => (
        <div key={industry._id} className="flex flex-col justify-between w-80 h-80 bg-white p-4 rounded-lg shadow-md">
          {/* Logo Section */}
          <div className="flex items-center mb-2">
            <img
              src={industry.logo || 'default-logo.jpg'} // Check if logo exists, fallback to default
              alt={`${industry.name} Logo`}
              className="h-12 w-auto mr-2"
            />
          </div>

          {/* Industry Category */}
          <div className="bg-yellow-300 text-blue-600 p-1 rounded-md text-xs font-bold">
            {industry.domain || 'Unknown Category'} {/* Check if domain exists */}
          </div>

          {/* Industry Name */}
          <h2 className="text-xl text-blue-600 my-2">
            {industry.name || 'Unknown Industry'} {/* Check if name exists */}
          </h2>

          {/* Basic Details Section */}
          <div className="flex flex-col justify-between flex-1">
            <p className="text-sm text-gray-600">
              {industry.description || 'No description available.'} {/* Check if description exists */}
            </p>

            {/* View Button */}
            <button onClick={()=>navigate("/viewIndustry/"+industry._id)} className="mt-2 self-start px-5 py-1.5 bg-blue-600 text-white rounded-md text-lg">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
