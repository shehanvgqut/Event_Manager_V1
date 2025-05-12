import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

import EventComponent from "../components/Events/EventComponent";
import EventList from "../components/Events/EventListComponent";
import SingleEvent from "../components/Events/SingleEventComponent";
import WithStatusAndExitButton from "../decorators/WithStatusAndExitButton";
import { Link } from 'react-router-dom';

const UserEventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error("Error fetching events:", err.message);
        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Status code:", err.response.status);
        } else {
          console.error("No response received");
        }
      })      .finally(() => setLoading(false));
  }, []);
  
  const handleLeave = (eventTitle) => {
    alert(`Leaving event: ${eventTitle}`);
  };

  const DecoratedEvent = WithStatusAndExitButton(SingleEvent);

  if (loading) return <div className="p-6">Loading events...</div>;

  return (
    <EventList>
      {events.map((event) => (
        <EventComponent
          key={event._id}
          render={() => (
            <Link
              to={`/event_detail/${event._id}`}
              className="block hover:shadow-md transition duration-200"
            >
              <DecoratedEvent event={event} onLeave={handleLeave} />
            </Link>
          )}
        />
      ))}
    </EventList>
  );
};

export default UserEventsList;
