const Web3 = require("web3");
const path = require("path");
const HDWalletProvider = require("./node_modules/@truffle/hdwallet-provider");
require("./node_modules/dotenv").config();

const MNEMONIC = process.env.REACT_APP_MNEMONIC;

module.exports = {
  contracts_build_directory: path.join(__dirname, "./ethereum/build"),
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ganache: {
      provider: () => new HDWalletProvider(MNEMONIC, `HTTP://127.0.0.1:7545`),
      network_id: 5777,
      gas: 6721975,
    },
  },
  compilers: {
    solc: {
      version: "0.8.6",
    },
  },
};
