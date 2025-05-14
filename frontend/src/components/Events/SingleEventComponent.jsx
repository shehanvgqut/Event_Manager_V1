// Leaf component
const SingleEventComponent = ({ event }) => (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-2">
      <div className="flex items-center gap-5">
        <span className="text-2xl">🎯</span>
        <div>
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-gray-500">
            {event.sessions?.[0]?.startDate
              ? new Date(event.sessions[0].startDate).toDateString()
              : "No start date"}
          </p>
        </div>
      </div>
      {event._actions}
    </div>
  );
  
  export default SingleEventComponent;
  