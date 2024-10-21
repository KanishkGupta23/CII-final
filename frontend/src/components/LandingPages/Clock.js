import React, { useEffect, useState } from "react";
import { CiInstagram } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaClock } from "react-icons/fa";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      };
      
      const formattedTime = now.toLocaleString('en-IN', options);
      setCurrentTime(removeAt(formattedTime)); // Call the function to clean the time
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Function to remove the "at" if it exists
  const removeAt = (timeString) => {
    return timeString.replace(/\s+at\s+/g, ' '); // Remove " at " if present
  };

  return (
    <div className="flex justify-between items-center h-14 bg-blue-900 text-white z-10 px-4 font-mono">
      {/* Left Side Clock */}
      <div className="flex items-center ml-5">
        <FaClock className="w-5 h-5 mr-2" /> 
        <p className="text-md">{currentTime}</p>
      </div>

      {/* Right Side Social Media Icons */}
      <div className="flex space-x-6 items-center">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-2xl text-white" />
        </a>
        
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <CiTwitter className="text-2xl text-white" />
        </a>

        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <CiInstagram className="text-2xl text-white mr-5" />
        </a>
      </div>
    </div>
  );
};

export default Clock;
