pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Coinit.sol";

contract TestCoinit {

  Coinit owner;

  function beforeAll() {
    owner = new Coinit();
    createAccount(owner);
  }

  function testInitialBalanceUsingDeployedContract() {
    int expected = 0;
    Assert.equal(owner.isOwner(), true, "Expected the owner to be admin");
  }

  function testCreateAccount() {
    Coinit coinit = Coinit(DeployedAddresses.Coinit());

    Assert.equal(coinit.accountExists(), false, "Account should not exist yet.");

    Assert.equal(createAccount(coinit), true, "Create account should return true");

    Assert.equal(coinit.accountExists(), true, "Account should exist.");

    Assert.equal(coinit.getValidated(tx.origin), false, "The account should not be validated.");
  }

  function testThatCreatorIsAdmin() {
    Coinit coinit = new Coinit();
    Assert.equal(coinit.isOwner(), true, "Expected the owner to be admin");
  }

  function testValidateAccount() {
    owner.validateAccount(address(owner));
    Assert.equal(owner.getValidated(address(owner)), true, "Expected the account to be validated.");
  }

  function testCreateAndSendCoin() {
    createAccount(owner);
    Assert.equal(owner.isOwner(), true, "Expected the owner to be owner");
    int balance = owner.getBalance(owner);
    owner.createAndSendCoin(address(owner), 100);
    Assert.equal(owner.getBalance(address(owner)), balance + 100, "The balance is not as expected.");
  }

  function testGiveMoneyToAllAccounts() {
    int balance = owner.getBalance(owner);
    owner.createAndGiveMoneyToAllValidatedAccounts(100);
    Assert.equal(owner.getBalance(owner), balance + 100, "The balance is not as expected.");
  }

  function testCombinedFunctionality() {
    owner.validateAccount(address(owner));
    Assert.equal(owner.getValidated(address(owner)), true, "Expected the account to be validated.");

    int balance = owner.getBalance(owner);
    owner.validateAccount(address(owner));
    owner.createAndGiveMoneyToAllValidatedAccounts(100);
    Assert.equal(owner.getBalance(owner), balance + 100, "The balance is not as expected.");
    Assert.equal(owner.getNumberOfValidatedAccounts(), 1, "The number of validated accounts is not as expected.");
  }

  function testPayOutNextSalary() {
    int balance = owner.getBalance(owner);
    Assert.equal(owner.createAndSendCoin(owner, 100), true, "Owner was not able to create and send money");
    Assert.equal(owner.getBalance(owner), balance + 100, "The balance for owner is not as expected.");
    Assert.equal(owner.markForPayOutOnNextSalary(owner, 100), true, "Was not able to mark money for being payed out as salary.");
    Assert.equal(owner.getBalance(owner), balance + 100, "The balance is not as expected.");
    owner.payOut();
    Assert.equal(owner.getBalance(owner), balance, "The balance is not as expected.");
    owner.payOut();
    Assert.equal(owner.getBalance(owner), balance, "The balance is not as expected.");
  }



  function createAccount(Coinit coinit) returns (bool) {
    return coinit.createAccount("name", "mail");
  }

}