// src/components/Chat.jsx
import React, { useState } from "react";

const Chat = ({ friend, messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessage(friend.pubkey, newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-white">{friend.name} - {friend.pubkey}</h2>
      <div className="flex-grow overflow-y-auto bg-black p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-2 text-white`}>
            <div className="text-sm text-white">{msg.sender === friend.pubkey ? friend.name : "You"}</div>
            <div>{msg.msg}</div>
            {/* Convert BigInt to a number using `.toNumber()` or `.toString()` */}
            <div className="text-xs text-white">{new Date(Number(msg.timestamp) * 1000).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow rounded px-4 py-2 text-white bg-black"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
