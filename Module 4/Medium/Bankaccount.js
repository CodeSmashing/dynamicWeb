class Bankaccount {
	constructor(owner, balance) {
		const card = document.createElement("div");
		card.setAttribute("class", "card");

		this.bankaccountNumber = Bankaccount.generateBankAccountNumber();
		this.owner = owner;
		this.balance = balance;
		this.card = card;

		const htmlString = this.getOverview;
		card.innerHTML = htmlString;
	}

	get getBankaccountNumber() {
		return this.bankaccountNumber;
	}

	get getOwner() {
		return this.owner;
	}

	get getBalance() {
		return this.balance;
	}

	/**
	 * @param {number} newBalance
	 */
	set setBalance(newBalance) {
		if (newBalance < 0) console.log("Can't set the balance to a negative value.");
		else this.balance = newBalance;
	}

	deposit(amount) {
		if (amount <= 0) {
			return "You tried depositing nothing.";
		} else {
			this.balance += amount;
			return `You successfully deposited €${amount}.`;
		}
	}

	withdraw(amount) {
		if (amount > this.balance) {
			return "You tried to withdraw more then what you had.";
		} else {
			this.balance -= amount;
			return `You successfully withdrew €${amount}.`;
		}
	}

	get getOverview() {
		return `
		<p>Bankaccount: ${this.bankaccountNumber}</p>
		<p>Type: ${this.constructor.name}</p>
		<p>Owner: ${this.owner}</p>
		<p>Balance: €${this.balance}</p>`;
	}

	static accountNumberList = [];
	static generateBankAccountNumber() {
		while (true) {
			let bankaccountNumber = Math.round(Math.random() * (999999999 - 100000000)) + 100000000;
			if (!Bankaccount.accountNumberList.includes(bankaccountNumber)) {
				Bankaccount.accountNumberList.push(bankaccountNumber);
				return bankaccountNumber;
			}
		}
	}

	static validateTransaction(from, to, amount) {
		if (from.bankaccountNumber && from.owner && from.balance && to.bankaccountNumber && to.owner && to.balance) {
			if (amount <= from.balance) {
				return true;
			}
		}
		return false;
	}
}
