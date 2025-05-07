import { Link } from "react-router-dom";

const Birdwatching = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Birdwatching</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700 mt-2">
          🦜🌿 <strong>Escape into nature and discover the hidden beauty of Brisbane’s wildlife!</strong> This guided birdwatching experience is designed for enthusiasts of all levels, offering a chance to spot rare and colorful bird species in their natural habitat.
        </p>

        <h3 className="text-lg font-semibold mt-4">Event Highlights:</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Guided walk</strong> through scenic nature reserves and wildlife hotspots</li>
          <li><strong>Expert birdwatchers</strong> sharing insights on bird calls, behaviors, and habitats</li>
          <li>Binocular rentals for enhanced viewing opportunities</li>
          <li>Learn how to identify different species and contribute to conservation efforts</li>
          <li><strong>Photography tips</strong> for capturing stunning bird images</li>
        </ul>
        <p className="mt-4 text-lg font-bold">📅 Date: 16th May 2025</p>
        <p className="text-lg font-bold">⏰ Time: 6:00 AM - 10:00 AM</p>
        <p className="text-lg font-bold">📍 Venue: Brisbane Botanic Gardens</p>
        <p className="text-lg font-bold">🎟️ Entry Fee: Free</p>
      </div>

      <Link to="/user_dashboard" className="mt-4 text-blue-500 underline">Back to Dashboard</Link>
    </div>
  );
};

export default Birdwatching;