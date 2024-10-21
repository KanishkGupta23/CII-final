import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for API calls

const StudentList = () => {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  // Function to handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Logic to handle file upload
    console.log("Uploading:", file);
  };

  // Function to fetch student data from the backend
  const fetchStudentData = async () => {
    try {
      const response = await axios.get("https://cii-final-2.onrender.com/api/users"); // Change the API endpoint to your backend URL
      setStudents(response.data); // Assuming the data comes as an array of students
      setLoading(false); // Turn off loading when data is fetched
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // useEffect to fetch the data when component mounts
  useEffect(() => {
    fetchStudentData();
  }, []); // Empty dependency array means this runs once after the initial render

  if (loading) {
    return <div>Loading...</div>; // Show a loading message until data is fetched
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto max-w-4xl shadow-lg rounded-lg p-8 bg-white">
        <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">
          Student List
        </h1>

        {/* File Upload Section */}
        <div className="mb-8">
          <label className="block font-medium text-gray-600 mb-2">
            Select Excel Files: (.csv format only)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Table Section */}
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm">S.No.</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Student Name</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Skills</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student.id} className="border-t">
                  <td className="text-left py-3 px-4">{index + 1}</td>
                  <td className="text-left py-3 px-4 capitalize">{student.name}</td>
                  <td className="text-left py-3 px-4 capitalize">{student.skills}</td>
                  <td className="text-left py-3 px-4 space-x-2">
                    {/* Action Buttons */}
                    <button className="text-blue-500 hover:text-blue-700 transition">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="text-green-500 hover:text-green-700 transition">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
