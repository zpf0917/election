// need to prepend this file with number 2 (already have one in the same dir)
//     -> So that truffle knows the order to run them

// use the existing one as reference point

// artifacts represent the contract abstraction that is specific to Truffle
// This gives us an Election artifact that represents our smart contract 
// Truffle will expose this and we can interact with it in any case we want to
// E.G. console, test, front-end app
var Election = artifacts.require("./Election.sol");

module.exports = function(deployer) {
  deployer.deploy(Election);
};
