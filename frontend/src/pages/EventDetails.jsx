import { useParams } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import EventDetailComponent from '../components/Events/EventDetailComponent';
import WithStatusAndExitButton from '../decorators/WithStatusAndExitButton';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error loading event:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLeave = (eventTitle) => {
    alert(`You have left the event: ${eventTitle}`);
  };

  if (loading) return <div className="p-6">Loading event...</div>;
  if (!event) return <div className="p-6">Event not found.</div>;

  const DecoratedEventDetail = WithStatusAndExitButton(EventDetailComponent);

  return (
    <div className="p-6">
      <DecoratedEventDetail event={event} onLeave={handleLeave} />
    </div>
  );
};

export default EventDetails;
