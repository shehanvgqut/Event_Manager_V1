const EventLocation = ({ date, location }) => (
    <div className="text-gray-700 mb-2">
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {location}</p>
    </div>
  );
  export default EventLocation;
  