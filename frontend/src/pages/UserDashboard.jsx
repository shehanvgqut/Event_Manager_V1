import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [notification, setNotification] = useState(""); // Stores temporary success messages
  const [showBanner, setShowBanner] = useState(false); // Controls banner visibility

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
      setNotification(`Left ${eventName} Successfully ❌`);
    } else {
      updatedEvents = [...joinedEvents, eventName]; // Add event to joined list
      setNotification(`Joined ${eventName} Successfully ✅`);
    }

    setJoinedEvents(updatedEvents);
    localStorage.setItem("joinedEvents", JSON.stringify(updatedEvents)); // Save to local storage

    // Show banner
    setShowBanner(true);

    // Hide banner after 2 seconds with smooth fade-out
    setTimeout(() => {
      setShowBanner(false);
      setNotification(""); // Clear notification
    }, 2000);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full relative">
      {/* Improved Notification Banner with Smooth Fade-in and Fade-out */}
      {showBanner && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 text-center px-6 py-3 font-semibold text-white rounded-lg transition-opacity duration-700 ease-in-out ${showBanner ? "opacity-100" : "opacity-0"} ${notification.includes("Joined") ? "bg-green-500" : "bg-red-500"}`}>
          {notification}
        </div>
      )}

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
    </div>
  );
};

export default UserDashboard;