import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState(new Set());
  const [notification, setNotification] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [sortOption, setSortOption] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/api/groups${sortOption ? `?sort=${sortOption}` : ''}`)
      .then(res => res.json())
      .then(data => {
        setGroups(data);
        const joined = data
          .filter(group => group.members?.includes(userId))
          .map(group => group._id);
        setJoinedGroups(new Set(joined));
      })
      .catch(err => console.error('Failed to fetch groups', err));
  }, [sortOption]);

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

  const myGroups = groups.filter(group => joinedGroups.has(group._id));
  const otherGroups = groups.filter(group => !joinedGroups.has(group._id));

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
          <h2 className="text-2xl font-semibold text-gray-800">Group Management</h2>
          <button
            onClick={handleCreateGroup}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            Create Group
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="">Sort by...</option>
            <option value="members">Most Members</option>
            <option value="recent">Recently Created</option>
          </select>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">My Groups</h3>
        <div className="space-y-4 mb-8">
          {myGroups.length === 0 ? (
            <p className="text-gray-500">You haven't joined any groups yet.</p>
          ) : (
            myGroups.map(group => (
              <GroupCard
                key={group._id}
                group={group}
                joined
                onLeave={handleLeaveGroup}
                onView={() => navigate(`/group/${group._id}`)}
              />
            ))
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">All Groups</h3>
        <div className="space-y-4">
          {otherGroups.map(group => (
            <GroupCard
              key={group._id}
              group={group}
              onJoin={handleJoinGroup}
              onView={() => navigate(`/group/${group._id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm('Are you sure you want to delete this group?')) return;
  
    try {
      const res = await fetch(`http://localhost:5001/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
  
      const data = await res.json();
      if (res.ok) {
        triggerBanner('Group deleted successfully!');
        setGroups(groups.filter(g => g._id !== groupId));
        joinedGroups.delete(groupId);
      } else {
        alert(data.message || 'Failed to delete group');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error');
    }
  };
};

const GroupCard = ({ group, joined, onJoin, onLeave, onView }) => {
  return (
    <div className="bg-white shadow-md rounded-lg px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-32 aspect-video bg-gray-300 rounded-md flex-shrink-0"></div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
          <p className="text-sm text-gray-600">{group.location}</p>
          <p className="text-sm text-gray-700 mt-1">{group.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            {group.memberCount} members ~ {group.visibility}
          </p>
        </div>
      </div>
      <div className="flex gap-3 ml-4">
        {joined ? (
          <button
            onClick={() => onLeave(group._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Leave Group
          </button>
        ) : (
          <button
            onClick={() => onJoin(group._id)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Join Group
          </button>
        )}
        <button
          onClick={onView}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default GroupList;
