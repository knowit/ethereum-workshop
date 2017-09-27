# Coinit

The excercises are about making a token that works like a private currency where someone has admin priviliges to create tokens. It should be possible to create new users, and an administrator can create new tokens and send to its users. Every user has a balance of tokens, and they are allowed to send the tokens between each other. Imagine that this is a token for a company where the employees have an internal economic system.

The tasks should be done in order, from top to bottom, since some might depend on the previous step. Every task has at least one test that should complete without errors with a correct implementation.


#### 1. Admin
Since we want to have an admin with more privileges we will do this in the constructor, and set the admin to the address that deploys the contract Please initialize the 'admin' member in the constructor, and implement 'isOwner' to return true or false based on if the caller equals the admin address or not.

#### 2. Create account
Implement 'createAccount' where a new 'Account' will be created. An account struct should have the following members: 
- 'addr' - ethereum address to the user
- 'balance' - the balance as an integer
- 'validated' - a boolean that describes wether the user have been validated by an admin
- 'exist' - a boolean that describes wether the account exist
- 'name' - name of the account holder
- 'email' - email address of the account holder

When a new user is created, it should have validated=false, since this is done later by an administrator.

Implement 'accountExists' so that it returns true or false based on if the contract holds an account with 'exist=true' for the address of the sender.

#### 3. Validate account
Implement 'validateAccount'. The user for the input address should be marked as validated. This function can only be called by an admin, so make sure that you restrict the access to this function. The administrator is the creator of the contract. You should extend the modifier "isAdmin" to check this, and then it won't go into the function of 'validateAccount' if the modifier fails.

Also implement 'getValidated' which returns if the account for the input address is validated.

#### 4. Create and send coin
Implement 'createAndSendCoin'. This function creates money out of thin air and adds it to the balance for the address that was part of the input. This function is also restricted to the administrator.

Also implement 'getBalance(address _addr)' to return the balance of '_addr'.

#### 5. Send coins
Implement 'sendCoin'. This function is for everybody to send tokens to each other. It should not be possible to send more tokens than the user has.

####6. Send money to all validated accounts
Implement 'createAndGiveMoneyToAllValidatedAccounts'. This function should add an amount to all the user accounts that are validated. How will you structure the data in order to accomplish this?

Hint: you will need an extra data structure, since you can't loop over a mapping. Add users to this data structure when they are validated.

#### 7. Number of validated accounts
Implement 'getNumberOfValidatedAccounts()'. The function should return an uint with the number of validated accounts.

#### 8. Payout
Imagine that this is a mini salary system for a company, and that the accounts has a balance that they can choose to pay out on the next salary. Implement 'markForPayOutOnNextSalary' and 'payOutOnNextSalary'. The first one is for a administrator to perform on any account, and the second is for an account to perform on itself. Both should mark an amount for being payed out the next time the company pays out salary. 

Again you will have to store this information in a data structure you can loop over easily.

In this exercise you should also modify some of the frontend code to make it work. This will be done on line 189 in app.js.

Then implement 'payout'. Here you will loop over the users that have marked an amount for payout, and you should remove this amount from their balance. Imagine now that the users will get this money payed out in a currency like NOK, but you don't have to worry about how they will do that.. :) There is also some frontend code to complete for this, so please take a look at line 202 in app.js.

Are all the tests green now? :)

#### Bonus
Compile the contract in the Remix browser and deploy it in Mist on the Rinkeby testnet. Go together with the person next to you, and watch each other contracts and make transactions on them. We will demonstrate how to do this.

## Useful links
- Solidity documentation http://solidity.readthedocs.io/en/develop/index.html
- Solidity online editor https://ethereum.github.io/browser-solidity/
- Truffle framework documentation http://truffleframework.com/docs/
