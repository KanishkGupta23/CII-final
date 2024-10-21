import React, { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard";
import axios from "axios"; // Import axios for making API calls

const Industry = () => {
  const [industries, setIndustries] = useState([]); // State for industries
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to hold error messages

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true); // Set loading to true before the API call
        const response = await axios.get("https://cii-final-2.onrender.com/api/openings/openings"); // Your API endpoint
        console.log("API Response:", response.data); // Log the response to check structure
        
        // Check if response.data is an array
        if (Array.isArray(response.data.data)) { // Access the 'data' property from your response
          setIndustries(response.data.data); // Assuming response.data.data is an array
        } else {
          console.error("Unexpected response structure:", response.data);
          setError("Unexpected data structure.");
        }
      } catch (error) {
        console.error("Error fetching industries:", error);
        setError("Failed to load industries. Please try again later."); // Set more descriptive error message
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    fetchIndustries();
  }, []); // Runs once on component mount

  return (
    <div className="bg-blue-50 min-h-screen w-full">
      <h1 className="text-center lg:text-4xl md:text-2xl sm:text-xl font-bold mb-4 py-6 bg-gray-800 text-white p-4 shadow-md">
      Openings/Opportunities

      </h1>
      <div className="flex flex-wrap max-w-7xl justify-center">
        {loading ? (
          <p className="text-gray-600">Loading industries...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : industries.length > 0 ? (
          industries.map((industry) => (
            <ApplicationCard key={industry._id} industry={industry} />
          ))
        ) : (
          <p className="text-gray-500">No industries available.</p>
        )}
      </div>
    </div>
  );
};

export default Industry;
