import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
import UnauthorizedPage from './pages/Unauthorized';
import ProtectedRoute from './context/ProtectedRoute';
import AdminEvent from './pages/AdminEvents';
import AdminEventList from './pages/AdminEventsList'; 
import UserEvent from './pages/UserEvents'; 
import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from './pages/UserDashboard';
import AdminCreateUserPage from "./pages/AdminCreateUserPage"
import AdminAllUserPage from "./pages/AdminAllUserPage"

function App() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          {/* Default redirect to /tasks */}
          <Route path="/" element={<Navigate to="/tasks" />} />
          
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_event"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_event/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_event_list"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminEventList />
              </ProtectedRoute>
            }
          />
          {/* Optional: user event page */}
          <Route
            path="/user_event_page"
            element={
              <ProtectedRoute requiredRole="user">
                <UserEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_dahsboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user_dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_create_user"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminCreateUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_user_list"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminAllUserPage />
              </ProtectedRoute>
            }
          />

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
