import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  // Get user data from Redux store
  const user = useSelector((state) => state.userData.user);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {user ? (
          <>
            <h1 className="text-4xl font-bold text-red-600">Unauthorized Access</h1>
            <p className="mt-4 text-lg">
              You do not have permission to access this page.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Back to Home
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-red-600">Login Required</h1>
            <p className="mt-4 text-lg">
              You need to log in to access this page.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Move to Login Page
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UnauthorizedPage;
