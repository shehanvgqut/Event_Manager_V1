// pages/UserDashboard.jsx
const UserDashboard = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
<h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
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

{/* Join Button */}
<div>
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Join Event
</button>
</div>
</div>

{/* Second Event */}
<div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-2">
{/* Event Details */}
<div className="flex items-center gap-5">
<span className="text-yellow-500 text-2xl">⭐</span>
<div>
  <h3 className="text-lg font-semibold">Movie Night</h3>
  <p className="text-gray-500">11th May 2025</p>
</div>
</div>
{/* Status & Time */}
<div className="flex flex-row justify-center items-center gap-2">
<span className="bg-green-100 text-green-400 px-2 py-1 rounded">Registration Completed</span>
<span className="bg-red-100 text-red-400 px-2 py-1 rounded">In 12 hours</span>
</div>
{/* Join Button */}
<div>
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Join Event
</button>
</div>
</div>
{/* Third Event */}
<div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-2">
{/* Event Details */}
<div className="flex items-center gap-5">
<span className="text-yellow-500 text-2xl">⭐</span>
<div>
  <h3 className="text-lg font-semibold">Brisbane Fest</h3>
  <p className="text-gray-500">14th May 2025</p>
</div>
</div>
{/* Status & Time */}
<div className="flex flex-row justify-center items-center gap-2">
<span className="bg-red-100 text-red-400 px-2 py-1 rounded">Registration Incomplete</span>
<span className="bg-green-100 text-green-400 px-2 py-1 rounded">In 4 days</span>
</div>
{/* Join Button */}
<div>
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Join Event
</button>
</div>
</div>
{/* Fourth Event */}
<div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-2">
{/* Event Details */}
<div className="flex items-center gap-5">
<span className="text-yellow-500 text-2xl">⭐</span>
<div>
  <h3 className="text-lg font-semibold">Birdwatching</h3>
  <p className="text-gray-500">16th May 2025</p>
</div>
</div>
{/* Status & Time */}
<div className="flex flex-row justify-center items-center gap-2">
<span className="bg-red-100 text-red-400 px-2 py-1 rounded">Registration Incomplete</span>
<span className="bg-green-100 text-green-400 px-2 py-1 rounded">In 6 days</span>
</div>
{/* Join Button */}
<div>
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Join Event
</button>
</div>
</div>
</div>
);
};
export default UserDashboard;