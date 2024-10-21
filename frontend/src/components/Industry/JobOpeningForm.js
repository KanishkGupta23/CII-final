import React, { useState } from "react";
import axios from "axios";

const JobOpeningForm = () => {
  const [formData, setFormData] = useState({
    job_title: "",
    description: "",
    key_skills: "",
    opening_date: "",
    city: "",
    state: "",
    stipend: "",
    past_experience_required: false,
    industry: "",
    apply_by: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("https://cii-final-2.onrender.com/api/openings/create", {
        ...formData,
        key_skills: formData.key_skills.split(",").map((skill) => skill.trim()), // Convert key_skills to an array
        stipend: Number(formData.stipend), // Convert stipend to a number
      });

      if (response.data.success) {
        setMessage("Job opening created successfully!");
        // Reset form
        setFormData({
          job_title: "",
          description: "",
          key_skills: "",
          opening_date: "",
          city: "",
          state: "",
          stipend: "",
          past_experience_required: false,
          industry: "",
          apply_by: "",
        });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "An error occurred while creating the job opening."
      );
    }
  };

  return (
    <div className="w-full ">
      <h1 className="text-center w-full  lg:text-4xl md:text-2xl sm:text-xl  font-bold mb-4 py-6 bg-gray-800 text-white p-4 shadow-md">
        Create Job Opening
      </h1>
      <div className=" m-6 mx-auto max-w-2xl p-8 bg-gray-100 rounded-xl  shadow-md">
        <h2 className="text-2xl font-bold underline mb-4 text-center">
          Create Job Opening Form
        </h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="job_title">
              Job Title:
            </label>
            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="description">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="key_skills">
              Key Skills (comma-separated):
            </label>
            <input
              type="text"
              name="key_skills"
              value={formData.key_skills}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="opening_date">
              Opening Date:
            </label>
            <input
              type="date"
              name="opening_date"
              value={formData.opening_date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="city">
              City:
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="state">
              State:
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="stipend">
              Stipend:
            </label>
            <input
              type="number"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4 flex gap-4">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="past_experience_required"
            >
              Past Experience Required:
            </label>
            <input
              type="checkbox"
              name="past_experience_required"
              
              checked={formData.past_experience_required}
              onChange={handleChange}
              className="size-4 mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="industry">
              Industry ID:
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="apply_by">
              Apply By:
            </label>
            <input
              type="date"
              name="apply_by"
              value={formData.apply_by}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Create Job Opening
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobOpeningForm;