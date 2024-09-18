import { ethers } from "ethers";
import ChatAppABI from "../scdata/ChatApp.json";

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0xae1E5A2ae0796f861C08cD6C774aC0d136C8500E";

export const getContractInstance = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ChatAppABI.abi, signer);
  return { contract, signer };
};
