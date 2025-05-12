import EventTitleComponent from './EventTitleComponent';
import EventLocationComponent from './EventLocationComponent';
import EventDescriptionComponent from './EventDescriptionComponent';

const EventDetailComponent = ({ event }) => {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <div className="flex justify-between items-start">
        <EventTitleComponent title={event.title} />
        {/* Injected actions from decorator */}
        {event._actions && <div>{event._actions}</div>}
      </div>
      <EventLocationComponent date={event.sessions?.[0]?.startDate} location={event.location} />
      <EventDescriptionComponent description={event.description} />
    </div>
  );
};

export default EventDetailComponent;
