// src/App.jsx
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import CreateAccount from "./components/CreateAccount";
import ChatAppABI from "./scdata/ChatApp.json"; // Import ABI of your contract

const contractAddress = "0xae1E5A2ae0796f861C08cD6C774aC0d136C8500E"; // Replace with your deployed contract address

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null); // Ensure this state updates correctly

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const signer = await provider.getSigner();
        setSigner(signer);

        const chatContract = new ethers.Contract(
          contractAddress,
          ChatAppABI.abi,
          signer
        );
        setContract(chatContract);

        const accounts = await provider.send("eth_requestAccounts", []);
        setCurrentAccount(accounts[0]);

        // Check if the user already has an account
        const userExists = await checkIfUserExists(chatContract, accounts[0]);
        setHasAccount(userExists);

        if (userExists) {
          const name = await chatContract.getUsername(accounts[0]);
          setUserName(name);
          loadFriends(chatContract);
          loadAllUsers(chatContract);
        }
      } else {
        console.error("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const checkIfUserExists = async (contract, account) => {
    if (contract) {
      try {
        return await contract.checkUserExists(account);
      } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
      }
    }
    return false;
  };

  const loadFriends = async (contract) => {
    if (contract) {
      try {
        const friends = await contract.getMyFriendList();
        setFriends(friends);
      } catch (error) {
        console.error("Error loading friends:", error);
      }
    }
  };

  const loadAllUsers = async (contract) => {
    if (contract) {
      try {
        const users = await contract.getAllAppUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    }
  };

  const handleCreateAccount = async (username) => {
    if (!contract) return;
    try {
      const tx = await contract.createAccount(username);
      await tx.wait();
      alert("Account created successfully!");
      setHasAccount(true);
      setUserName(username);
      loadAllUsers(contract);
      loadFriends(contract);
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Failed to create account. Please try again.");
    }
  };

  const handleAddFriend = async (friendAddress, friendName) => {
    if (!contract) return;
    try {
      const tx = await contract.addFriend(friendAddress, friendName);
      await tx.wait();
      alert("Friend added successfully!");
      loadFriends(contract);
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to add friend. Make sure the user exists and is not already your friend.");
    }
  };

  const handleSendMessage = async (friendAddress, message) => {
    if (!contract) return;
    try {
      const tx = await contract.sendMessage(friendAddress, message);
      await tx.wait();
      alert("Message sent!");
      loadMessages(friendAddress);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  const loadMessages = async (friendAddress) => {
    if (!contract) return;
    try {
      const messages = await contract.readMessage(friendAddress);
      setMessages(messages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    loadMessages(friend.pubkey); // Load messages for the selected friend
  };

  const handleLogout = () => {
    setCurrentAccount("");
    setProvider(null);
    setSigner(null);
    setContract(null);
    setHasAccount(false);
    setFriends([]);
    setAllUsers([]);
    setMessages([]);
    setSelectedFriend(null);
    setUserName("");
  };

  return (
    <div className="flex h-screen">
      {!currentAccount ? (
        <div className="flex justify-center items-center w-full h-full">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => window.ethereum.request({ method: "eth_requestAccounts" })}
          >
            Connect MetaMask
          </button>
        </div>
      ) : (
        <>
          {hasAccount ? (
            <>
              <Sidebar
                friends={friends}
                allUsers={allUsers}
                onSelectFriend={handleSelectFriend} // Updated to use the new handleSelectFriend function
                addFriend={handleAddFriend}
                onLogout={handleLogout}
              />
              <div className="flex-grow">
                <div className="bg-gray-100 p-4 shadow-md">
                  <h1 className="text-xl">Logged in as: {userName} ({currentAccount})</h1>
                </div>
                {selectedFriend ? (
                  <Chat
                    friend={selectedFriend}
                    messages={messages}
                    sendMessage={handleSendMessage}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <h2 className="text-2xl text-gray-700">Select a friend to start chatting</h2>
                  </div>
                )}
              </div>
            </>
          ) : (
            <CreateAccount onCreateAccount={handleCreateAccount} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
