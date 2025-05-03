import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';  // ✅ Import Auth

const Navbar = () => {
  const { user } = useAuth();  // ✅ Get logged-in user info

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      
      {/* Left: App title */}
      <div>
        <h1 className="text-xl font-semibold">Event Manager</h1>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center">
        <div className="relative mr-5 cursor-pointer text-gray-700">
          <FaBell className="text-2xl" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </div>
        {user ? (
          <div className="flex items-center">
            <img
              src={user.avatarUrl || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex flex-col">
              <span className="font-medium">{user.name || "No Name"}</span>
              <span className="text-sm text-gray-500">{user.location || "No Location"}</span>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Not logged in</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
