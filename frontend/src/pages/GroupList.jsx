import React, { useEffect, useState } from 'react';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState(new Set());
  const userId = '12345678'; // Temporary hardcoded user

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

  const handleJoinGroup = async (groupId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/groups/${groupId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Joined group successfully!');
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
        alert('Left group successfully!');
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
    alert('Redirecting to create group form...');
  };

  return (
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
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.location}</p>
              <p className="text-sm text-gray-700 mt-1">{group.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                {group.memberCount} members ~ {group.visibility}
              </p>
            </div>

            <div className="flex gap-3 mt-4 sm:mt-0">
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
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
