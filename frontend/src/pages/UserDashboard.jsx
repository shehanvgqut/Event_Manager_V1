import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [leftEvent, setLeftEvent] = useState("");

  // Load joined events from local storage when the component mounts
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("joinedEvents")) || [];
    setJoinedEvents(savedEvents);
  }, []);

  const events = [
    { name: "Car Meet", date: "10th May 2025", route: "/car-meet" },
    { name: "Movie Night", date: "11th May 2025", route: "/movie-night" },
    { name: "Brisbane Fest", date: "14th May 2025", route: "/brisbane-fest" },
    { name: "Birdwatching", date: "16th May 2025", route: "/birdwatching" }
  ];

  const handleJoinOrLeaveEvent = (eventName, e) => {
    e.preventDefault(); // Prevents navigation on click
    let updatedEvents;
    if (joinedEvents.includes(eventName)) {
      updatedEvents = joinedEvents.filter(event => event !== eventName); // Remove event if already joined
      setLeftEvent(eventName); // Show event left message
    } else {
      updatedEvents = [...joinedEvents, eventName]; // Add event to joined list
      setLeftEvent(""); // Reset left event message when joining
    }
    setJoinedEvents(updatedEvents);
    localStorage.setItem("joinedEvents", JSON.stringify(updatedEvents)); // Save to local storage
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>

      {events.map((event) => (
        <Link key={event.name} to={event.route} className="block">
          <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-2 cursor-pointer">
            <div className="flex items-center gap-5">
              <span className="text-yellow-500 text-2xl">⭐</span>
              <div>
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-gray-500">{event.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                className={`${joinedEvents.includes(event.name) ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white px-4 py-2 rounded`}
                onClick={(e) => handleJoinOrLeaveEvent(event.name, e)}
              >
                {joinedEvents.includes(event.name) ? "Leave Event" : "Join Event"}
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        </Link>
      ))}

      {/* Messages for joined or left events */}
      {joinedEvents.length > 0 && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg shadow">
          {joinedEvents.map((eventName) => (
            <p key={eventName} className="text-green-700 font-semibold">Joined {eventName} Successfully ✅</p>
          ))}
        </div>
      )}

      {leftEvent && (
        <div className="mt-4 p-4 bg-red-100 rounded-lg shadow">
          <p className="text-red-700 font-semibold">Left {leftEvent} Successfully ❌</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;