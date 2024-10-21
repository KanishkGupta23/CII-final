import React from "react";
import { Link } from "react-router-dom";

const ApplicationCard = ({ industry }) => {
  console.log("Industry Data:", industry); // For debugging

  return (
    <div className="bg-white rounded-lg w-full md:w-4/5 lg:w-4/5 shadow-lg p-6 m-4 transition-transform transform hover:scale-105">
      <h2 className="text-blue-600 text-xl md:text-2xl font-bold mb-2">
        {industry.industry?.name || "Industry Name"} {/* Accessing nested industry name */}
      </h2>
      <h3 className="text-gray-800 text-lg md:text-xl font-semibold mt-2">
        Job Title: {industry.job_title || "N/A"} {/* Correct field for job title */}
      </h3>
      <p className="text-gray-700 text-sm md:text-base mt-1">
        {industry.description || "No description available."} {/* Correct field for description */}
      </p>
      <div className="mt-4 text-gray-600">
        <p className="mt-1 text-sm md:text-base">
          Location: {industry.city || "Unknown"} {/* Accessing city */}
        </p>
        <p className="mt-1 text-sm md:text-base">
          Stipend: {industry.stipend !== undefined ? `₹${industry.stipend}` : "Not specified"}
        </p>
        <p className="mt-1 text-sm md:text-base">
          Opening Date: {industry.opening_date ? new Date(industry.opening_date).toLocaleDateString() : "N/A"}
        </p>
        <p className="mt-1 text-sm md:text-base">
          Total Vacancies: {industry.totalVacancies || "Not specified"} {/* Ensure to match property name */}
        </p>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-start">
        <Link to="/institutions/openingdetails">
          <button className="bg-blue-600 uppercase font-bold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            View Student Applied
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ApplicationCard;
