import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id || user?.id;

  

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

  const isCreator = group.creatorId === userId;

  console.log('🧪 userId:', userId);
    console.log('🧪 group.creatorId:', group.creatorId);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        {/* 📸 Group Image Placeholder */}
        <div className="mb-6">
          <div className="w-full aspect-video bg-gray-300 rounded-md"></div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">{group.name}</h2>

        <p className="text-gray-700 mb-4">{group.description}</p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded">
          <h3 className="font-bold mb-2 text-gray-800">Group Details:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Visibility: {group.visibility}</li>
            <li>Total members: {group.memberCount}</li>
            <li>Location: {group.location}</li>
          </ul>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/groups')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded"
          >
            Back to Groups
          </button>

          {isCreator && (
            <button
              onClick={() => navigate(`/groups/${group._id}/edit`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded"
            >
              Edit Group
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
