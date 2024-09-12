require ("@nomicfoundation/hardhat-toolbox")
require("dotenv").config();
const infuraurl=process.env.infuraurl;
const privatekey=process.env.metamaskprivatekey;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  defaultNetwork : "infurasep",
  networks: {
    localhost:  {
      url: "http://127.0.0.1:8545/"

    },
    infurasep : {
      //infura url example : https://sepolia.infura.io/v3/infura-api
      url: infuraurl,   
      accounts: [privatekey]
    }
  },
  solidity: "0.8.24",
}