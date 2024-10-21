import React, { useEffect, useState } from "react";
import InstitutionCard from "./InstitutionCard";
import axios from "axios"; // Axios is used for API requests

const Institution = () => {
  // State to store fetched data
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the backend
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get("https://cii-final-2.onrender.com/api/institutes/institutes");
        if (response.data.success) {
          setInstitutes(response.data.institutes); // Set fetched data to state
        } else {
          setError("Error fetching institutes");
        }
      } catch (error) {
        setError("Error fetching institutions: " + error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchInstitutes();
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen ">
      <h1 className="text-center lg:text-4xl md:text-2xl sm:text-xl font-bold mb-4 py-6 bg-gray-800 text-white p-4 shadow-md">
        Institutes Applied
      </h1>
      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : institutes.length > 0 ? (
        <div className="flex flex-wrap max-w-7xl justify-center">
          {institutes.map((institute, index) => (
            <InstitutionCard key={index} InstitutionData={institute} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No institutes found.</p>
      )}
    </div>
  );
};

export default Institution;
