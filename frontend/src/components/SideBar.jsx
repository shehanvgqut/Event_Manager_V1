import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Sidebar = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen transition-width duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Toggle button */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl focus:outline-none"
          >
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="flex flex-col p-4 space-y-4">
          <Link to="/" className="text-lg font-bold hover:text-gray-300">
            {isOpen ? 'Event Manager' : '🎉'}  {/* Updated app name */}
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">
                {isOpen ? 'Dashboard' : '📊'}
              </Link>
              <Link to="/profile" className="hover:text-gray-300">
                {isOpen ? 'Profile' : '👤'}
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-gray-300">
                  {isOpen ? 'Admin Panel' : '🛠️'}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-left hover:text-red-400 focus:outline-none"
              >
                {isOpen ? 'Logout' : '🚪'}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                {isOpen ? 'Login' : '🔑'}
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                {isOpen ? 'Register' : '📝'}
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Sidebar;