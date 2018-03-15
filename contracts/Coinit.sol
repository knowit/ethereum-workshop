pragma solidity ^0.4.13;

contract Coinit {

    /*
        A struct representing an account.
    */
    struct Account {
        address addr;
        bool validated;
        bool exist;
        int balance;
        string name;
        string email;
    }

    /*
        A struct to be used for the task about Payout.
        The amount field represent the amount to be removed from the Account struct for that address when Payout is called.
    */
    struct PayoutAccount {
        int amount;
        address addr;
    }

    // Should be set to the address of the creator of the contract.
    address admin;

    // A hash map that contains all accounts. The key is the Ethereum address of that account, and the value is the account object.
    mapping(address => Account) accounts;

    // A dynamic array holding the addresses of the validated accounts to make it easy to loop over them. Use '.push(<address>)' to add an element.
    address[] validatedAccounts;

    // A dynamic array that contains PayoutAccount-objects.
    PayoutAccount[] payoutAccounts;

    // Constructor of the contract. Called only on deploy.
    function Coinit() {
        // Add code to set admin as the contract creator. 'msg.sender' gives you the address of the caller.
        admin = msg.sender;
        Genesis(msg.sender);
    }

    // Should return true if the sender is admin
    function isOwner() constant returns(bool) {
        return admin == msg.sender;
    }

    // Should add an account to the accounts mapping
    function createAccount(string _name, string _email) returns(bool) {
        // Hint: access account with accounts[msg.sender] = Account({var1: x, var2: y, ...});
        accounts[msg.sender] = Account({addr: msg.sender, exist: true, validated: false, name: _name, email: _email, balance: 0});
        return true;
    }

    // Return true if the account exists in the contract (match on the exist member of Account).
    function accountExists() constant returns(bool) {
        return accounts[msg.sender].exist;
    }

    // Mark the account for the input address as validated.
    function validateAccount(address _accountAddr) isAdmin returns(bool) {
        if (!accounts[_accountAddr].validated) {
            accounts[_accountAddr].validated = true;
            validatedAccounts.push(_accountAddr);
            return true;
        }
        return false;
    }

    // Return true if the account is marked as validated.
    function getValidated(address _addr) constant returns(bool) {
        return accounts[_addr].validated;
    }

    // Return the balance of the account.
    function getBalance(address _addr) constant returns(int) {
        return accounts[_addr].balance;
    }

    // Add the incoming amount to the account balance of the receiver.
    function createAndSendCoin(address _receiver, int _amount) isAdmin returns(bool) {
        accounts[_receiver].balance += _amount;
        return true;
    }

    // Send tokens to receiver from the callers account. Check that the account has enough money and that amount is a positive integer.
    function sendCoin(address _receiver, int _amount) returns(bool) {
        require(_amount > 0 && accounts[msg.sender].balance >= _amount);
        accounts[msg.sender].balance -= _amount;
        accounts[_receiver].balance += _amount;
        return true;
    }

    // Loop over the validatedAccounts and send money to all.
    function createAndGiveMoneyToAllValidatedAccounts(int _amount) isAdmin {
        for (uint index = 0; index < validatedAccounts.length; index++) {
            accounts[validatedAccounts[index]].balance += _amount;
        }
    }

    // Return the number of validated accounts.
    function getNumberOfValidatedAccounts() constant returns(uint) {
        return validatedAccounts.length;
    }

    // Mark money for payout for the incoming address by adding it to the payoutAccounts list
    function markForPayOutOnNextSalary(address _addr, int _amount) isAdmin returns(bool) {
        require(_amount > 0);
        payoutAccounts.push(PayoutAccount({amount: _amount, addr: _addr}));
        return true;
    }

    // Mark money for payout for the caller address by adding it to the payoutAccounts list
    function payOutOnNextSalary(int _amount) returns(bool) {
        require(_amount > 0);
        payoutAccounts.push(PayoutAccount({amount: _amount, addr: msg.sender}));
    }

    // Payout removes the tokens from the account balance in 'accounts'. Think of it as the user recieves money in another application outside the Ethereum blockchain.
    function payOut() isAdmin {
        // Loop over payoutAccounts and remove the balance from the accounts.
        for (uint index = 0; index < payoutAccounts.length; index++) {
            accounts[payoutAccounts[index].addr].balance -= payoutAccounts[index].amount;
        }
        // At the end you should empty the payoutAccounts list. This can be done with 'delete payoutAccounts'
        delete payoutAccounts;
    }

    // Destroys the contract
    function kill() isAdmin {
        selfdestruct(admin);
    }

    // Checks that the sender is admin. Modifiers are used in signatures of other functions as a help check before entering the function.
    modifier isAdmin() {
        require(msg.sender == admin); // Checking that the sender is admin
        _; // Returns the function where the modifier was called and continues into the function
    }


    /*
        Events are used to log changes to the blockchain. Since writing to the blockchain takes seconds or minutes,
        it's nice to be able to log the events so that an application can listen to those and react before the data is actually written in a block.
        Events are not needed for this workshop, but it can help you debug since you will see them when running tests.
    */

    event Transfer(address indexed _from, address indexed _to, int _value);

    event Validate(address indexed _account, bool _value);
    
    event Genesis(address indexed _admin);

    event LogAddress(address indexed _addr);

    event LogInt(int _number);


}