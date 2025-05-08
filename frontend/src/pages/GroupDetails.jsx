import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/groups')
      .then(res => res.json())
      .then(data => {
        const found = data.find(g => g._id === id);
        setGroup(found);
      })
      .catch(err => console.error('Failed to fetch group details', err));
  }, [id]);

  if (!group) {
    return <div className="text-center mt-10 text-gray-600">Loading group details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{group.name}</h2>

        <p className="mb-4 text-gray-700">
          <span role="img" aria-label="group">👥</span> <strong>Welcome to {group.name}!</strong> This group is based in {group.location} and focuses on shared interests.
        </p>

        <p className="text-gray-700 mb-4">
          {group.description}
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-6">
          <h3 className="font-bold mb-2 text-gray-800">Group Details:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Visibility: {group.visibility}</li>
            <li>Total members: {group.memberCount}</li>
            <li>Location: {group.location}</li>
          </ul>
        </div>

        <div className="text-gray-800 space-y-2 mb-4">
          <p><span role="img" aria-label="calendar">📅</span> <strong>Date Created:</strong> {/* optional date logic */} </p>
          <p><span role="img" aria-label="pin">📍</span> <strong>Region:</strong> {group.location}</p>
          <p><span role="img" aria-label="lock">🔒</span> <strong>Visibility:</strong> {group.visibility}</p>
          <p><span role="img" aria-label="people">👥</span> <strong>Members:</strong> {group.memberCount}</p>
        </div>

        <button
          onClick={() => navigate('/groups')}
          className="text-blue-600 underline mt-4"
        >
          Back to Groups
        </button>
      </div>
    </div>
  );
};

export default GroupDetails;
