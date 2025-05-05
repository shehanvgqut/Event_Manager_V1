import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleJoin = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setEvents(prev => prev.map(event => 
          event._id === eventId 
            ? { ...event, participants: [...event.participants, user._id] } 
            : event
        ));
      }
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const handleLeave = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}/leave`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setEvents(prev => prev.map(event => 
          event._id === eventId 
            ? { ...event, participants: event.participants.filter(id => id !== user._id) } 
            : event
        ));
      }
    } catch (error) {
      console.error('Error leaving event:', error);
    }
  };

  const handlePayment = async (eventId) => {
    console.log('Initiate payment for event:', eventId);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Available Events</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <div className="text-sm text-gray-500 mb-2">
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Location: {event.location}</p>
                  <p>Participants: {event.participants?.length || 0}</p>
                </div>
                <div className="space-y-2">
                  {event.isJoined ? (
                    <>
                      <button
                        onClick={() => handleLeave(event._id)}
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                      >
                        Leave Event
                      </button>
                      {!event.paid && (
                        <button
                          onClick={() => handlePayment(event._id)}
                          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        >
                          Complete Payment
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleJoin(event._id)}
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                      Join Event
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default UserDashboard;