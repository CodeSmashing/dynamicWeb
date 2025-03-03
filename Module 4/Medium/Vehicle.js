class Vehicle {
	constructor(brand, model, year, rentalPrice) {
		this.id = Vehicle.generateId();
		this.brand = brand;
		this.model = model;
		this.year = year;
		this.rentalPrice = rentalPrice;
		this.availability = true;
	}

	rent() {
		this.availability = false;
		return "Thank you for renting our vehicle!";
	}

	return() {
		this.availability = true;
		return "Thank you for returning our vehicle!";
	}

	static idCounter = 1;
	static generateId() {
		return Vehicle.idCounter++;
	}
}
