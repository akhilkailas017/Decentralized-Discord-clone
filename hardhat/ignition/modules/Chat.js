const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("ChatModule", (m) =>{  //change cert module to game module [random name]
    const chat = m.contract("ChatApp") //change cert to gameT since its the contract name
    return {chat}; 
})