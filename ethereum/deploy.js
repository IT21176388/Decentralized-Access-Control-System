const path = require("path");
const HDWalletProvider = require("../node_modules/@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledRecord = require("./build/Record.json");

const provider = new HDWalletProvider(
  "chuckle impulse shrug barely outdoor album eye custom tip truth pulp trim",
  "HTTP://127.0.0.1:7545"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  // Assuming compiledRecord is loaded correctly and contains the expected JSON artifact structure
  const result = await new web3.eth.Contract(compiledRecord.abi)
    .deploy({ data: compiledRecord.bytecode })
    .send({ gas: "6721975", from: accounts[0] });

  //Display the address of the contract
  console.log("Contract deployed to", result.options.address);

  //Always go to record.js after updating solidity code
};

deploy();
