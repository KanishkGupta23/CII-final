// src/components/Dashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalOpenings: 0,
    totalInstitutes: 0,
    totalApplications: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, openingsRes, institutesRes, applicationsRes] = await Promise.all([
          axios.get("https://cii-final-2.onrender.com/api/students"),
          axios.get("https://cii-final-2.onrender.com/api/openings"),
          axios.get("https://cii-final-2.onrender.com/api/institutes"),
          axios.get("https://cii-final-2.onrender.com/api/applications"),
        ]);

        setStats({
          totalStudents: studentsRes.data.totalStudents || 0,
          totalOpenings: openingsRes.data.totalOpenings || 0,
          totalInstitutes: institutesRes.data.totalInstitutes || 0,
          totalApplications: applicationsRes.data.totalApplications || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  // Chart data
  const data = {
    labels: ["Students", "Openings", "Institutes", "Applications"],
    datasets: [
      {
        label: "Total Count",
        data: [
          stats.totalStudents,
          stats.totalOpenings,
          stats.totalInstitutes,
          stats.totalApplications,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Single color for all bars
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Real-time Dashboard Data",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={dashboardStyle} className="w-full">
      <h1 style={headingStyle}>Institute Dashboard</h1>
      <div style={statsContainer}>
        <div style={cardStyle}>
          <h2>Total Students</h2>
          <p>{stats.totalStudents}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Openings</h2>
          <p>{stats.totalOpenings}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Institutes</h2>
          <p>{stats.totalInstitutes}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Applications</h2>
          <p>{stats.totalApplications}</p>
        </div>
      </div>
      <div style={chartContainerStyle}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

// Styles for the dashboard
const dashboardStyle = {
  backgroundColor: "#f4f6f9",
  minHeight: "100vh",
  padding: "40px 20px",
  fontFamily: "'Arial', sans-serif",
};

const headingStyle = {
  textAlign: "center",
  color: "#333",
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "40px",
};

const statsContainer = {
  display: "flex",
  justifyContent: "space-evenly", // Adjust spacing between cards
  marginBottom: "40px",
  flexWrap: "wrap", // For better responsiveness
  gap: "20px", // Adds space between the cards
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "20px",
  width: "220px", // Adjust card width
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  color: "#333",
};

const chartContainerStyle = {
  maxWidth: "1000px", // Increase width to make the chart larger
  height: "500px", // Increase chart height
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default Dashboard;
