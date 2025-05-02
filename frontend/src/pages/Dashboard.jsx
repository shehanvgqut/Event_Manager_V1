import { useState } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";

const mockEvents = [
  { id: 1, name: "Tech Meetup", date: "May 10, 2025" },
  { id: 2, name: "Design Workshop", date: "May 15, 2025" },
  { id: 3, name: "Startup Pitch Night", date: "May 20, 2025" }
];

function Dashboard() {
  const [events, setEvents] = useState(mockEvents);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Upcoming Events</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="events-list">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;