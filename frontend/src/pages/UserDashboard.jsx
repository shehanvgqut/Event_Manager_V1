import React, { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser?.id) setUserId(storedUser.id);
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      console.warn('User ID is null, skipping fetch');
      return;
    }

    const fetchEvents = async () => {
      try {
        console.log('🔄 Fetching events...');
        const joinedRes = await fetch(`/api/events/joinedevents?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('✅ joinedRes received');

        const allRes = await fetch(`/api/events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('✅ allRes received');

        const joined = await joinedRes.json();
        const allEvents = await allRes.json();

        const joinedIds = joined.map(j => j.event);

        const enriched = allEvents.map(event => ({
          ...event,
          isRegistered: joinedIds.includes(event._id),
          startDate: new Date(event.sessions?.[0]?.startDate),
        }));

        setEvents(enriched);
      } catch (err) {
        console.error('❌ Error fetching dashboard events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userId]);

  const now = new Date();
  const upcoming = events.filter(e => e.startDate > now);
  const registered = events.filter(e => e.isRegistered);
  const past = events.filter(e => e.startDate <= now && e.isRegistered);

  const renderEvents = (list) => (
    <div className="space-y-3">
      {list.map(e => (
        <div key={e._id} className="p-4 border rounded-lg shadow hover:shadow-md transition bg-gray-50">
          <h3 className="text-lg font-semibold text-blue-700">{e.title}</h3>
          <p className="text-sm text-gray-600">
            📅 {e.startDate.toLocaleDateString()} &nbsp;|&nbsp;
            🕒 {e.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          {e.location && (
            <p className="text-sm text-gray-500 mt-1">📍 {e.location}</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Event Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage your upcoming events, view event history, and stay updated with notifications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          {loading ? (
            <p>Loading...</p>
          ) : upcoming.length === 0 ? (
            <p className="text-gray-500">No upcoming events.</p>
          ) : (
            renderEvents(upcoming)
          )}
        </div>

        {/* My Registrations */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">My Registrations</h2>
          {loading ? (
            <p>Loading...</p>
          ) : registered.length === 0 ? (
            <p className="text-gray-500">You haven't registered for any events.</p>
          ) : (
            renderEvents(registered)
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p className="text-gray-500 mb-2">Stay updated with event changes or announcements.</p>
          <button className="mt-2 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            View Notifications
          </button>
        </div>
      </div>

      {/* Past Events */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
        <div className="bg-white p-4 shadow rounded text-gray-700">
          {loading ? (
            <p>Loading...</p>
          ) : past.length === 0 ? (
            <p className="text-gray-500">You haven't attended any events yet.</p>
          ) : (
            renderEvents(past)
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
