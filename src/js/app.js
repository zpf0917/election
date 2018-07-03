// App is an object with several functions defined
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  // initialise app: initialize web3
  init: function() {
    return App.initWeb3();
  },

  // The def of initialize web3
      // Connects client-side application to our local blockchain
  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
          // MetaMask turns chrome web browser into a blockchain browser
          // So that it connects to Ethereum network

      // When we login to MetaMask, it provides us with a web3 provider
      // We then set the app's web3 provider to our given web 3 provider
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  // Once initialized web3, initialize our contract
      // Loads up our contract into our front end application so that we can interact with it
  initContract: function() {
    // load a Json file of our Election artifect
        // the getJSON works for this "Election.json" file because we're using the browser sync package
        // "bs-config.json" that comes with the truffle box
        // which is configured to read JSON files out the build contracts directory
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
          // The truffle contract is the one that we can interact with inside the actual app
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);
      return App.render();
    });
  },

  // Once contract is initialized, we'll render out our content on the web page
      // layout all the content on the page
      // Display the account that we have connected with the blockchain with
      // List out all the candidates in the election
  render: function() {
    var electionInstance;
    // Keep track of the loading template and content template
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
        // "getCoinbase" provides us with the account
    web3.eth.getCoinbase(function(err, account) { // account injected into the function
      if (err === null) {
        // Account in our app set to this account
        App.account = account;
        // Display the account in html
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
        // Get a copy of the deployed contract, assign it to electionInstance declared before
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty(); 

      var candidatesSelect = $("#candidatesSelect");
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          var candidateOption = "<option value='" + id +"' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account); // read the current account
    }).then(function(hasVoted) {
      // If has voted hide the form
      if(hasVoted) {
        $('form').hide();
      }  

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  // castVote in index.html
  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, {from: App.account});
    }).then(function(result){
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};




// app initialised whenever the window loads
$(function() {
  $(window).load(function() {
    App.init();
  });
});