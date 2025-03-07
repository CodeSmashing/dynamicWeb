const bankaccountList = [
	new Bankaccount("Bob", 20000),
	new Bankaccount("Dylan", 696969),
	new Bankaccount("Josh", 1000),
	new Savingsaccount("Dosh", 1000, .25),
	new Bankaccount("Tim", 25100),
	new Bankaccount("Drake", 30000000)
];

const accountOutput = document.querySelector("#accounts");
const transactionOutput = document.querySelector("#transactions");

document.body.insertAdjacentHTML("beforebegin", "<h2>Accounts</h2>");
document.body.insertAdjacentElement("beforeend", accountOutput);
document.body.insertAdjacentHTML("beforeend", "<h2>Transactions</h2>");
document.body.insertAdjacentElement("beforeend", transactionOutput);

for (const bankaccount of bankaccountList) {
	const amount = Math.round(Math.random() * (10000 - 1)) + 1;
	const randomBankaccount = bankaccountList[Math.round(Math.random() * (bankaccountList.length - 1))];
	accountOutput.appendChild(bankaccount.card);
	const bool = Bankaccount.validateTransaction(bankaccount, randomBankaccount, amount);

	if (bool) {
		const transactionDiv = document.createElement("div");
		transactionDiv.classList.add("card");
		let htmlString = `<p>
		From:	${bankaccount.owner}<br>
				${bankaccount.bankaccountNumber}<br>
		€${bankaccount.balance} - €${amount}</p>

		<p>
		To:		${randomBankaccount.owner}<br>
				${randomBankaccount.bankaccountNumber}<br>
		€${randomBankaccount.balance} + €${amount}</p>`;

		console.log(bankaccount.withdraw(amount));
		console.log(randomBankaccount.deposit(amount));

		if (randomBankaccount.constructor.name === "Savingsaccount") {
			randomBankaccount.addInterest();
		}

		transactionDiv.innerHTML = htmlString;
		transactionOutput.appendChild(transactionDiv);

		bankaccount.card.innerHTML = bankaccount.getOverview;
		randomBankaccount.card.innerHTML = randomBankaccount.getOverview;
	}
}
