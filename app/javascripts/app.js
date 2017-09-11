// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import coinit_artifacts from '../../build/contracts/Coinit.json'

// Coinit is our usable abstraction, which we'll use through the code below.
var Coinit = contract(coinit_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

var populateDropdown = function(select, accounts) {
    for(var i = 0; i < accounts.length; i ++) {
      var option = document.createElement("option");
      option.textContent = accounts[i];
      option.value = accounts[i];
      select.appendChild(option);
    }
}

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the Coinit abstraction for Use.
    Coinit.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      var select =  document.getElementById("drop");
      var select2 = document.getElementById("sendDropdown");
      var select3 = document.getElementById("createdropdown");
      var select4 = document.getElementById("admindropdown");
      var select5 = document.getElementById("fromdropdown");
      var select6 = document.getElementById("todropdown");
      var select7 = document.getElementById("employee");
      var select8 = document.getElementById("payoutonnext");

      populateDropdown(select, accounts); 
      populateDropdown(select2, accounts);
      populateDropdown(select3, accounts); 
      populateDropdown(select4, accounts);
      populateDropdown(select5, accounts); 
      populateDropdown(select6, accounts); 
      populateDropdown(select7, accounts); 
      populateDropdown(select8, accounts); 

 


    });
  },

  createAccount: function() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var self = this;

    var createAddress = document.getElementById("createdropdown");
    var address = createAddress.options[createAddress.selectedIndex].value;

    var coin;
    Coinit.deployed().then(function(instance) {
      coin = instance;
      return coin.createAccount.sendTransaction(name, email, {from: address, gas: 1550000});
    }).then(function() {
      console.log(address);
    }).catch(function(e) {
      console.log(e);
    });

  },

  sendCoin: function() {
    var self = this;

    var amount = document.getElementById("amount2").value;

    var fromA = document.getElementById("fromdropdown");
    var fromAddress = fromA.options[fromA.selectedIndex].value;

    var toA = document.getElementById("todropdown");
    var toAddress = toA.options[toA.selectedIndex].value;

    var coin;
    Coinit.deployed().then(function(instance) {
      coin = instance;
      return coin.sendCoin.sendTransaction(toAddress, amount, {from: fromAddress});
    }).catch(function(e) {
      console.log(e);
    });
  },

  validateEmployee: function() {
    var self = this;

    var createAddress = document.getElementById("employee");
    var address = createAddress.options[createAddress.selectedIndex].value;

    var coin;
    Coinit.deployed().then(function(instance) {
      coin = instance;
      return coin.validateAccount.sendTransaction(address,{from: account});
    }).catch(function(e) {
      console.log(e);
    });
  },

  isAccountAdmin: function() {
    var self = this;
    var createAddress = document.getElementById("admindropdown");
    var address = createAddress.options[createAddress.selectedIndex].value;
    var coin;
    Coinit.deployed().then(function(instance) {
      coin = instance;
      return coin.isOwner.call({from: address});
    }).then(function(admin) {
      console.log(admin)
      document.getElementById("isadmin").innerHTML = admin.valueOf();
    }).catch(function(e) {
      console.log(e);
    });
  },

  createAndGiveMoneyToAllEmployees: function() {
    var self = this;

    var coin;
    Coinit.deployed().then(function(instance) {
      coin = instance;
      return coin.createAndGiveMoneyToAllValidatedAccounts.sendTransaction(100, {from: account});
    }).then(function() {
      console.log(account)
    }).catch(function(e) {
      console.log(e);
    });
  },

  createAndSendCoin: function() {
    var self = this;

    var amount = document.getElementById("amount").value;

    var dropAddress = document.getElementById("sendDropdown");
    var address = dropAddress.options[dropAddress.selectedIndex].value;

    var coin;
    Coinit.deployed().then(function(instance) {
      coin = instance;
      return coin.createAndSendCoin.sendTransaction(address, amount, {from: account});
    }).catch(function(e) {
      console.log(e);
    });
  },

  payOutOnNextSalary: function() {
    var self = this;

    var amount = document.getElementById("amount3").value;

    var dropAddress = document.getElementById("payoutonnext");
    var address = dropAddress.options[dropAddress.selectedIndex].value;

    var coin;
    Coinit.deployed().then(function(instance) {
      coin = instance;
      //Hvordan skal vi gjore payOutOnNextSalary?
      return /*Skriv din kode her*/;
    }).catch(function(e) {
      console.log(e);
    });
  },

  payOut: function() {
    var self = this;
    var coin;

    Coinit.deployed().then(function(instance) {
      coin = instance;
      //Hvordan skal vi gjore payOut?
      return /*Skriv din kode her*/;
    }).catch(function(e) {
      console.log(e);
    });
  },

  getCoin: function() {
    var self = this;
    var amount = parseInt(document.getElementById("balance2").value);
    var coin;
    var dropAddress = document.getElementById("drop");
    var address = dropAddress.options[dropAddress.selectedIndex].value;

    Coinit.deployed().then(function(instance) {
      coin = instance;
      return coin.getBalance.call(address, {from: address});
    }).then(function(balance) {
      document.getElementById("balance2").innerHTML = balance.valueOf();
      return coin.accountExists.call({from: address});
   }).then(function(name) {
     document.getElementById("name1").innerHTML = name.valueOf();
     console.log(name.valueOf());
     console.log(address);
    }).catch(function(e) {
      console.log(e);
    });

  }

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
