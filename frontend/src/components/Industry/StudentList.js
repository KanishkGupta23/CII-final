import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedActions, setSelectedActions] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://cii-final-2.onrender.com/api/applications');
        if (Array.isArray(response.data)) {
          setApplications(response.data);
        } else {
          setApplications([response.data]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications data:", error);
        setError("Failed to fetch applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Handle dropdown action selection for each application
  const handleActionChange = (id, action) => {
    setSelectedActions((prevState) => ({
      ...prevState,
      [id]: action,
    }));
  };

  // Handle form submission to send emails based on selected actions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPromises = applications.map((application) => {
      const action = selectedActions[application._id];

      if (action) {
        const emailData = {
          email: application.user?.email,
          action,
          applicationId: application._id,
        };

        return axios
          .post('https://cii-final-2.onrender.com/api/send-email', emailData)
          .then((response) => {
            console.log(`Email sent for application ${application._id}:`, response.data);
          })
          .catch((err) => {
            console.error(`Error sending email for application ${application._id}:`, err);
          });
      }
      return Promise.resolve();
    });

    await Promise.all(emailPromises);
    alert('Emails have been sent based on selected actions!');
  };

  // Loading and error handling
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center w-full px-2 md:px-10 items-start min-h-screen bg-gray-100 py-10">
      <div className="container bg-white shadow-lg rounded-lg w-full">
        <h2 className="text-3xl font-bold text-center text-indigo-900 py-6">Students List</h2>

        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse text-xs md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">S.No.</th>
                  <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Name</th> {/* New Column for Name */}
                  <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Job Title</th>
                  <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Key Skills</th>
                  <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Applicant Email</th>
                  <th className="border md:p-3 p-1.5 text-gray-600 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((application, index) => (
                    <tr key={application._id} className="text-center bg-white hover:bg-gray-100">
                      <td className="border md:p-3 py-2 px-1">{index + 1}</td>
                      <td className="border md:p-3 py-2 px-1">{application.user?.username || 'N/A'}</td> {/* Displaying Name */}
                      <td className="border md:p-3 py-2 px-1">{application.openings?.job_title || 'N/A'}</td>
                      <td className="border md:p-3 py-2 px-1">
                        {Array.isArray(application.openings?.key_skills) && application.openings.key_skills.length > 0
                          ? application.openings.key_skills.join(', ')
                          : 'No skills listed'}
                      </td>
                      <td className="border md:p-3 py-2 px-1">{application.user?.email || 'Email not available'}</td>
                      <td className="border md:p-3 py-2 px-1">
                        <select
                          className="form-select block w-full p-2 border border-gray-300 rounded-md"
                          onChange={(e) => handleActionChange(application._id, e.target.value)}
                          value={selectedActions[application._id] || ''}
                        >
                          <option value="">Select Action</option>
                          <option value="selected">Selected</option>
                          <option value="schedule">Schedule Interview</option>
                          <option value="consideration">Under Consideration</option>
                          <option value="reject">Reject</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 p-4">
                      No job applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="text-center p-6">
            <button
              type="submit"
              className="p-6 bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Send Mails
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentsList;
