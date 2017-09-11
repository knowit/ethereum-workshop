pragma solidity ^0.4.13;

contract Coinit {
    
    struct Account {

    }

    address public admin;

    function Coinit() {
        Genesis(msg.sender);

    }

    function isOwner() constant returns(bool) {

    }
    
    function createAccount(string _name, string _email) returns(bool success) {

    }

    function accountExists() constant returns(bool) {

    }

    function validateAccount(address _accountAddr) isAdmin returns(bool) {

    }

    function getValidated(address _addr) constant returns(bool) {
    
    }

    function getBalance(address _addr) constant returns(int) {
    
    }

    function createAndSendCoin(address _receiver, int _amount) isAdmin returns(bool) {

    }

    function sendCoin(address _receiver, int _amount) returns(bool sufficient) {

    }

    function createAndGiveMoneyToAllValidatedAccounts(int _amount) isAdmin {
        
    }

    function getNumberOfValidatedAccounts() constant returns(uint) {
        
    }

    function markForPayOutOnNextSalary(address _addr, int _amount) isAdmin returns(bool sufficient) {
        
    }

    function payOutOnNextSalary(int _amount) returns(bool sufficient) {

    }
    
    function payOut() isAdmin {

    }
    
    function kill() isAdmin {
    
    }

    modifier isAdmin() {
        _;
    }

    event Transfer(address indexed _from, address indexed _to, int _value);

    event Validate(address indexed _account, bool _value);
    
    event Genesis(address indexed _admin);


}