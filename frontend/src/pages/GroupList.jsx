import React, { useEffect, useState } from 'react';


const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/groups')  // ⬅️ use full URL to backend
      .then(res => res.json())
      .then(data => {
        console.log('Fetched groups:', data);
        setGroups(data);
      })
      .catch(err => console.error('Failed to fetch groups', err));
  }, []);

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-12">
      
        <h2 className="text-2xl font-semibold mb-6">Groups</h2>
        <div className="grid gap-6">
          {groups.map(group => (
            <div
              key={group.id}
              className="bg-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row p-4 sm:p-6"
            >
              {/* Color Block */}
              <div
                className="w-full sm:w-20 h-20 sm:h-auto rounded-md sm:rounded-lg mb-4 sm:mb-0 sm:mr-6"
                style={{ backgroundColor: group.color || '#ccc' }}
              ></div>

              {/* Group Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">{group.name}</h3>
                  <p className="text-sm text-gray-600 uppercase">{group.location}</p>
                  <p className="text-gray-700 text-sm mt-1">{group.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-500 mt-2">
                  {group.memberCount} members – {group.visibility}
                </p>
              </div>
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default GroupList;