import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2"; // Change to Bar chart
import { Doughnut } from "react-chartjs-2"; // Keep Doughnut chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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
        const [studentsRes, openingsRes, institutesRes, applicationsRes] =
          await Promise.all([
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

  // Chart data for vertical bar chart
  const barData = {
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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options for vertical bar chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Counts by Category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5, // Adjust this value for better visibility
        },
      },
    },
  };

  // Chart data for doughnut chart
  const doughnutData = {
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
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for doughnut chart
  const doughnutOptions = {
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
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={headingStyle}>Industry Dashboard</h1>
      <div style={statsContainer}>
        <div style={cardStyle}>
          <h2>Total Students</h2>
          <p style={countStyle}>{stats.totalStudents}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Openings</h2>
          <p style={countStyle}>{stats.totalOpenings}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Institutes</h2>
          <p style={countStyle}>{stats.totalInstitutes}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Applications</h2>
          <p style={countStyle}>{stats.totalApplications}</p>
        </div>
      </div>
      <div className="flex  justify-between flex-col lg:flex-row">
        <div className="lg:w-3/5 sm:w-full h  p-2">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="lg:w-1/3  sm:w-full p-2">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};

// Styles for the dashboard
const dashboardStyle = {
  backgroundColor: "#f4f6f9",
  minHeight: "100vh",
  padding: "40px 20px",
  width: "100%",
  fontFamily: "'Arial', sans-serif",
};

const headingStyle = {
  textAlign: "center",
  color: "#342d73",
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
  padding: "30px", // Increased padding
  width: "250px", // Increased card width
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Increased shadow for better effect
  marginBottom: "20px",
  color: "#342d73",
};

const countStyle = {
  fontSize: "24px", // Increased font size for counts
  fontWeight: "bold",
};

const chartContainerStyle = {
  maxWidth: "800px", // Adjust to your preferred size
  height: "600px", // Increased height for better visibility
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Increased shadow for better effect
  display: "flex",
};

export default Dashboard;
