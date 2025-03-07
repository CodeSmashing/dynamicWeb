class Savingsaccount extends Bankaccount {
	constructor(owner, balance, rentPercentage) {
		super(owner, balance);
		this.rentPercentage = rentPercentage;
	}

	addInterest() {
		this.balance += this.balance * this.rentPercentage;
		console.log(`Successfully added an interest of ${this.rentPercentage}%, so we added €${this.balance * this.rentPercentage}`);
	}
}
