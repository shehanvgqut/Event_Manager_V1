import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaHome, FaUserShield, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminCreateUserPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    address: '',
    university: '',
    contactNumber: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axiosInstance.post('/api/users', formData);

      setMessage('User created successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        address: '',
        university: '',
        contactNumber: '',
      });
      navigate('/admin_user_list');  // after success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.message || 'Something went wrong.');
    }
  };

  const handleBack = () => {
    navigate('/admin_user_list');  // 👈 your back path here
  };

  const fields = [
    {
      label: 'Name',
      id: 'name',
      type: 'text',
      placeholder: 'Full Name',
      icon: <FaUser className="text-gray-400" />,
    },
    {
      label: 'Email',
      id: 'email',
      type: 'email',
      placeholder: 'Email Address',
      icon: <FaEnvelope className="text-gray-400" />,
    },
    {
      label: 'Password',
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      icon: <FaLock className="text-gray-400" />,
    },
    {
      label: 'Address',
      id: 'address',
      type: 'text',
      placeholder: 'Address',
      icon: <FaHome className="text-gray-400" />,
    },
    {
      label: 'University',
      id: 'university',
      type: 'text',
      placeholder: 'University',
      icon: <FaMapMarkerAlt className="text-gray-400" />,
    },
    {
      label: 'Contact Number',
      id: 'contactNumber',
      type: 'text',
      placeholder: 'Contact Number',
      icon: <FaPhone className="text-gray-400" />,
    },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Create New User</h1>
      <p className="text-center text-gray-500 mb-6 text-sm">Fill in the details to add a new user to the system.</p>

      {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{message}</div>}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

      {/* 🔙 Back button */}
      <button
        onClick={handleBack}
        type="button"
        className="mb-6 flex items-center gap-2 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition-all font-semibold"
      >
        <FaArrowLeft /> Back to User List
      </button>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="mb-4" key={field.id}>
            <label htmlFor={field.id} className="block mb-1 font-semibold text-gray-700 flex items-center gap-2">
              {field.icon} {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"
              required={['name', 'email', 'password'].includes(field.id)}
            />
          </div>
        ))}

        <div className="mb-6">
          <label htmlFor="role" className="block mb-1 font-semibold text-gray-700 flex items-center gap-2">
            <FaUserShield className="text-gray-400" /> Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-all text-lg font-semibold"
        >
          ➕ Create User
        </button>
      </form>
    </div>
  );
};

export default AdminCreateUserPage;
