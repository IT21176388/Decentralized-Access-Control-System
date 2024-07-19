import web3 from "./web3";
import Record from "./build/Record.json";

const instance = new web3.eth.Contract(
  JSON.parse(Record.abi),
  "0xCbFc7Be5006f334b77f9c8aE20D3784f679A53Fc" //Deployed Contract Code //Everytime contract code is changed and compiled, need to update this
);

export default instance;
