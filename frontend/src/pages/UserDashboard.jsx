import { Link } from "react-router-dom";
import { useState } from "react";

const UserDashboard = () => {
  const [joinedEvents, setJoinedEvents] = useState([]); // Stores all joined events

  const events = [
    { name: "Car Meet", date: "10th May 2025", route: "/car-meet" },
    { name: "Movie Night", date: "11th May 2025", route: "/movie-night" },
    { name: "Brisbane Fest", date: "14th May 2025", route: "/brisbane-fest" },
    { name: "Birdwatching", date: "16th May 2025", route: "/birdwatching" }
  ];

  const handleJoinEvent = (eventName, e) => {
    e.preventDefault(); // Prevents navigation on click
    if (!joinedEvents.includes(eventName)) {
      setJoinedEvents([...joinedEvents, eventName]); // Adds event to joined list
    }
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
                className={`${joinedEvents.includes(event.name) ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white px-4 py-2 rounded`}
                onClick={(e) => handleJoinEvent(event.name, e)}
                disabled={joinedEvents.includes(event.name)} // Disables button once joined
              >
                {joinedEvents.includes(event.name) ? "Event Joined" : "Join Event"}
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        </Link>
      ))}

      {joinedEvents.length > 0 && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg shadow">
          {joinedEvents.map((eventName) => (
            <p key={eventName} className="text-green-700 font-semibold">Joined {eventName} Successfully ✅</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;