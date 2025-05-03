import { createContext, useContext, useEffect, useRef, useState } from 'react';
import InactivityService from '../services/InactivityService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Stable singleton: store in a ref
  const inactivityServiceRef = useRef(null);

  // No new InactivityService here

  useEffect(() => {
    // Initialize the service ONCE
    if (!inactivityServiceRef.current) {
      inactivityServiceRef.current = new InactivityService(10 * 60 * 1000, () => {
        logout();
        alert('You have been logged out due to inactivity.');
      });
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      inactivityServiceRef.current.start();  // Start inactivity timer if user exists
    }
    setLoading(false);

    return () => {
      inactivityServiceRef.current.stop();  // Clean up on unmount
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    inactivityServiceRef.current.start();  // Use the ref
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    inactivityServiceRef.current.stop();  // Use the ref
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
