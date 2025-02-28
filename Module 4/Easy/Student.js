let studentCounter = 0;
class Student {
	constructor(name, age, modules) {
		const card = document.createElement("div");
		const idString = "student-" + studentCounter++;
		let htmlString = `<h2>Report for ${name}</h2><ul>`;

		card.setAttribute("id", idString);
		card.setAttribute("class", "card");

		this.id = idString;
		this.name = name;
		this.age = parseInt(age);
		this.modules = {};
		this.card = card;

		if (modules instanceof Object && !Array.isArray(modules)) {
			for (const [key, value] of Object.entries(modules)) {
				this.modules[key] = value;
				htmlString += `<li>${key}: ${value}</li>`;
			}
		} else if (Array.isArray(modules)) {
			for (const module of modules) {
				this.modules[module] = "N/A";
				htmlString += `<li>${module}: N/A</li>`;
			}
		}
		htmlString += "</ul>";
		card.innerHTML = htmlString;
	}

	addScore(module, score) {
		if (isNaN(module) === true) this.modules[module] = score;
	}

	average() {
		let average = 0;

		for (const value of Object.values(this.modules)) {
			if (!isNaN(value)) average += parseInt(value);
		}
		return average / Object.entries(this.modules).length;
	}

	showReport() {
		return this.card;
	}
}
