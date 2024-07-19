const path = require("path"); // For working with file and directory paths
const solc = require("solc"); // For compiling Solidity contracts
const fs = require("fs-extra"); // For working with the file system

// Define the build path
const buildPath = path.resolve(__dirname, "build");
console.log("Deleting build folder...");
fs.removeSync(buildPath);

console.log("Getting contract by path...");
const contractPath = path.resolve(__dirname, "contracts", "Record.sol");
const source = fs.readFileSync(contractPath, "utf8");

console.log("Compiling contract...");
const input = {
  language: "Solidity",
  sources: {
    "Record.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for (let contractName in output.contracts["Record.sol"]) {
  fs.outputJsonSync(
    path.resolve(buildPath, contractName + ".json"),
    output.contracts["Record.sol"][contractName]
  );
}

// const path = require("path"); // For working with file and directory paths
// const solc = require("solc"); // For compiling Solidity contracts
// const fs = require("fs-extra"); // For working with the file system

// // Define the build path
// const buildPath = path.resolve(__dirname, "build");
// console.log("Deleting build folder...");
// fs.removeSync(buildPath);

// console.log("Getting contract by path...");
// const campaignPath = path.resolve(__dirname, "contracts", "Record.sol");
// const source = fs.readFileSync(campaignPath, "utf8");

// console.log("Compiling contract...");
// const output = solc.compile(source, 1).contracts;

// fs.ensureDirSync(buildPath); //recreate build folder

// for (let contract in output) {
//   fs.outputJsonSync(
//     path.resolve(buildPath, contract.replace(":", "") + ".json"),
//     output[contract]
//   );
// }

// const path = require("path");
// const solc = require("solc");
// const fs = require("fs-extra");

// const buildPath = path.resolve(__dirname, "build");
// fs.removeSync(buildPath);

// const contractPath = path.resolve(__dirname, "contracts", "Record.sol");
// const source = fs.readFileSync(contractPath, "utf8");

// const input = {
//   language: "Solidity",
//   sources: {
//     "Record.sol": {
//       content: source,
//     },
//   },
//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["*"],
//       },
//     },
//   },
// };

// const output = JSON.parse(solc.compile(JSON.stringify(input)));

// fs.ensureDirSync(buildPath);

// for (let contractName in output.contracts["Record.sol"]) {
//   fs.outputJsonSync(
//     path.resolve(buildPath, contractName + ".json"),
//     output.contracts["Record.sol"][contractName]
//   );
// }
