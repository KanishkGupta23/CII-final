import React, { useEffect, useState } from 'react';
import IndustryCard from './IndustryCard'; // Ensure correct path

const IndustryStudent = () => {
  const [industries, setIndustries] = useState([]); // State to hold the job data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track any error

  // Fetch data from the backend
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('https://cii-final-2.onrender.com/api/openings/openings'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        console.log(data); // Log the response data
        setIndustries(data.data); // Assuming data.data contains the industries
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen p-6 w-full">
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Job Openings</h1>
      <div className="flex flex-wrap justify-center">
        {Array.isArray(industries) && industries.map((industry) => {
          console.log(industry); // Log each industry object
          return (
            <IndustryCard
              _id={industry._id} // Use _id as the key
              industry={industry} // Pass the entire industry object
            />
          );
        })}
      </div>
    </div>
  );
};

export default IndustryStudent;
