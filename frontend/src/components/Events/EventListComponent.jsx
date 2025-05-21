// Composite component
const EventListComponent = ({ children }) => (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">All Events</h2>
      {children}
    </div>
  );
  
  export default EventListComponent;
  