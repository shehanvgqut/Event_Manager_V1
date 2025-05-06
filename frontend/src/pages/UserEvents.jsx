import React from "react";

const UserEventCard = ({ title, priority, time, createdBy = "Unknown", eventId = "N/A" }) => (
  <div style={{ background: "#fff", padding: "1rem", marginBottom: "1rem", borderRadius: "10px", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
    <h3>{title}</h3>
    <p style={{ color: "#555", fontSize: "0.9rem" }}>
      {eventId} • Created by <strong>{createdBy}</strong>
    </p>
    <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
      Priority: <strong>{priority}</strong> | Time: <strong>{time}</strong>
    </p>
  </div>
);

const UserEventsPage = () => {
  const userEvents = [
    { title: "Event 1", priority: "low", time: "10:00 AM" },
    { title: "Event 2", priority: "high", time: "2:00 PM" },
    { title: "Event 3", priority: "medium", time: "4:00 PM" },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
    <h2 className="text-xl font-bold mb-4">My Events</h2>
    {/* First Event */}
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-2">
    {/* Event Details */}
    <div className="flex items-center gap-5">
    <span className="text-yellow-500 text-2xl">⭐</span>
    <div>
      <h3 className="text-lg font-semibold">Car Meet</h3>
      <p className="text-gray-500">10th May 2025</p>
    </div>
    </div>

    {/* Status & Time */}
    <div className="flex flex-row justify-center items-center gap-2">
    <span className="bg-green-100 text-green-400 px-2 py-1 rounded">Registration Completed</span>
    <span className="bg-red-100 text-red-400 px-2 py-1 rounded">In 2 hours</span>
    </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-2">
    {/* Event Details */}
    <div className="flex items-center gap-5">
    <span className="text-yellow-500 text-2xl">⭐</span>
    <div>
      <h3 className="text-lg font-semibold">Car Meet</h3>
      <p className="text-gray-500">10th May 2025</p>
    </div>
    </div>

    {/* Status & Time */}
    <div className="flex flex-row justify-center items-center gap-2">
    <span className="bg-green-100 text-green-400 px-2 py-1 rounded">Registration Completed</span>
    <span className="bg-red-100 text-red-400 px-2 py-1 rounded">In 2 hours</span>
    </div>
    </div>
    </div>
  );
};

export default UserEventsPage;
