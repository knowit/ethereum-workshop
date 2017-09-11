var Coinit = artifacts.require("./Coinit.sol");

contract('Coinit', function(accounts) {
  it("should put 0 Coinit in the first account", function() {
    return Coinit.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "0 wasn't in the first account");
    });
  });

  
  it("should validate account correctly", function() {

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var coinit;
    return Coinit.deployed().then(function(instance) {
      coinit = instance;
      return coinit.isOwner.call();
    }).then(function(isAdmin) {
        //Lager account-two
        return coinit.createAccount.sendTransaction("name", "mail", {from: account_two});
      }).then(function() {
        //validerer account-two fra admin
        return coinit.validateAccount.sendTransaction(account_two, {from: account_one});
      }).then(function() {
        //validate account-two fra account-two
        return coinit.getValidated.call(account_two, {from: account_two});
      }).then(function(validated) {
        assert.equal(validated, true, "The account should now be validated");          
      });
    });

  it("should send coin correctly", function() {

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];
    var account_three = accounts[2];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;
    var account_three_ending_balance;

    var amount = 10;

    var coinit;
    return Coinit.deployed().then(function(instance) {
      coinit = instance;
      return coinit.createAndSendCoin.sendTransaction(account_two, 10, {from: account_one});
      }).then(function() {
        return coinit.getBalance.call(account_two, {from: account_two});
      }).then(function(balance) {
          account_two_ending_balance = balance.valueOf();
          assert.equal(account_two_ending_balance, 10, "Amount wasn't correctly created and sent to the receiver");
      }).then(function() {
        return coinit.sendCoin.sendTransaction(account_three, 5, {from: account_two});
      }).then(function() {
        return coinit.getBalance.call(account_two, {from: account_two});
      }).then(function(acc2balance) {
        account_two_ending_balance = acc2balance.valueOf();
        return coinit.getBalance.call(account_three, {from: account_three});
      }).then(function(acc3balance) {
        account_three_ending_balance = acc3balance.valueOf();                       
        assert.equal(account_two_ending_balance, 5, "Amount on account two wasnt 5");
        assert.equal(account_three_ending_balance, 5, "Amount on account three wasnt 5");        
      });
    });
});
