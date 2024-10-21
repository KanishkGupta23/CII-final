import React, { useState } from "react";

const EventManager = () => {
  // Default mock events with industry names and company names
  const [events, setEvents] = useState([
    {
      title: "React Workshop",
      time: "10:00",
      date: "2024-11-01",
      thumbnail: "https://via.placeholder.com/150/FF0000/FFFFFF?text=React+Workshop",
      industry: "Software Development",
      company: "Tata Consultancy Services",
    },
    {
      title: "Data Science Conference",
      time: "12:00",
      date: "2024-12-10",
      thumbnail: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Data+Science",
      industry: "Data Science",
      company: "Infosys",
    },
    {
      title: "AI & ML Meetup",
      time: "15:30",
      date: "2024-11-15",
      thumbnail: "https://via.placeholder.com/150/008000/FFFFFF?text=AI+Meetup",
      industry: "Artificial Intelligence",
      company: "Wipro",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 w-full">
      <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Event Manager</h1>

        {/* Event List (Cards) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 transition hover:shadow-lg"
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
                <p className="text-gray-600">
                  {event.date} at {event.time}
                </p>
                <p className="text-sm text-gray-500 mt-2">Industry: {event.industry}</p>
                <p className="text-sm text-gray-500">Company: {event.company}</p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                  Collaborate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventManager;
