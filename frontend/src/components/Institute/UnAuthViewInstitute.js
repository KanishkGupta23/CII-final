import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UnAuthViewInstitute() {
  const { id } = useParams(); // Get the ID from URL parameters
  const [institute, setInstitute] = useState(null);

  useEffect(() => {
    // Fetch data for the specific institute
    fetch(`https://cii-final-2.onrender.com/api/institutes//institute/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setInstitute(data.institute); // Assuming the API returns the institute object
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!institute) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="max-w-3xl mx-auto p-6 m-14 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{institute.name}</h1>
      <img 
        src={institute.logo} 
        alt={`${institute.name} logo`} 
        className="w-full h-48 object-cover mb-4"
      />
      <p className="text-gray-700 mb-2">{institute.description}</p>
      <p className="text-gray-600">
        <strong>Domain:</strong> {institute.domain}
      </p>
      <p className="text-gray-600">
        <strong>Contact Number:</strong> {institute.contact_num}
      </p>
      <p className="text-gray-600">
        <strong>Email:</strong> <a href={`mailto:${institute.email_id}`} className="text-blue-500">{institute.email_id}</a>
      </p>
      <p className="text-gray-600">
        <strong>Website:</strong> <a href={institute.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{institute.website}</a>
      </p>
      <p className="text-gray-600">
        <strong>Address:</strong> {institute.address}, {institute.city}, {institute.state}, {institute.pincode}, {institute.country}
      </p>
      <p className="text-gray-600">
        <strong>Established Year:</strong> {new Date(institute.estb_year).getFullYear()}
      </p>
      <p className="text-gray-600">
        <strong>Registration Date:</strong> {new Date(institute.registration_date).toLocaleDateString()}
      </p>
      <p className="text-gray-600">
        <strong>Verified:</strong> {institute.verified ? 'Yes' : 'No'}
      </p>
    </div>
  );
}
