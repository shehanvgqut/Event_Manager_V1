import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import defaultEvent from '../assets/event.jpg';

const AdminEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

 const fetchEvents = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.token;

      if (!token) {
        alert('Unauthorized. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get('/api/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert(error.response?.data?.msg || 'Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };


    const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this event?')) return;

      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.token;

      if (!token) {
        alert('Unauthorized. Please log in.');
        return;
      }

      try {
        await axiosInstance.delete(`/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(events.filter((event) => event._id !== id));
        alert('Event deleted successfully.');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert(error.response?.data?.msg || 'Failed to delete event.');
      }
    };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event List (Admin)</h1>
        <button
          onClick={() => navigate('/admin_event')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create New Event
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={event.imageUrl || defaultEvent}
                      alt={event.title}
                      className="w-24 h-16 object-cover rounded"
                    />                    
                  </td>
                  <td className="px-4 py-2">{event.title}</td>
                  <td className="px-4 py-2">
                    {event.sessions && event.sessions.length > 0
                      ? new Date(event.sessions[0].startDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2">{event.location}</td>
                  <td className="px-4 py-2 capitalize">{event.status}</td>
                  <td className="px-4 py-2">
                      <button
                      onClick={() => navigate(`/admin_event/${event._id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEventList;
