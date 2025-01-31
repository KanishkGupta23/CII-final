import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from "./Modal"

const JobDetails = () => {
  const { jobId } = useParams();
  const jobDetails = useSelector((state) => state.industryData.value);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  if (!jobDetails || jobDetails.id !== jobId) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const {
    job_title,
    description,
    key_skills,
    city,
    state,
    stipend,
    opening_date,
    apply_by,
    _id,
    img, // Assuming there's an img property in jobDetails
  } = jobDetails;

  

  const handleRegister = async () => {
    try {
      // Uncomment and adjust the URL for your backend API
      // const response = await axios.post(`https://cii-final-2.onrender.com/api/apply/${_id}`);
      
      // Simulate a successful application
      const response = { success: true }; // Mock response for demonstration

      if (response.success) {
        setIsModalOpen(true); // Open modal on successful application
      } else {
        alert("Application failed. Please try again.");
      }
    } catch (error) {
      alert("Application failed. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="container mx-auto p-6 mt-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">{job_title}</h1>
          <p className="text-gray-700 mb-6">{description}</p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Job Details</h2>
            <p className="text-gray-600"><strong>Location:</strong> {city}, {state}</p>
            <p className="text-gray-600"><strong>Stipend:</strong> ${stipend}/month</p>
            <p className="text-gray-600"><strong>Opening Date:</strong> {new Date(opening_date).toLocaleDateString()}</p>
            <p className="text-gray-600"><strong>Apply By:</strong> {new Date(apply_by).toLocaleDateString()}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Skills</h2>
            {key_skills && key_skills.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600">
                {key_skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">N/A</p>
            )}
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300" onClick={alert("appy successfully")}>
            Apply Now
          </button>
        </div>

        {/* Right Side Image or Additional Information */}
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-center items-center">
          {img ? (
            <img
              src={img}
              alt="Job Related"
              className="object-cover w-full h-64 rounded-lg mb-4"
            />
          ) : (
            <div className="text-gray-400">Image not available</div>
          )}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Company Info</h2>
          <p className="text-gray-600">Learn more about the company and its culture here.</p>
          {/* You can add more content related to the company or job here */}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default JobDetails;
