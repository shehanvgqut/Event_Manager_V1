import { Link } from "react-router-dom";

const BrisbaneFest = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Brisbane Fest</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700 mt-2">
          🎡🎶 <strong>Get ready to immerse yourself in Brisbane’s largest cultural celebration!</strong> This annual festival lights up the city with vibrant performances, street food, art exhibitions, and interactive workshops, highlighting the creative pulse of Brisbane.
        </p>

        <h3 className="text-lg font-semibold mt-4">Event Highlights:</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Live music stages</strong> featuring local bands and international performers</li>
          <li>A <strong>street art showcase</strong>, with live mural painting and exhibitions</li>
          <li><strong>Food stalls</strong> serving a mix of international cuisine and local delicacies</li>
          <li><strong>Dance performances</strong> from hip-hop crews, traditional cultural dances, and contemporary acts</li>
          <li><strong>Fireworks display</strong> closing the festival with a breathtaking spectacle</li>
        </ul>
        <p className="mt-4 text-lg font-bold">📅 Date: 14th May 2025</p>
        <p className="text-lg font-bold">⏰ Time: 12:00 PM - 10:00 PM</p>
        <p className="text-lg font-bold">📍 Venue: Brisbane City Centre</p>
        <p className="text-lg font-bold">🎟️ Entry Fee: 40$ per person</p>
      </div>

      <Link to="/user_dashboard" className="mt-4 text-blue-500 underline">Back to Dashboard</Link>
    </div>
  );
};

export default BrisbaneFest;