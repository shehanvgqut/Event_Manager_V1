const WithStatusAndExitButton = (Component) => ({ event, onJoin, onLeave }) => {
  const statusStyles = {
    upcoming: "bg-green-100 text-green-500",
    completed: "bg-gray-100 text-gray-500",
    cancelled: "bg-red-100 text-red-500",
  };

  const statusStyle = statusStyles[event.status] || "bg-yellow-100 text-yellow-600";

  const isJoined = event._joinStatus === "joined";

  const actions = (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
      {/* Status or Joined badge */}
      {isJoined ? (
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-600">
          You joined this event
        </span>
      ) : (
        <span className={`px-2 py-1 rounded capitalize ${statusStyle}`}>
          {event.status}
        </span>
      )}

      {/* Join or Exit button */}
      <div>
        {isJoined ? (
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              onLeave(event);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Exit Event
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              onJoin(event);
            }}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Join Event
          </button>
        )}
      </div>
    </div>
  );

  return <Component event={{ ...event, _actions: actions }} />;
};

export default WithStatusAndExitButton;
