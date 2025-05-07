import { Link } from "react-router-dom";

const CarMeet = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Car Meet</h2>

      <div className="bg-white p-6 rounded-lg shadow">

        <p className="text-gray-700 mt-2">
          🚗💨 <strong>Calling all car enthusiasts!</strong> Whether you're into muscle cars, JDM tuners, or classic restorations, this event is the perfect place to showcase your ride and connect with fellow car lovers. Expect an array of stunning vehicles on display, from sleek sports cars to meticulously tuned machines.
        </p>

        <h3 className="text-lg font-semibold mt-4">Event Highlights:</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Show & Shine competition for the best-looking cars</li>
          <li>Live engine revving contests 🔥</li>
          <li>Vendor booths featuring car accessories, tuning kits, and exclusive merchandise</li>
          <li>Discussions on performance upgrades, aerodynamics, and new automotive tech</li>
          <li>Meet-and-greet opportunities with top car builders and influencers</li>
        </ul>
      </div>

      <Link to="/user_dashboard" className="mt-4 text-blue-500 underline">Back to Dashboard</Link>
    </div>
  );
};

export default CarMeet;