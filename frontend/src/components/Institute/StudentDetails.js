import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import axios from "axios"; // Import axios for API calls

const StudentDetails = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  // const [students, setStudents] = useState( [
  //   {
  //     id: 1,
  //     name: "Amit Sharma",
  //     skills: "JavaScript, React, Node.js",
  //   },
  //   {
  //     id: 2,
  //     name: "Priya Gupta",
  //     skills: "Python, Django, Machine Learning",
  //   },
  //   {
  //     id: 3,
  //     name: "Rahul Verma",
  //     skills: "Java, Spring Boot, Microservices",
  //   },
  //   {
  //     id: 4,
  //     name: "Sneha Iyer",
  //     skills: "HTML, CSS, Bootstrap, Tailwind",
  //   },
  //   {
  //     id: 5,
  //     name: "Vikas Mehta",
  //     skills: "C++, Algorithms, Data Structures",
  //   },
  //   {
  //     id: 6,
  //     name: "Anjali Rao",
  //     skills: "SQL, PostgreSQL, MongoDB",
  //   },
  //   {
  //     id: 7,
  //     name: "Karan Patel",
  //     skills: "Flutter, Dart, Mobile App Development",
  //   },
  //   {
  //     id: 8,
  //     name: "Meera Singh",
  //     skills: "Data Analysis, Power BI, Tableau",
  //   },
  // ]
  // ); // State to store student data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  const mockStudents = [
    {
      id: 1,
      name: "Amit Sharma",
      skills: "JavaScript, React, Node.js",
    },
    {
      id: 2,
      name: "Priya Gupta",
      skills: "Python, Django, Machine Learning",
    },
    {
      id: 3,
      name: "Rahul Verma",
      skills: "Java, Spring Boot, Microservices",
    },
    {
      id: 4,
      name: "Sneha Iyer",
      skills: "HTML, CSS, Bootstrap, Tailwind",
    },
    {
      id: 5,
      name: "Vikas Mehta",
      skills: "C++, Algorithms, Data Structures",
    },
    {
      id: 6,
      name: "Anjali Rao",
      skills: "SQL, PostgreSQL, MongoDB",
    },
    {
      id: 7,
      name: "Karan Patel",
      skills: "Flutter, Dart, Mobile App Development",
    },
    {
      id: 8,
      name: "Meera Singh",
      skills: "Data Analysis, Power BI, Tableau",
    },
  ];
  
  console.log(mockStudents)

  // Fetch student data from the backend
  // useEffect(() => {
  //   axios
  //     .get("https://cii-final-2.onrender.com/api/students") // Replace with your backend endpoint
  //     .then((response) => {
  //       setStudents(response.data); // Update state with fetched data
  //       setLoading(false); // Set loading to false once data is fetched
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching student data:", err);
  //       setError("Failed to load student data.");
  //       setLoading(false); // Stop loading in case of error
  //     });
  // }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading:", file);
      setUploadStatus("File uploaded successfully!");
      // Add your file upload logic here
    } else {
      setUploadStatus("Please select a file to upload.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full py-10">
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
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-300"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
          {uploadStatus && (
            <p className="mt-2 text-green-600">{uploadStatus}</p>
          )}
        </div>

        {/* Conditional rendering for loading, error, or student table */}
        {/* {loading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : ( */}
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
              {mockStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-t hover:bg-gray-100 transition duration-150"
                >
                  <td className="text-left py-3 px-4">{index + 1}</td>
                  <td className="text-left py-3 px-4 capitalize">
                    {student.name}
                  </td>
                  <td className="text-left py-3 px-4 capitalize">
                    {student.skills}
                  </td>
                  <td className="border md:p-3 py-2 px-1 flex justify-center md:space-x-4 space-x-1">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="View"
                    >
                      
                      <FaRegEye size={20} />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      aria-label="Edit"
                    >
                      <TiPencil size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        {/* )} */}
      </div>
    </div>
  );
};

export default StudentDetails;
