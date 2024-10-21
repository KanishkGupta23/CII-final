import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post('https://cii-final-2.onrender.com/api/v1/CII/auth/signup', {
        fullname,
        email,
        userType,
      });
      setSuccess(response.data.message);
      // Clear form fields after successful signup
      setFullname('');
      setEmail('');
      setUserType('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-5">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
            >
              <option value="">Select User Type</option>
              <option value="student">Student</option>
              <option value="institute">Institute</option>
              <option value="industry">Industry</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          <button 
            type="submit" 
            disabled={loading} // Disable button when loading
            className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'} {/* Change button text when loading */}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
