// src/ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel, job }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{message}</h3>

        {job && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {job.job_title}
            </h2>
            <p className="mb-2 text-gray-600">{job.description}</p>
            <p className="font-semibold text-gray-700">
              Key Skills:{" "}
              <span className="text-gray-500">{job.key_skills.join(", ")}</span>
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Location:</strong>{" "}
              <span className="text-gray-500">
                {job.city}, {job.state}
              </span>
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Stipend:</strong>{" "}
              <span className="text-gray-500">₹{job.stipend}</span>
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Past Experience:</strong>{" "}
              <span className="text-gray-500">
                {job.past_experience_required ? "Required" : "Not Required"}
              </span>
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Opening Date:</strong>{" "}
              <span className="text-gray-500">
                {new Date(job.opening_date).toLocaleDateString()}
              </span>
              <br />
              <strong>Apply By:</strong>{" "}
              <span className="text-gray-500">
                {new Date(job.apply_by).toLocaleDateString()}
              </span>
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
