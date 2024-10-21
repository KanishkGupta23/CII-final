import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "./redux/userDataSlice"; // Import your clearUser action
import axios from "axios";
import Clock from "./LandingPages/Clock";

const Navbar = () => {
  const user = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const dropdownRef = useRef(null); // Ref for the dropdown

  const handleLogout = async () => {
    dispatch(clearUser());
    await axios.post(
      "https://cii-final-2.onrender.com/api/v1/CII/auth/logout",
      {},
      { withCredentials: true }
    );
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <div className="relative z-10">
        <Clock />
      </div>
      <nav className="max-w-6xl m-auto">
        {/* Logo on the left */}
        <div className="h-24 flex items-center px-6">
          <div className="text-2xl font-bold">
            <img src="logo.jpg" className="w-52 h-14" alt="Logo" />
          </div>

          {/* Links on the right */}
          <div className="flex-grow flex justify-end items-center space-x-8 text-gray-800 font-sans font-medium text-base">
            <Link
              to="/"
              className="hover:text-blue-300 transition duration-200"
            >
              Home
            </Link>
            <a
              href="#about"
              className="hover:text-blue-300 transition duration-200"
            >
              About Us
            </a>
            <Link
              to="/industries"
              className="hover:text-blue-300 transition duration-200"
            >
              Industries
            </Link>
            <Link
              to="/institutions"
              className="hover:text-blue-300 transition duration-200"
            >
              Institutions
            </Link>
            {user?.userType !== "student" &&
              user?.userType !== "institute" &&
              user?.userType !== "industry" && (
                <Link
                  to="/profile"
                  className="hover:text-blue-300 transition duration-200"
                >
                  Profile
                </Link>
              )}

            {user ? (
              user.userType === "student" ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={toggleDropdown}
                    className="hover:text-gray-600 transition duration-200 cursor-pointer"
                  >
                    Hii, {user.fullname}
                  </div>
                  {dropdownOpen && (
                    <div className="absolute -right-15 mt-2 w-48 bg-white border-gray-300 border-[1px] text-black rounded shadow-lg z-20">
                      <ul className="py-2">
                        <li
                          onClick={() => navigate("/student/profile")}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          Profile
                        </li>
                        <li
                          onClick={() => navigate("/student/editprofile")}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          Edit Profile
                        </li>
                        <li
                          onClick={() => navigate("/student/viewapplications")}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          View Applications
                        </li>
                        <li
                          onClick={() => navigate("/student/viewjobs")}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          View Jobs
                        </li>
                        <li
                          onClick={() => navigate("/student/resetpassword")}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          Reset Password
                        </li>
                        <li
                          onClick={handleLogout}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="hover:text-blue-300 transition duration-200"
                >
                  Logout
                </button>
              )
            ) : (
              <Link
                to="/login"
                className="hover:text-blue-300 transition duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
