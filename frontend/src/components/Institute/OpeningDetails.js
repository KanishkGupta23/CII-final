import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const OpeningDetails = () => {
  const [opening, setOpening] = useState(null); // State to store opening data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add Student Modal state
  const [isViewAppliedModalOpen, setIsViewAppliedModalOpen] = useState(false); // View Students Applied Modal state
  const [selectedStudents, setSelectedStudents] = useState([]); // Selected students state

  // Mock opening data
  const mockOpeningData = {
    job_title: "Software Engineer Intern",
    job_description: "An internship opportunity for software engineers with a focus on full-stack development.",
    location: "Bangalore, India",
    experience_required: "0-1 year",
    skills_required: "JavaScript, React, Node.js",
    salary_range: "10,000 - 15,000 INR per month",
  };

  // Mock student data
  const studentsApplied = [
    { sno: 1, name: 'Amit Sharma', email: 'amit.sharma@example.com', skills: 'Java, React' },
    { sno: 2, name: 'Priya Verma', email: 'priya.verma@example.com', skills: 'Python, Django' },
    { sno: 3, name: 'Rahul Mehta', email: 'rahul.mehta@example.com', skills: 'C++, Machine Learning' },
    { sno: 4, name: 'Sneha Joshi', email: 'sneha.joshi@example.com', skills: 'UI/UX Design, Figma' },
  ];

  const studentsAvailable = [
    { sno: 1, name: 'Rohit Singh', email: 'rohit.singh@example.com', skills: 'Angular, Node.js' },
    { sno: 2, name: 'Megha Gupta', email: 'megha.gupta@example.com', skills: 'React, Next.js' },
    { sno: 3, name: 'Suresh Kumar', email: 'suresh.kumar@example.com', skills: 'Data Science, R' },
    { sno: 4, name: 'Neha Kapoor', email: 'neha.kapoor@example.com', skills: 'Java, Spring Boot' },
  ];

  // Fetch data from the backend (mocked here)
  useEffect(() => {
    const fetchOpeningDetails = async () => {
      try {
        // Simulate fetching from backend
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        setOpening(mockOpeningData);
      } catch (err) {
        setError("Failed to fetch opening details");
      } finally {
        setLoading(false);
      }
    };

    fetchOpeningDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Modal Styles
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '900px',
      padding: '20px',
    },
  };

  // Handle checkbox selection for students
  const handleCheckboxChange = (student) => {
    setSelectedStudents((prev) => {
      if (prev.includes(student)) {
        return prev.filter((s) => s !== student);
      } else {
        return [...prev, student];
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 m-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Opening Details</h2>
      <table className="table-auto w-full text-left mb-6">
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4 font-medium">Job Title:</td>
            <td className="py-2 px-4">{opening?.job_title || "N/A"}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-medium">Description:</td>
            <td className="py-2 px-4">{opening?.job_description || "N/A"}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-medium">Location:</td>
            <td className="py-2 px-4">{opening?.location || "N/A"}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-medium">Experience Required:</td>
            <td className="py-2 px-4">{opening?.experience_required || "N/A"}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-medium">Skills Required:</td>
            <td className="py-2 px-4">{opening?.skills_required || "N/A"}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4 font-medium">Salary Range:</td>
            <td className="py-2 px-4">{opening?.salary_range || "N/A"}</td>
          </tr>
        </tbody>
      </table>

      {/* Action buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => setIsAddModalOpen(true)} // Open Add Student Modal
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Add More Students
        </button>
        <button
          onClick={() => setIsViewAppliedModalOpen(true)} // Open View Students Applied Modal
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          View Students Applied
        </button>
      </div>

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)} // Close modal
        style={modalStyles}
        contentLabel="Add More Students Modal"
      >
        <h2 className="text-xl font-bold mb-4">Add More Students</h2>
        <table className="table-auto w-full text-left mb-4">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4">Select</th>
              <th className="py-2 px-4">S.No</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Skills</th>
            </tr>
          </thead>
          <tbody>
            {studentsAvailable.map((student, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(student)}
                    // checked={selectedStudents.includes(student)}
                  />
                </td>
                <td className="py-2 px-4">{student.sno}</td>
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.email}</td>
                <td className="py-2 px-4">{student.skills}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => alert(`Added ${selectedStudents.length-11} students`)}
          >
            Add Student
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setIsAddModalOpen(false)} // Close modal
          >
            Close
          </button>
        </div>
      </Modal>

      {/* View Students Applied Modal */}
      <Modal
        isOpen={isViewAppliedModalOpen}
        onRequestClose={() => setIsViewAppliedModalOpen(false)} // Close modal
        style={modalStyles}
        contentLabel="View Students Applied Modal"
      >
        <h2 className="text-xl font-bold mb-4">Opening Details: View Students Applied</h2>
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4">S.No</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Skills</th>
            </tr>
          </thead>
          <tbody>
            {studentsApplied.map((student, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{student.sno}</td>
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.email}</td>
                <td className="py-2 px-4">{student.skills}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setIsViewAppliedModalOpen(false)} // Close modal
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OpeningDetails;
