// App.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Footer from "./components/LandingPages/Footer.js";
import Navbar from "./components/Navbar.js";
import IndustriesRoot from "./components/Institute/InstitutionRoot.js";
import JobDetails from "./components/Students/JobDetails.js";
import Industries from "./components/Industry/Industries.js";
import Signup from "./components/Auth/Signup.js";
import Login from "./components/Auth/Login.js";
import ResetPassword from "./components/Auth/PasswordRest.js";
import Logout from "./components/Auth/Logout.js";
import IndustryStudent from "./components/Students/Industry.js";
import MyApplications from "./components/Students/MyApplications.js";
import StudentProfile from "./components/Students/StudentProfileView.js";
import { setUser } from "./components/redux/userDataSlice.js"; // Import the action
import axios from "axios";
import UnauthorizedPage from "./components/UnauthorizedPage"; // Import UnauthorizedPage
import StudentRoot from "./components/Students/StudentRoot.js";
import PageNotFound from "./components/LandingPages/PageNotFound.js";
import ViewIndustry from "./components/Industry/ViewIndustry.js";
import { UnAuthIndustry } from "./components/Industry/UnAuthIndustry.js";
import UnAuthInstitute from "./components/Institute/UnAuthInstitute.js";
import UnAuthViewInstitute from "./components/Institute/UnAuthViewInstitute.js";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

function App() {
  const user = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "https://cii-final-2.onrender.com/api/v1/CII/auth/getUser",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Dispatch user data to Redux store
          dispatch(setUser(response.data));
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      };

      fetchUserData();
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {user ? (
          <>
            <Route path="/logout" element={<Logout />} />
            {user.userType === "student" ? (
              <>
                <Route path="/profile" element={<StudentRoot />} />
                <Route path="/student/:profileTab" element={<StudentRoot />} />
                <Route path="/industries" element={<UnAuthIndustry />} />
                <Route path="/institutions" element={<UnAuthInstitute />} />
                <Route
                  path="/institutes/:id"
                  element={<UnAuthViewInstitute />}
                />
                <Route
                  path="/industries/:industryTab"
                  element={<UnauthorizedPage />}
                />
              </>
            ) : user.userType === "industry" ? (
              <>
                <Route path="/industries" element={<Industries />} />
                <Route
                  path="/industries/:industryTab"
                  element={<Industries />}
                />
                {/* Unauthorized access for other user types */}
                <Route path="/viewdetails" element={<UnauthorizedPage />} />
                <Route path="/profile" element={<UnauthorizedPage />} />
                <Route path="/viewjobs" element={<UnauthorizedPage />} />
                <Route path="/myapplications" element={<UnauthorizedPage />} />
                <Route path="/institutions" element={<UnAuthInstitute />} />
                <Route
                  path="/institutes/:id"
                  element={<UnAuthViewInstitute />}
                />
              </>
            ) : user.userType === "institute" ? (
              <>
                <Route path="/institutions" element={<IndustriesRoot />} />
                <Route
                  path="/institutions/:instituteTab"
                  element={<IndustriesRoot />}
                />
                {/* Unauthorized access for other user types */}
                <Route path="/viewdetails" element={<UnauthorizedPage />} />
                <Route path="/profile" element={<UnauthorizedPage />} />
                <Route path="/viewjobs" element={<UnauthorizedPage />} />
                <Route path="/myapplications" element={<UnauthorizedPage />} />
                <Route path="/industries" element={<UnAuthIndustry />} />
                <Route
                  path="/industries/:industryTab"
                  element={<UnauthorizedPage />}
                />
              </>
            ) : null}
          </>
        ) : // <Route path="*" element={<UnauthorizedPage />} />
        null}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/viewIndustry/:id" element={<ViewIndustry />} />

        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/viewdetails" element={<UnauthorizedPage />} />
        <Route path="/profile" element={<UnauthorizedPage />} />
        <Route path="/viewjobs" element={<UnauthorizedPage />} />
        <Route path="/myapplications" element={<UnauthorizedPage />} />
        <Route path="/institutions" element={<UnAuthInstitute />} />
        <Route path="/institutes/:id" element={<UnAuthViewInstitute />} />
        {/* <Route
          path="/institutions/:instituteTab"
          element={<UnauthorizedPage />}
        /> */}
        <Route path="/industries" element={<UnAuthIndustry />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
