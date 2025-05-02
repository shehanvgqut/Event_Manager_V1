import React from "react";
import { Clock, MessageSquare, List } from "lucide-react";

const AdminEventCard = ({
  eventName,
  eventPriority,
  eventTime,
  isEventUrgent,
  adminName = "Yash Ghori",
  eventId = "#402235",
}) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between mb-4">
    <div className="flex items-start gap-4">
      <div className="text-yellow-400 text-2xl">☀️</div>
      <div>
        <h3 className="font-semibold">{eventName}</h3>
        <p className="text-sm text-gray-500">
          {eventId} Created 10 days ago by <span className="font-semibold">{adminName}</span>
        </p>
        <div className="flex gap-2 mt-1">
          <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
            Completed
          </span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              eventPriority === "high"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {eventPriority}
          </span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-mono ${
          isEventUrgent
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        <Clock size={16} /> {eventTime}
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <span>2</span>
        <List size={20} />
        <MessageSquare size={20} />
      </div>
    </div>
  </div>
);

const AdminEventsPage = () => {
  const adminEvents = [
    {
      eventName: "Beauty Bosses Unlocked with Laura King | Brisbane",
      eventPriority: "low",
      eventTime: "00:15:00",
      isEventUrgent: true,
    },
    {
      eventName: "PEPA Conference 2025 Virtual",
      eventPriority: "low",
      eventTime: "00:30:00",
    },
    {
      eventName: "Relationship based practice in adult social work",
      eventPriority: "low",
      eventTime: "00:30:00",
    },
    {
      eventName: "AIM HIGH! Navigating Difficult Conversations",
      eventPriority: "low",
      eventTime: "00:30:00",
    },
    {
      eventName: "Make an Automatic Payment System that enable the design",
      eventPriority: "high",
      eventTime: "00:30:00",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Admin Events</h2>
        <button className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-200">
          Add Event
        </button>
      </div>

      {adminEvents.map((event, index) => (
        <AdminEventCard key={index} {...event} />
      ))}

      <div className="flex justify-center gap-4 mt-6 text-gray-600">
        <button className="text-sm hover:underline">Previous</button>
        <button className="w-6 h-6 text-white bg-gray-700 rounded-full text-sm">1</button>
        <button className="w-6 h-6 text-white bg-blue-600 rounded-full text-sm">2</button>
        <button className="w-6 h-6 text-white bg-gray-700 rounded-full text-sm">3</button>
        <button className="text-sm hover:underline">Next</button>
      </div>
    </div>
  );
};

export default AdminEventsPage;