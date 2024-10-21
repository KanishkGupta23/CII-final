import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewIndustry = () => {
  const [carouselData, setCarouselData] = useState([]);
  const navigate = useNavigate();
//   const { _id } = useParams();
const _id = useParams().id;

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cii-final-2.onrender.com/api/industries/");
        const data = await response.json();
        console.log('API Response:', data); // Check if data is coming
        setCarouselData(data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // If data is still loading or empty
  if (carouselData.length === 0) {
    return <div>Loading...</div>; // Loading state
  }

  // Find the industry based on the ID from params
  // console.log(carouselData)
  carouselData.map((industry) => console.log(industry._id));
  const industry = carouselData.find((industry) => industry._id === _id);
  console.log(industry);
  // If the industry is not found
  if (!industry) {
    return <div>Industry not found</div>;
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg m-24">
            <div className="flex items-center mb-4">
                <img 
                    src={industry.logo} 
                    alt={`${industry.name} logo`} 
                    className="h-16 w-16 rounded-full mr-4"
                />
                <h1 className="text-2xl font-bold">{industry.name}</h1>
            </div>

            <p className="text-gray-700 mb-4">{industry.description}</p>

            <div className="text-gray-600">
                <p><strong>Established:</strong> {new Date(industry.estb_year).toLocaleDateString()}</p>
                <p><strong>Registration Date:</strong> {new Date(industry.registration_date).toLocaleDateString()}</p>
                <p><strong>Contact Number:</strong> {industry.contact_num}</p>
                <p><strong>Email:</strong> <a href={`mailto:${industry.email_id}`} className="text-blue-500">{industry.email_id}</a></p>
                <p><strong>Website:</strong> <a href={industry.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{industry.website}</a></p>
                <p><strong>Address:</strong> {industry.address}, {industry.city}, {industry.state}, {industry.pincode}, {industry.country}</p>
                <p><strong>Domain:</strong> {industry.domain}</p>
                <p><strong>Verified:</strong> {industry.verified ? 'Yes' : 'No'}</p>
            </div>

            <div className="mt-6">
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </div>
        </div>
    </div>
    );
};

export default ViewIndustry;
