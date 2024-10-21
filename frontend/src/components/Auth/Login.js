import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {  setUser } from "../redux/userDataSlice";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
// impo {login}

const Login = () => {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://cii-final-2.onrender.com/api/v1/CII/auth/login",
        {
          username, // Using username here
          password,
        }
      );

      // Store token in cookies
      document.cookie = `token=${response.data.token}; path=/; max-age=3600`; // 1 hour expiration
      dispatch(setUser(response.data.user));
      setSuccess(response.data.message);
      if(response.data.user.userType === "industry"){
        navigate("/industries")
      }
      else if(response.data.user.userType === "institute"){
        navigate("/institutions")
      }
      else if(response.data.user.userType === "student"){
        navigate("/profile")
      }
     

      // Redirect to dashboard or home page
      //   navigate('/dashboard');
      // navigate('/industries');
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
