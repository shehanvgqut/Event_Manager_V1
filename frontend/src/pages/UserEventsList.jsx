import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

import EventComponent from "../components/Events/EventComponent";
import EventList from "../components/Events/EventListComponent";
import SingleEvent from "../components/Events/SingleEventComponent";
import WithStatusAndExitButton from "../decorators/WithStatusAndExitButton";
import { Link } from 'react-router-dom';

const UserEventsList = () => {
  const [events, setEvents] = useState([]);
  const [joinedEventIds, setJoinedEventIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = storedUser?.id;
  console.log("userId being sent:", storedUser.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, joinedRes] = await Promise.all([
          axiosInstance.get("/api/events"),
          axiosInstance.get(`/api/events/joinedevents?userId=${currentUserId}`)
        ]);

        const joinedIds = new Set(joinedRes.data.map((item) => item.event));
        setJoinedEventIds(joinedIds);
        setEvents(eventsRes.data);
      } catch (err) {
        console.error("Error fetching events or joined status:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  const handleLeave = async (event) => {
    try {
      await axiosInstance.delete(`/api/events/${event._id}/leave`, {
        data: { userId: currentUserId }
      });
  
      setJoinedEventIds(prev => {
        const updated = new Set(prev);
        updated.delete(event._id);
        return updated;
      });
  
      alert(`You have left the event: ${event.title}`);
    } catch (err) {
      console.error('Leave failed:', err.message);
      alert('Error leaving event.');
    }
  };
  
  const handleJoin = async (event) => {
    try {
      await axiosInstance.post(`/api/events/${event._id}/join`, {
        userId: currentUserId,
      });
  
      // Update local joinedEventIds set
      setJoinedEventIds(prev => new Set(prev).add(event._id));
    } catch (err) {
      console.error('Join failed:', err.message);
      alert('Error joining event.');
    }
  };
  
  const DecoratedEvent = WithStatusAndExitButton(SingleEvent);

  if (loading) return <div className="p-6">Loading events...</div>;

  return (
    <EventList>
      {events.map((event) => {
        const isJoined = joinedEventIds.has(event._id);
        return (
          <EventComponent
            key={event._id}
            render={() => (
              <div
                  onClick={() => window.location.href = `/event_detail/${event._id}`}
                  className="block hover:shadow-md transition duration-200 cursor-pointer"
                >
                <DecoratedEvent
                  event={{ ...event, _joinStatus: isJoined ? "joined" : null }}
                  onLeave={handleLeave}
                  onJoin={handleJoin}
                />
              </div>
            )}
          />
        );
      })}
    </EventList>
  );
};

export default UserEventsList;
