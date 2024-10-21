import React, { useEffect, useState } from "react";
import Sidebar from "./SideBarerror";
import { useParams } from "react-router-dom";
import MyApplications from "./MyApplications";
import StudentProfile from "./StudentProfileView";
import ResetPassword from "../Auth/PasswordRest";
import IndustryStudent from "./Industry";
import JobDetails from "./JobDetails";
import StudentProfileView from "./StudentProfileView";
import StudentProfileEdit from "./StudentProfileEdit";
import { useSelector } from "react-redux";
import axios from "axios";
function StudentRoot() {
  const user = useSelector((state) => state.userData.user);
  const [instituteData, setinstitute] = useState(null)
  const [student, setStudent] = useState({
    user: user._id, // This would be the ObjectId of the associated User
    name: user.fullname,
    headline: "",
    currentEmployment: "",
    educationalDegree: "",
    institute: "", // This would be the ObjectId of the associated Institute
    openForJobs: false,
    resume: "",
    pastExperience: 0, // 2 years of experience
    skills: [],
    linkedinLink: "",
    githubLink: "",
    jobCategory: "",
    contactNumber: "",
    email: user.email,
    profilePic: "", // Path to the profile picture
  });

  const { profileTab: tab } = useParams();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://cii-final-2.onrender.com/api/appliedstudent/student/${user._id}`
      );
      if (response.status === 200 && response.data) {
        setStudent((prevStudent) => ({
          ...prevStudent,
          ...response.data,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
    try {
      const response = await axios.get(
        `https://cii-final-2.onrender.com/api/institutes/institutes`
      );
      if (response.status === 200 && response.data) {
        setinstitute(response.data.institutes);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  useEffect(() => {
    if (user._id) {
      fetchUserData();
    }
  }, [user._id]);

  if (!student) {
    return <div>Loading...</div>; // Loading state while fetching data
  }
  return (
    <section className="flex min-h-screen">
      <Sidebar />
      {tab === "profile" ? (
        <StudentProfileView student={student} instituteData={instituteData} />
      ) : tab === "editprofile" ? (
        <StudentProfileEdit student={student} fetchUserData={fetchUserData} instituteData={instituteData}/>
      ) : tab === "viewapplications" ? (
        <MyApplications />
      ) : tab === "viewjobs" ? (
        <IndustryStudent />
      ) : tab === "resetpassword" ? (
        <ResetPassword />
      ) : tab === "viewdetails" ? (
        <JobDetails />
      ) : tab === "resetpassword" ? (
        <ResetPassword />
      ) : (
        <StudentProfileView student={student} />
      )}
    </section>
  );
}

export default StudentRoot;
