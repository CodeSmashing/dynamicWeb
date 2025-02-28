class Student {
	constructor(name, age, modules) {
		this.name = name;
		this.age = parseInt(age);
		this.modules = {};

		if (modules instanceof Object && !Array.isArray(modules)) {
			for (const [key, value] of Object.entries(modules)) {
				this.modules[key] = value;
			}
		} else if (Array.isArray(modules)) {
			for (const module of modules) {
				this.modules[module] = "N/A";
			}
		}
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
		let returnString = "<div class='card'>";
		for (const [key, value] of Object.entries(this.modules)) {
			returnString += `<p>${key}: ${value}</p>`;
		}
		returnString += "</div>";
		return returnString;
	}
}
