import axios from "axios";
import React, { useState } from "react";

const StudentProfileEdit = ({ student, fetchUserData , instituteData}) => {
  const [formData, setFormData] = useState({ ...student });
  const [error, setError] = useState("");

  console.log(instituteData)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields are filled
    const requiredFields = [
      "name",
      "headline",
      "currentEmployment",
      "educationalDegree",
      "institute",
      "openForJobs",
      "pastExperience",
      "skills",
      "linkedinLink",
      "githubLink",
      "jobCategory",
      "contactNumber",
      "email",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill out the ${field} field.`);
        return;
      }
    }

    // Print form data to console
    console.log("Form Data:", formData);

    // Optionally, you can clear the error and perform further actions (e.g., API call)
    setError("");
    try {
      const response = await updateUser(formData);
      // setSuccess(response.data.message); // Display success message
      fetchUserData(); // Refresh user data
    } catch (error) {
      setError("Failed to update profile: " + error.message);
    }
  };

  const updateUser = async (data) => {
    const userId = student.user; // Assuming you have the user ID available
    const formDataToSend = new FormData();

    // Append userId and other fields to FormData
    formDataToSend.append("userId", userId);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formDataToSend.append(key, data[key]);
      }
    }

    // Handle file uploads if they exist
    const profilePicFile = document.querySelector('input[name="profilePic"]')
      .files[0];
    const resumeFile = document.querySelector('input[name="resume"]').files[0];

    if (profilePicFile) {
      formDataToSend.append("profilePic", profilePicFile);
    }
    if (resumeFile) {
      formDataToSend.append("resume", resumeFile);
    }

    const response = await axios.post(
      `https://cii-final-2.onrender.com/api/appliedstudent/update`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response; // Return the response for handling
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md max-w-5xl lg:w-1/2 mx-auto m-10"
      onSubmit={handleFormSubmit}
    >
      <div className="border-b pb-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Edit Student Profile
        </h2>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-8">
        {/* Profile Picture Upload */}
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full border overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={formData.profilePic}
              alt="Profile Pic"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="file:bg-gray-100 file:border-none file:rounded-lg file:px-4 file:py-2 file:text-sm file:cursor-pointer text-gray-600"
            />
          </div>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled
              className="block cursor-not-allowed w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="block cursor-not-allowed w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>
        </div>

        {/* Headline & Current Employment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Headline
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Current Employment
            </label>
            <input
              type="text"
              name="currentEmployment"
              value={formData.currentEmployment}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Institute & Educational Degree */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Institute
            </label>
            <select
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            >
              <option value="" disabled>
                Select an Institute
              </option>
              {instituteData?.map((institute) => (
                <option key={institute._id} value={institute._id}>
                  {institute.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Educational Degree
            </label>
            <input
              type="text"
              name="educationalDegree"
              value={formData.educationalDegree}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>
        </div>

        {/* Skills & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Past Experience (Years)
            </label>
            <input
              type="number"
              name="pastExperience"
              value={formData.pastExperience}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* LinkedIn & GitHub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              LinkedIn
            </label>
            <input
              type="text"
              name="linkedinLink"
              value={formData.linkedinLink}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              GitHub
            </label>
            <input
              type="text"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Resume Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Resume
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf, .doc, .docx"
              onChange={handleChange}
              className="file:bg-gray-100 file:border-none file:rounded-lg file:px-4 file:py-2 file:text-sm file:cursor-pointer text-gray-600"
            />
          </div>
        </div>

        {/* Contact & Job Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Job Category
            </label>
            <input
              type="text"
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Open for Jobs & Verified */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Open for Jobs
            </label>
            <select
              name="openForJobs"
              value={formData.openForJobs}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudentProfileEdit;
