import Web3 from "web3";

let web3;

// Check if we are in the browser and MetaMask is running
if (typeof window !== "undefined" && window.web3 !== "undefined") {
  //if not connected
  async () => {
    await window.web3.currentProvider.enable();
  };
  web3 = new Web3(window.web3.currentProvider);
} else {
  //We are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
  web3 = new Web3(provider);
}

export default web3;
