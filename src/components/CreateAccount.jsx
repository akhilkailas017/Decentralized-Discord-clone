import React, { useState } from "react";

const CreateAccount = ({ onCreateAccount }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      alert("Username cannot be empty!");
      return;
    }
    onCreateAccount(username); // Call the passed function from App.jsx
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mb-4"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
