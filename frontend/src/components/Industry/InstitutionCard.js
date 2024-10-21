import React from "react";
import { Link } from "react-router-dom";

const InstitutionCard = ({ InstitutionData }) => {
  return (
    <div className="bg-white rounded-lg w-full md:w-4/5 lg:w-4/5 shadow-lg p-6 m-4 transition-transform transform hover:scale-105">
      <h2 className="text-indigo-900 text-xl md:text-2xl font-bold mb-2">
        {InstitutionData.name}
      </h2>
      <p className="text-gray-700 text-sm md:text-base mt-1">
        {InstitutionData.description}
      </p>
      <div className="mt-4 text-gray-600">
        <p className="mt-1 text-sm md:text-base">Location: {InstitutionData.city}, {InstitutionData.country}</p>
        <p className="mt-1 text-sm md:text-base">Contact Number: {InstitutionData.contact_num}</p>
        <p className="mt-1 text-sm md:text-base">
          Established Year: {new Date(InstitutionData.estb_year).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
        <Link to="/industries/StudentList">
          <button className="bg-green-500 uppercase font-bold text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
            View Students
          </button>
        </Link>
        {/* <Link to={`/institutes/${InstitutionData._id}/pdf`}>
          <button className="bg-red-600 uppercase font-bold text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200">
            Download PDF
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default InstitutionCard;
