import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const CreateGroup = () => {
    const { id } = useParams();


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [topics, setTopics] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [notification, setNotification] = useState('');
  const [showBanner, setShowBanner] = useState(false);

    // ✅ If editing, fetch existing group details
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5001/api/groups`)
        .then(res => res.json())
        .then(data => {
          const existing = data.find(g => g._id === id);
          if (existing) {
            setName(existing.name);
            setDescription(existing.description);
            setLocation(existing.location);
            setTopics(existing.topics?.join(', '));
            setIsPrivate(existing.isPrivate);
          }
        })
        .catch(err => console.error('Failed to load group for editing', err));
    }
  }, [id]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id || user?.id;
  const navigate = useNavigate();

  const triggerBanner = (message) => {
    setNotification(message);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
  };

  const handleCreateGroup = async () => {
    if (!name || !location) {
      triggerBanner('Group name and location are required!');
      return;
    }

    const visibilityValue = isPrivate ? 'private' : 'public';


    const newGroup = {
      name,
      description,
      location,
      topics: topics.split(',').map(t => t.trim()),
      isPrivate,
      visibility: visibilityValue,
      creatorId: userId,
      members: [userId],
    };

    console.log('🧪 Submitting new group:', newGroup);


    try {
        const res = await fetch(
            id ? `http://localhost:5001/api/groups/${id}` : 'http://localhost:5001/api/groups',
            {
              method: id ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newGroup),
            }
          );

      const data = await res.json();
      if (res.ok) {
        triggerBanner(id ? 'Group edited successfully!' : 'Group created successfully!');
        setTimeout(() => navigate('/groups-admin'), 2000);
      } else {
        alert(data.message || 'Failed to create group');
      }
    } catch (err) {
      console.error('Create error:', err);
      alert('Server error');
    }
  };

  return (
    <>
      {showBanner && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 text-center px-6 py-3 font-semibold text-white rounded-lg transition-opacity duration-700 ease-in-out ${
            notification.includes("edited")
            ? "bg-yellow-500"
            : notification.includes("created")
            ? "bg-green-500"
            : "bg-red-500"
        }`}>
            {notification}
        </div>
        )}

      <div className="min-h-screen bg-gray-100 px-4 py-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800">
        {id ? 'Edit Group' : 'Create Group'}
        </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Brisbane, AU"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Topics</label>
            <input
              type="text"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="Football, Hiking, Reading"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Brisbane Social Football Group"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us what your group is about..."
              rows={4}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Set group as private</label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          <div className="text-right">
            <button
              onClick={handleCreateGroup}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
