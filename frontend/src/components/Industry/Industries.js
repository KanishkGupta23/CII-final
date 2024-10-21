import React from "react";
import Sidebar from "./SideBarerror";
import { useParams } from "react-router-dom";
import Applications from "./Applications";
import ManageOpenings from "./ManageOpenings";
import Dashboard from "./Dashboard";
import Institution from "./Institution";
import StudentsList from "./StudentList";
import EventForm from "./EventForm";
import JobOpeningForm from "./JobOpeningForm";
function Industries() {
    const tab = useParams().industryTab;
  return (
    <section className="flex">
      <Sidebar />
      {tab === "applications" ? <Applications /> : tab === "openings" ? <ManageOpenings /> : tab === "InstituteApplication" ?<Institution/> :tab ==="StudentList" ? <StudentsList/>: tab ==="openjob" ? <JobOpeningForm /> : tab === "manageevents" ? <EventForm /> : <Dashboard />} 
        

    </section>
  );
}

export default Industries;
