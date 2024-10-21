// src/EditOpeningForm.js
import React, { useState, useEffect } from 'react';

const EditOpeningForm = ({ job, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        job_title: '',
        description: '',
        key_skills: [],
        opening_date: '',
        city: '',
        state: '',
        stipend: '',
        past_experience_required: false,
        apply_by: ''
    });

    useEffect(() => {
        // Initialize form data with the current job data
        setFormData({
            job_title: job.job_title,
            description: job.description,
            key_skills: job.key_skills,
            opening_date: new Date(job.opening_date).toISOString().substring(0, 10),
            city: job.city,
            state: job.state,
            stipend: job.stipend,
            past_experience_required: job.past_experience_required,
            apply_by: new Date(job.apply_by).toISOString().substring(0, 10),
        });
    }, [job]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const response = await fetch(`https://cii-final-2.onrender.com/api/openings/openings/${job._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update the job opening');
            }

            const updatedJob = await response.json();
            onSave(updatedJob); // Call onSave to update the job list in parent component
            onClose(); // Close the edit form
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center overflow-auto">
            <div className="bg-white h-3/4 p-6 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Edit Job Opening</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Job Title:</label>
                        <input
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Key Skills (comma separated):</label>
                        <input
                            type="text"
                            name="key_skills"
                            value={formData.key_skills.join(', ')}
                            onChange={(e) => handleChange({
                                target: {
                                    name: 'key_skills',
                                    value: e.target.value.split(',').map(skill => skill.trim()),
                                },
                            })}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Opening Date:</label>
                        <input
                            type="date"
                            name="opening_date"
                            value={formData.opening_date}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">State:</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Stipend:</label>
                        <input
                            type="number"
                            name="stipend"
                            value={formData.stipend}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="past_experience_required"
                                checked={formData.past_experience_required}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Past Experience Required
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Apply By:</label>
                        <input
                            type="date"
                            name="apply_by"
                            value={formData.apply_by}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditOpeningForm;
