# 🗨️ **Decentralized Discord Clone** 🌐

### A Next-Gen Decentralized Chat Application
Welcome to **Decentralized Discord Clone**, a cutting-edge web app for decentralized person-to-person chatting. In this app, chats are securely stored on the public blockchain, ensuring transparency, privacy, and ownership of your data.

Users can register with just a username and their MetaMask wallet, adding friends, and chatting in a secure, blockchain-powered environment. Here's everything you need to know to get started with this exciting project!

---

## 🔑 **Core Features**
- **User Registration**: Simple registration with a unique username, stored directly on the blockchain, alongside your MetaMask wallet address.
- **Friend System**: Add friends using their username and wallet address. Your friend list updates in real-time in the sidebar.
- **Decentralized Messaging**: Select a friend from your sidebar and start chatting instantly, with every message stored on the blockchain.
- **Blockchain Backend**: Leveraging Solidity smart contracts for all chat data storage.

---

## 🛠️ **Technologies Used**

| **Tech**            | **Description**                                        |
|---------------------|--------------------------------------------------------|
| Solidity            | Smart contract development for the Ethereum blockchain. |
| Hardhat             | Deployment and testing framework for Solidity.         |
| Vite + React        | Fast frontend development with Vite and React.         |
| Tailwind CSS        | Modern CSS framework for responsive and stylish UI.    |
| MetaMask            | Wallet integration for Ethereum-based transactions.    |

---

## 🚀 **How to Run the Project**

### Follow these simple steps to get the app up and running:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/akhilkailas017/Decentralized-Discord-clone.git
    ```
   
2. **Navigate to the project directory**:
    ```bash
    cd Decentralized-Discord-Clone
    ```

3. **Install dependencies**:
    ```bash
    npm i
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```
   
5. Once the server is running, open the provided URL in your browser to view the application.

> ⚠️ **Prerequisite**: Ensure that you have the MetaMask extension installed and set up in your default browser.

---

## 🔄 **How to Redeploy the Smart Contract**

If you'd like to redeploy the smart contract, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/akhilkailas017/Decentralized-Discord-clone.git
    ```

2. **Navigate to the Hardhat folder**:
    ```bash
    cd Decentralized-Discord-Clone/hardhat
    ```

3. **Create an `.env` file** in the `hardhat` folder with the following structure:
    ```bash
    metamaskprivatekey=""
    infuraurl="https://sepolia.infura.io/v3/infura-api"
    hardhatlocalhost="http://127.0.0.1:8545/"
    ```
    Replace `infura-api` with your Infura API key and `metamaskprivatekey` with your MetaMask private key.

4. **Clean old build data**:
    ```bash
    npx hardhat clean
    ```

5. **Compile the Solidity code**:
    ```bash
    npx hardhat compile
    ```

6. **Deploy the contract**:
    ```bash
    npx hardhat ignition deploy ignition/modules/Chat.js
    ```

7. **Update the Frontend**:
    - Copy the JSON file from `hardhat/artifacts/contracts/ChatApp.sol/ChatApp.json` to `Decentralized-Discord-Clone/src/scdata`.
    - Copy the deployed contract address from `hardhat/ignition/deployments/chain-31337/deployed_addresses.json` and replace the `contractAddress` in `src/App.jsx`.

---

## 🎯 **Project Highlights**

This project combines blockchain security with real-time decentralized messaging, making it a future-proof solution for private, peer-to-peer conversations.

- 💬 **Secure Messaging**: Your chats are forever stored on a public blockchain, ensuring your conversations are immutable and transparent.
- 🔗 **Blockchain Integration**: Powered by Ethereum and stored securely on the blockchain via MetaMask wallet.
- 📲 **Responsive Design**: Built using React and Tailwind CSS for a seamless user experience across all devices.

---

## **Project Demo Video**

[![Decentralized Discord Clone](https://img.youtube.com/vi/_G0vHbk1Uq0/0.jpg)](https://www.youtube.com/watch?v=_G0vHbk1Uq0)

---

## 💻 **Conclusion**

**Decentralized Discord Clone** is a groundbreaking solution for peer-to-peer communication, blending the power of blockchain with real-time messaging. Follow the steps above to explore, modify, and deploy your very own decentralized chat platform!
