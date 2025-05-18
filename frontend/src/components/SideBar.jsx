import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaLayerGroup,
  FaUserCircle,
  FaTachometerAlt,
  FaTools,
  FaCalendarAlt,
  FaListAlt,
  FaChartLine,
  FaUserPlus,
  FaSignOutAlt,
  FaSignInAlt
} from 'react-icons/fa';
import Navbar from './NavBar';
import Footer from './Footer';

const Sidebar = ({ children }) => {
  const { user, logout, loading } = useAuth();
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
          <Link to="/user_dashboard" className="flex items-center space-x-2 hover:text-gray-300">
            <FaHome />
            {isOpen && <span className="text-lg font-bold">Event Manager</span>}
          </Link>

          
          {loading ? (
            <div>Loading...</div> // Prevent redirect until we know the user state
          ) : user ? (
            <>
              
              <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300">
                <FaUserCircle />
                {isOpen && <span>Profile</span>}
              </Link>

              {user.role === 'user' && (
                <>
                  {/* <Link
                    to="/user_dashboard"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaTachometerAlt />
                    {isOpen && <span>User Dashboard</span>}
                  </Link> */}
                  <Link
                    to="/user_event_list"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaCalendarAlt />
                    {isOpen && <span>User events</span>}
                  </Link>
                  <Link 
                    to="/groups" 
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaLayerGroup />
                    {isOpen && <span>Groups</span>}
                  </Link>
                </>
              )}
              

              {user.role === 'admin' && (
                <>
                  {/* <Link to="/admin" className="flex items-center space-x-2 hover:text-gray-300">
                    <FaTools />
                    {isOpen && <span>Admin Panel</span>}
                  </Link> */}
                  {/* <Link
                    to="/admin_event_page"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaCalendarAlt />
                    {isOpen && <span>Events</span>}
                  </Link> */}
                  <Link
                    to="/admin_event_list"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaListAlt />
                    {isOpen && <span>Events List</span>}
                  </Link>
                  <Link
                    to="/admin_dashboard"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaChartLine />
                    {isOpen && <span>Admin Dashboard</span>}
                  </Link>
                  <Link 
                    to="/groups-admin" 
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaLayerGroup />
                    {isOpen && <span>Admin Groups</span>}
                  </Link>

                  <Link
                    to="/admin_user_list"
                    className="flex items-center space-x-2 hover:text-gray-300"
                  >
                    <FaUserPlus />
                    {isOpen && <span>User Creation</span>}
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-left hover:text-red-400 focus:outline-none"
              >
                <FaSignOutAlt />
                {isOpen && <span>Logout</span>}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300">
                <FaSignInAlt />
                {isOpen && <span>Login</span>}
              </Link>
              <Link to="/register" className="flex items-center space-x-2 hover:text-gray-300">
                <FaUserPlus />
                {isOpen && <span>Register</span>}
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">{children}</div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
