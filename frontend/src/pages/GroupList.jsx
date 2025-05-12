import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState(new Set());
  const [notification, setNotification] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/api/groups')
      .then(res => res.json())
      .then(data => {
        setGroups(data);
        const joined = data
          .filter(group => group.members?.includes(userId))
          .map(group => group._id);
        setJoinedGroups(new Set(joined));
      })
      .catch(err => console.error('Failed to fetch groups', err));
  }, []);

  const triggerBanner = (message) => {
    setNotification(message);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/groups/${groupId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (res.ok) {
        triggerBanner('Joined group successfully!');
        setJoinedGroups(new Set([...joinedGroups, groupId]));
      } else {
        alert(data.message || 'Failed to join');
      }
    } catch (err) {
      console.error('Join error:', err);
      alert('Server error');
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/groups/${groupId}/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (res.ok) {
        triggerBanner('Left group successfully!');
        const updated = new Set(joinedGroups);
        updated.delete(groupId);
        setJoinedGroups(updated);
      } else {
        alert(data.message || 'Failed to leave');
      }
    } catch (err) {
      console.error('Leave error:', err);
      alert('Server error');
    }
  };

  const handleCreateGroup = () => {
    navigate('/groups/create');
  };

  return (
    <>
      {showBanner && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 text-center px-6 py-3 font-semibold text-white rounded-lg transition-opacity duration-700 ease-in-out ${
          notification.includes("Joined") ? "bg-green-500" : "bg-red-500"
        }`}>
          {notification}
        </div>
      )}

      <div className="min-h-screen bg-gray-100 px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Groups</h2>
          <button
            onClick={handleCreateGroup}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            Create Group
          </button>
        </div>

        <div className="space-y-4">
        {groups.map(group => (
            <div
                key={group._id}
                className="bg-white shadow-md rounded-lg px-6 py-4 flex justify-between items-center"
            >
                <div className="flex items-center gap-4">
                {/* 📸 9:16 rectangle placeholder (e.g., 72x128px) */}
                <div className="w-32 aspect-video bg-gray-300 rounded-md flex-shrink-0"></div>

                {/* 📋 Group text content */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.location}</p>
                    <p className="text-sm text-gray-700 mt-1">{group.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                    {group.memberCount} members ~ {group.visibility}
                    </p>
                </div>
                </div>

                {/* 🎯 Action buttons */}
                <div className="flex gap-3 ml-4">
                {joinedGroups.has(group._id) ? (
                    <button
                    onClick={() => handleLeaveGroup(group._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                    Leave Group
                    </button>
                ) : (
                    <button
                    onClick={() => handleJoinGroup(group._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                    Join Group
                    </button>
                )}
                <button
                    onClick={() => navigate(`/group/${group._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    View Details
                </button>
                </div>
            </div>
            ))}

        </div>
      </div>
    </>
  );
};

export default GroupList;
