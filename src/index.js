class Transaction {
    amount;
    date;
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }
}

class Customer {
    #name;
    #id;
    #transactions;

    constructor(name, id) {
        this.#name = name;
        this.#id = id;
        this.#transactions = []
    }

    getName() {
        return this.#name
    }

    getId() {
        return this.#id;
    }

    getTransactions() {
        const transactions = []
        this.#transactions.map(transaction => { transactions.push(transaction.amount) });
        return transactions;
    }

    getBalance() {
        const total = this.#transactions.reduce((prevValue, currenValue) => prevValue + currenValue.amount, 0);
        return total;
    }

    addTransactions(amount) {
        if (this.getBalance() >= 0) {
            const newTransaction = new Transaction(amount, new Date())
            this.#transactions.push(newTransaction)
            return true;
        } else {
            return false;
        }
    }
}

class Branch {
    name;
    #customers;
    constructor(name) {
        this.name = name;
        this.#customers = []
    }

    getName() {
        return this.name
    }

    getCustomers() {
        return this.#customers;
    }

    addCustomers(customer) {
        if (!this.#customers.includes(customer)) {
            this.#customers.push(customer)
            return true;
        } else {
            return false;
        }
    }

    addCustomerTransaction(customerId, amount) {
        const transactionCustomer = this.#customers.find((customer) => customer.getId() === customerId);
        if (transactionCustomer) {
            return transactionCustomer.addTransactions(amount);
        } else {
            return false;
        }
    }
}

class Bank {
    name;
    branches;
    constructor(name) {
        this.name = name;
        this.branches = []
    }

    addBranch(branch) {
        if (!this.branches.includes(branch)) {
            this.branches.push(branch)
            return true;
        } else {
            return false;
        }
    }

    addCustomer(branch, customer) {
        const branchName = this.branches.find((br) => br.name === branch.name);
        if (branchName) {
            if (!branchName.getCustomers().includes()) {
                branchName.addCustomers(customer)
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    addCustomerTransaction(branch, customerId, amount) {
        const getBranch = this.branches.find((br) => br.name === branch.name)
        if (getBranch) {
            const customer = getBranch.getCustomers().find((cus) => cus.getId() === customerId)
            if (customer) {
                return customer.addTransactions(amount)
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    findBranchByName(branchName) {
        const matchedBranchList = this.branches.filter((branch) => branch.getName().toUpperCase().match(branchName.toUpperCase()))
        if (matchedBranchList) {
            return matchedBranchList;
        } else {
            return null;
        }
    }

    checkBranch(branch) {
        return this.branches.includes(branch);
    }

    listCustomers(branch, includeTransactions) {
        const getBranch = this.branches.find((br) => br.name === branch.name)
        if (getBranch) {
            if (includeTransactions) {
                const customerInfoWithTransaction = []
                getBranch.getCustomers().map(customer => {
                    const singleInfoWithTransaction = {
                        branchName : getBranch.name,
                        name: customer.getName(),
                        id: customer.getId(),
                        transactions: customer.getTransactions()
                    }
                    customerInfoWithTransaction.push(singleInfoWithTransaction)
                });
                return customerInfoWithTransaction;
            } else {
                return getBranch.getCustomers()
            }
        } else {
            return false;
        }
    }
}


const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("John", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch)

console.log( 'Find Branch by name :', arizonaBank.findBranchByName("bank"))
console.log('Find Branch by name :', arizonaBank.findBranchByName("sun"))

arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)

customer1.addTransactions(-1000)
console.log(customer1.getBalance())
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))
