import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { FaUsers, FaPlus } from 'react-icons/fa';

const AdminAllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaUsers className="text-blue-600 mr-2 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
        </div>
        <button
          onClick={() => navigate('/admin_create_user')}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" />
          Add User
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Contact</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6 capitalize">{user.role}</td>
                  <td className="py-3 px-6">{user.location}</td>
                  <td className="py-3 px-6">{user.address}</td>
                  <td className="py-3 px-6">{user.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllUsersPage;
