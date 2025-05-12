// Decorator HOC for adding status styling and action
const WithStatusAndExitButton = (Component) => ({ event, onLeave }) => {
    const statusStyles = {
      upcoming: "bg-green-100 text-green-500",
      completed: "bg-gray-100 text-gray-500",
      cancelled: "bg-red-100 text-red-500",
    };
  
    const statusStyle = statusStyles[event.status] || "bg-yellow-100 text-yellow-600";
  
    const actions = (
      <div className="flex items-center gap-4">
        <span className={`px-2 py-1 rounded capitalize ${statusStyle}`}>
          {event.status}
        </span>
        <button
          onClick={() => onLeave(event.title)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Exit Event
        </button>
      </div>
    );
  
    return <Component event={{ ...event, _actions: actions }} />;
  };
  
  export default WithStatusAndExitButton;
  