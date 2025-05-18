import { useState } from 'react';
import axiosInstance from '../../axiosConfig'; // adjust path as needed
import EventTitleComponent from './EventTitleComponent';
import EventLocationComponent from './EventLocationComponent';
import EventDescriptionComponent from './EventDescriptionComponent';

const EventDetailComponent = ({ event, currentUserId }) => {
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(event.attendees?.includes(currentUserId));

  const handleJoinEvent = async () => {
    setJoining(true);
    const storedUser = JSON.parse(localStorage.getItem('user'));
   
    console.log("userId being sent:", storedUser.id);

    try {
      await axiosInstance.post(`/api/events/${event._id}/join`, {
        userId: storedUser.id,
      });
      setJoined(true);
    } catch (err) {
      console.error('Failed to join event:', err);
      alert('Error joining event.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <EventTitleComponent title={event.title} />
        {event._actions && <div className="flex-shrink-0">{event._actions}</div>}
      </div>

      <EventLocationComponent
        date={event.sessions?.[0]?.startDate}
        location={event.location}
      />

      <EventDescriptionComponent description={event.description} />

      {!joined ? (
        <button
          onClick={handleJoinEvent}
          disabled={joining}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {joining ? 'Joining...' : 'Join Event'}
        </button>
      ) : (
        <div className="text-green-600 font-semibold">You have joined this event.</div>
      )}
    </div>
  );
};

export default EventDetailComponent;
