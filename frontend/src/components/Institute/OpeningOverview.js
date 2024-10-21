// src/OpeningOverview.js
import React from 'react';

const OpeningOverview = ({ job, onClose }) => {
    return (
        <div className="fixed inset-0  bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/3 transition-transform transform scale-100 md:scale-105">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">{job.job_title}</h2>
                <p className="mb-4 text-gray-600">{job.description}</p>
                <p className="font-semibold text-gray-700">Key Skills: <span className="text-gray-500">{job.key_skills.join(', ')}</span></p>
                <p className="mt-2 text-gray-700"><strong>Location:</strong> <span className="text-gray-500">{job.city}, {job.state}</span></p>
                <p className="mt-2 text-gray-700"><strong>Stipend:</strong> <span className="text-gray-500">₹{job.stipend}</span></p>
                <p className="mt-2 text-gray-700"><strong>Past Experience:</strong> <span className="text-gray-500">
                    {job.past_experience_required ? 'Required' : 'Not Required'}
                    </span></p>
                <p className="mt-2 text-gray-700">
                    <strong>Opening Date:</strong> <span className="text-gray-500">{new Date(job.opening_date).toLocaleDateString()}</span><br />
                    <strong>Apply By:</strong> <span className="text-gray-500">{new Date(job.apply_by).toLocaleDateString()}</span>
                </p>

                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OpeningOverview;
