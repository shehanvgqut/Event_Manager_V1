import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Navbar from './NavBar';  
import Footer from './Footer';  

const Sidebar = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 flex flex-col ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Toggle button */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-xl focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="flex-1 flex flex-col p-4 space-y-4">
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-300">
            <span role="img" aria-label="tasks">🗂️</span>
            {isOpen && <span className="text-lg font-bold">Event Manager</span>}
          </Link>

          {user ? (
            <>
              <Link to="/tasks" className="flex items-center space-x-2 hover:text-gray-300">
                <span role="img" aria-label="groups">📋</span>
                {isOpen && <span>Groups</span>}
              </Link>
              <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300">
                <span role="img" aria-label="profile">👤</span>
                {isOpen && <span>Profile</span>}
              </Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin" className="flex items-center space-x-2 hover:text-gray-300">
                    <span role="img" aria-label="admin">🛠️</span>
                    {isOpen && <span>Admin Panel</span>}
                  </Link>
                  <Link to="/admin_event_page" className="flex items-center space-x-2 hover:text-gray-300">
                    <span role="img" aria-label="events">📅</span>
                    {isOpen && <span>Events</span>}
                  </Link>
                </>
              )}
              {user.role === 'user' && (
                <Link to="/user_event_page" className="flex items-center space-x-2 hover:text-gray-300">
                  <span role="img" aria-label="events">📅</span>
                  {isOpen && <span>Events</span>}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-left hover:text-red-400 focus:outline-none"
              >
                <span role="img" aria-label="logout">🚪</span>
                {isOpen && <span>Logout</span>}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300">
                <span role="img" aria-label="login">🔑</span>
                {isOpen && <span>Login</span>}
              </Link>
              <Link to="/register" className="flex items-center space-x-2 hover:text-gray-300">
                <span role="img" aria-label="register">📝</span>
                {isOpen && <span>Register</span>}
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Navbar at the top */}
        <Navbar />

        {/* ✅ Main content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          {children}
        </div>

        {/* ✅ Footer at the bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
