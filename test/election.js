
var Election = artifacts.require("./Election.sol");
    // Create an abstraction to interact with our contract

contract("Election", function(accounts) { // Inject all the accounts existing in our testing environment

    // 1. Contract is initialized with the correct number of candidates
    it("initializes with two candidates", function() { // "it" is from MOCHA testing framework
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount(); // this accessing of public variable is asynchronous
        }).then(function(count) {
            assert.equal(count, 2); // "assert" is from the CHAI framework 
        });
    });

    var electionInstance; // want this to be accessible universally in this test
                          // so that this can be accessed to throughout this promise chain

    it("it initializes the candidates with the correct value", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Candidate 1", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct vote count");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct vote count");
        });
    });

});    
