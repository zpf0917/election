pragma solidity ^0.4.23;

contract Election {
    string public candidate; // when declaring a variable public, 
                             // it is automatically assigned a getter function

    // Constructor -> something that is going to run 
    //                whenever we initialize our contract upon migration 

    // Constructor has the same name as the Contract (ETH knows this)
    function Election () public { // public is necessary for Constructor
        candidate = "Candidate 1"; // variable name without _ before it is a state variable,
                                   //   data that belongs to our entire contract
    }
}

// To see if this works, we need to create a migration 
// to deploy our smart contract to a local blockchain 