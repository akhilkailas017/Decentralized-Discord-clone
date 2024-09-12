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
    <div className="flex flex-col h-full p-4">
      <h2 className="text-xl font-bold mb-4">Chat with {friend.name}</h2>
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-2 rounded-lg ${msg.sender === friend.pubkey ? "bg-gray-200" : "bg-blue-200"} text-black`}>
            <div className="text-sm text-gray-600">{msg.sender === friend.pubkey ? friend.name : "You"}</div>
            <div>{msg.msg}</div>
            {/* Convert BigInt to a number using `.toNumber()` or `.toString()` */}
            <div className="text-xs text-gray-500">{new Date(Number(msg.timestamp) * 1000).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow border rounded px-4 py-2"
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
