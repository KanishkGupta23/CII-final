import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('https://cii-final-2.onrender.com/api/v1/CII/auth/logout', {}, { withCredentials: true });
      // Clear cookies (optional if your backend handles it)
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
};

export default Logout;
