import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UnAuthIndustry() {
  const [carouselData, setCarouselData] = useState([]);
  const navigate = useNavigate();
  console.log(carouselData);

  // Fetch data from the backend
  useEffect(() => {
    fetch("https://cii-final-2.onrender.com/api/industries/")
      .then((response) => response.json())
      .then((data) => {
        // console.log("API Response:", data); // Check if data is coming
        setCarouselData(data.data || []); // Check if `data.data` exists and set it
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // If data is still loading or empty
  if (carouselData.length === 0) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="">
          <h1 className="text-3xl font-bold text-center my-4">
            Top Industries
          </h1>
        </div>
        {carouselData.map((industry) => (
          <div className="mx-auto max-w-4xl my-6 bg-white shadow-lg rounded-lg overflow-hidden flex">
            <img
              src={industry.logo}
              alt={`${industry.name} logo`}
              className="w-64 h-32 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{industry.name}</h2>
              <p className="text-gray-700 mb-2">{industry.description}</p>
              <p className="text-gray-600">
                <strong>Domain:</strong> {industry.domain}
              </p>
              <p className="text-gray-600">
                <strong>Contact:</strong> {industry.contact_num}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => navigate(`/viewIndustry/${industry._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
