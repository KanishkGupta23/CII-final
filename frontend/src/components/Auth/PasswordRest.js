import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userData.user);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    if(user.email !== email){
      setError("Email Invalid");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://cii-final-2.onrender.com/api/v1/CII/auth/change-password', {
        email,
        password: newPassword,
      }, { withCredentials: true });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while changing the password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h2>
        <form onSubmit={handleResetPassword}>
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
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
