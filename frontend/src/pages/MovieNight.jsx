import { Link } from "react-router-dom";

const MovieNight = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Movie Night</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700 mt-2">
          🍿🎬 <strong>Sit back, relax, and enjoy an unforgettable evening of cinema under the stars!</strong> This outdoor movie screening brings together friends and film lovers for a cozy night filled with blockbuster hits, cult classics, and exciting indie films.
        </p>

        <h3 className="text-lg font-semibold mt-4">Event Highlights:</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Curated movie lineup</strong> featuring a mix of action, sci-fi, drama, and comedy</li>
          <li>A <strong>food truck village</strong> with gourmet popcorn, nachos, and classic movie snacks</li>
          <li>Cozy bean bags and blankets available for a comfortable viewing experience</li>
          <li>Pre-show trivia and interactive discussions on cinema history</li>
          <li>Live voting for the audience’s favorite movie scene</li>
        </ul>
      </div>

      <Link to="/user_dashboard" className="mt-4 text-blue-500 underline">Back to Dashboard</Link>
    </div>
  );
};

export default MovieNight;