pragma solidity ^0.4.23;

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// SMOKE TEST
//
// contract Election {
//     string public candidate;        // when declaring a variable public, 
//                                     // it is automatically assigned a getter function
//
//                                      // Constructor -> something that is going to run 
//                                      //                whenever we initialize our contract upon migration 
//
//                                      // Constructor has the same name as the Contract (ETH knows this)
//     function Election () public {       // public is necessary for Constructor
//         candidate = "Candidate 1";      // variable name without _ before it is a state variable,
//                                         //   data that belongs to our entire contract
//     }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
        // To see if this works, we need to create a migration 
        // to deploy our smart contract to a local blockchain 





//////////////////////////////////////////////////////////////////////////////////////////////////////////
// STEP TWO
//
// now want to store multiple condidates in the contract
// Want them to have more than just a name, also to track the number of votes they received
// Want to reference the candidates by ID

contract Election {
    // Model a Candidate 
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }   // We need to instantiate the struct and assign it to a variable before we can stick it into storage
    
    // Store Candidates
    // Fetch Candidate from storage
    mapping(uint => Candidate) public candidates; 
        // mapping in Solidity is like hashing
        //      uint here corresponds to id
        // Declare this mapping public and Solidity will automatically generate a fetch function for us
        // When we add a candidate to this mapping, we are changing the state of this contract

    // Store Candidates Count in storage
    uint public candidatesCount; // Without this we cannot keep track the size of the mapping
                                 // Default to be 0

    function Election () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string _name) private { // _name is a local variable
                                                   // Private as we don't want this accessible
                                                   //   to public interface of our contract
                                                   // This will only be called in Constructor function
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////


// How to model voters
// voters are represented by an address of any account connected to the blockchain

//But first lets do some testing