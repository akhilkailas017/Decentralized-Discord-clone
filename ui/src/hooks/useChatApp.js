import { useState, useEffect } from "react";
import { getContractInstance } from "../utils/chatApp";

const useChatApp = () => {
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const init = async () => {
      const { contract, signer } = await getContractInstance();
      if (!contract) return;
      setContract(contract);
      setUserAddress(await signer.getAddress());
      fetchFriends(contract);
      fetchAllUsers(contract);
    };

    init();
  }, []);

  const fetchFriends = async (contract) => {
    const friendsList = await contract.getMyFriendList();
    setFriends(friendsList);
  };

  const fetchAllUsers = async (contract) => {
    const users = await contract.getAllAppUsers();
    setAllUsers(users);
  };

  const fetchMessages = async (friendAddress) => {
    const msgs = await contract.readMessage(friendAddress);
    setMessages(msgs);
  };

  const sendMessage = async (friendAddress, message) => {
    await contract.sendMessage(friendAddress, message);
    fetchMessages(friendAddress);
  };

  return {
    userAddress,
    friends,
    allUsers,
    messages,
    fetchMessages,
    sendMessage,
  };
};

export default useChatApp;
