import React from "react";

const UserEventsPage = () => {
  const handleLeave = (eventTitle) => {
    alert(`Leave event: ${eventTitle}`);
  };

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

        {/* Status, Time, and Button */}
        <div className="flex flex-row items-center gap-4">
          <span className="bg-green-100 text-green-400 px-2 py-1 rounded">Registration Completed</span>
          <span className="bg-red-100 text-red-400 px-2 py-1 rounded">In 2 hours</span>
          <button
            onClick={() => handleLeave("Car Meet")}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Exit Event
          </button>
        </div>
      </div>

      {/* Second Event */}
      <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-2">
        <div className="flex items-center gap-5">
          <span className="text-blue-500 text-2xl">🎉</span>
          <div>
            <h3 className="text-lg font-semibold">Music Festival</h3>
            <p className="text-gray-500">15th May 2025</p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4">
          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Pending Approval</span>
          <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded">In 5 days</span>
          <button
            onClick={() => handleLeave("Music Festival")}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Exit Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEventsPage;
