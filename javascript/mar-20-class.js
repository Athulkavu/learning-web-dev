// class player{
//     constructor(name,runs){
//         this.name=name;
//         this.runs=runs;

//     }
//     details(){
//         return `${this.name} has batted in${this.runs.length} matches`;
//     }
//     totalRuns(){
//         return this.runs.reduce((acc,run)=>acc+run,0);
//     }  
  
// }
// const p1=new player("sanju",[97,89,89]);
// console.log(p1.details());
// console.log(p1.totalRuns());


// 
/*
Problem Statement: Bank Account Constructor Function

Create a Constructor Function called BankAccount that allows creating and managing individual bank accounts.

Each BankAccount object should have the following properties:
 • accountNumber (string)
 • accountHolderName (string)
 • balance (number)

And the following methods:
 • deposit(amount) – Adds the given amount to the account balance. Amount must be positive.
 • withdraw(amount) – Deducts the amount from the account balance. Ensure sufficient funds before withdrawal.
 • getBalance() – Returns the current account balance.
 • displayAccountInfo() – Prints the account number, holder’s name, and balance.

Requirements:
 1. Use a constructor function, not classes.
 2. Demonstrate the functionality by creating at least two bank accounts and performing a series of deposits, withdrawals, and balance checks.

Example Output:

Account created: 123456 | John Doe | Balance: $1000
Depositing $500...
New Balance: $1500
Withdrawing $200...
New Balance: $1300

*/
// DRY - don't repeat yourself 

function BankAccount(aNumber, aName, aBalance){
    // this = {}; 
    this.accountNumber = aNumber; 
    this.accountHolderName = aName; 
    this.balance = aBalance; 
    // return this; 
}
BankAccount.prototype.getBalance = function(){
    return `${this.accountHolderName} has balance of INR ${this.balance}`; 
}

BankAccount.prototype.displayAccountInfo = function(){
    return `${this.accountNumber} - ${this.accountHolderName} - INR ${this.balance}`;
}

BankAccount.prototype.deposit = function(amount){
   if(amount < 0) {
    return 'amount should be a positive number'
   } else {
    this.balance += amount; 
    // return this.balance; 
   }
}

BankAccount.prototype.withdraw = function(amount) {
    if(amount > this.balance) {
        return 'insufficient funds'; 
    } else {
        this.balance -= amount; 
        return this.balance; 
    }
}

const c1 = new BankAccount('SBI123','jeevan', 1000);
console.log(c1); 
console.log(c1.getBalance()); 
console.log(c1.displayAccountInfo()); 
console.log(c1.deposit(100)); 
console.log(c1.getBalance()); 
console.log(c1.withdraw(2000)); 
console.log(c1.withdraw(200));


//  same code using class instead of constructor

class BankAccount2 {
    constructor(aNumber, aName, aBalance) {
        this.accountNumber = aNumber;
        this.accountHolderName = aName;
        this.balance = aBalance;
    }

    
    getBalance() {
        return `${this.accountHolderName} has balance of INR ${this.balance}`;
    }

   
    displayAccountInfo() {
        return `${this.accountNumber} - ${this.accountHolderName} - INR ${this.balance}`;
    }

    
    deposit(amount) {
        if (amount <= 0) {
            return 'Amount should be a positive number';
        }
        this.balance += amount;
        return `Deposited: ${amount}. New Balance: ${this.balance}`;
    }

   
    withdraw(amount) {
        if (amount > this.balance) {
            return 'Insufficient funds';
        }
        this.balance -= amount;
        return `Withdrew: ${amount}. New Balance: ${this.balance}`;
    }
}



const c3 = new BankAccount2('SBI123', 'Jeevan', 1000);
const c2 = new BankAccount2('HDFC456', 'Anjali', 5000);

console.log("--- Account 1 Actions ---");
console.log(c3.displayAccountInfo()); 
console.log(c3.deposit(500)); 
console.log(c3.withdraw(200)); 
console.log(c3.getBalance());

console.log("\n--- Account 2 Actions ---");
console.log(c2.displayAccountInfo());
console.log(c2.withdraw(6000));
console.log(c2.withdraw(1000));