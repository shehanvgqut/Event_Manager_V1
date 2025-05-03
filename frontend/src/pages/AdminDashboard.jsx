// pages/AdminPage.jsx
const AdminPage = () => {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Manage users, monitor events, and oversee the entire system.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">User Management</h2>
            <p className="text-gray-500">Add, remove, or update user roles and access.</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Event Oversight</h2>
            <p className="text-gray-500">View all events, approve or reject submissions.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminPage;
  