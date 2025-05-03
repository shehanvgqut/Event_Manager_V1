// pages/UserDashboard.jsx
const UserDashboard = () => {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Event Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Manage your upcoming events, view event history, and stay updated with notifications.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
            <p className="text-gray-500 mb-2">Check your upcoming scheduled events.</p>
            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              View Events
            </button>
          </div>
  
          {/* My Registrations */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">My Registrations</h2>
            <p className="text-gray-500 mb-2">View events you've registered for.</p>
            <button className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              My Registrations
            </button>
          </div>
  
          {/* Notifications */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <p className="text-gray-500 mb-2">Stay updated with event changes or announcements.</p>
            <button className="mt-2 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
              View Notifications
            </button>
          </div>
        </div>
  
        {/* History & Past Events */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
          <div className="bg-white p-4 shadow rounded text-gray-500">
            You haven't attended any events yet. Once you participate, your history will appear here.
          </div>
        </div>
      </div>
    );
  };
  
  export default UserDashboard;
  