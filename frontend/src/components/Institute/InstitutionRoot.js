import React from "react";
import Sidebar from "./SideBarerror";
import { useParams } from "react-router-dom";
import Applications from "./Applications";
import ManageOpenings from "./ManageOpenings";
import Dashboard from "./Dashboard";
import Institution from "./Institution";
import StudentsList from "./OpeningDetails";
import OpeningDetails from "./OpeningDetails";
import StudentDetails from "./StudentDetails";
import EventManager from "./EventManager";
function IndustriesRoot() {
  const tab = useParams().instituteTab;
  return (
    <section className="flex">
      <Sidebar />
      {tab === "applications" ? (
        <Applications />
      ) : tab === "openings" ? (
        <ManageOpenings />
      ) : tab === "InstituteApplication" ? (
        <Institution />
      ) : tab === "StudentList" ? (
        <StudentsList />
      ) : tab === "openingdetails" ? (
        <OpeningDetails />
      ) :  
        tab === "StudentDetails" ? (
        <StudentDetails />
      ) : 
        tab === "manageevents" ? (
        <EventManager />
      ) :  (
        <Dashboard />
      )}
    </section>
  );
}

export default IndustriesRoot;
