import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function UnAuthInstitute() {
  const [institutes, setInstitutes] = useState([]); // Change initial state to an empty array
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch("https://cii-final-2.onrender.com/api/institutes/institutes")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Check if data is coming
        setInstitutes(data.institutes || []); // Set institutes directly
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (institutes.length === 0) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Institutes</h1>
      <div className="grid grid-cols-1  gap-4">
        {institutes.map((institute) => (
          <div
            key={institute._id}
            className="max-w-4xl w-full mx-auto my-4 flex bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={institute.logo}
              alt={`${institute.name} logo`}
              className="w-60 h-32 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{institute.name}</h2>
              <p className="text-gray-700 mb-2">{institute.description}</p>
              <p className="text-gray-600">
                <strong>Domain:</strong> {institute.domain}
              </p>
              <p className="text-gray-600">
                <strong>Contact:</strong> {institute.contact_num}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => navigate(`/institutes/${institute._id}`)} // Navigate to the details page
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
