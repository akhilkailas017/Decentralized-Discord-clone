// src/components/Sidebar.jsx
import React, { useState } from "react";

const Sidebar = ({ friends, allUsers, onSelectFriend, addFriend, onLogout }) => {
  const [friendAddress, setFriendAddress] = useState("");
  const [friendName, setFriendName] = useState("");

  const handleAddFriend = () => {
    if (!friendAddress || !friendName) return;
    addFriend(friendAddress, friendName);
    setFriendAddress("");
    setFriendName("");
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 ">
      <h2 className="text-2xl mb-4">Friends</h2>
      <ul className="overflow-y-auto">
        {friends.map((friend, index) => (
          <li key={index} className="mb-2 cursor-pointer" onClick={() => onSelectFriend(friend)}>
            {friend.name}
          </li>
        ))}
      </ul>

      <h3 className="text-xl mt-4">Add Friend</h3>
      <input
        type="text"
        placeholder="Friend Address"
        value={friendAddress}
        onChange={(e) => setFriendAddress(e.target.value)}
        className="w-full mt-2 p-2 text-white bg-black"
      />
      <input
        type="text"
        placeholder="Friend Name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        className="w-full mt-2 p-2 text-white bg-black"
      />
      <button
        onClick={handleAddFriend}
        className="bg-blue-500 text-white w-full mt-2 p-2 rounded"
      >
        Add Friend
      </button>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="bg-red-500 text-white w-full mt-6 p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
