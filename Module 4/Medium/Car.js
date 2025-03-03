class Car extends Vehicle {
	constructor(brand, model, year, rentalPrice, numberOfDoors, fuelType) {
		super(brand, model, year, rentalPrice);
		this.numberOfDoors = numberOfDoors;
		this.fuelType = fuelType;
		this.availability = true;
		this.type = "Car";
	}

	rent() {
		super.rent();
		if (this.availability) return `Sorry, but this ${this.brand} ${this.model} is already rented our.`;

		this.availability = false;
		return `Car ${this.brand} ${this.model} (${this.year}), ${this.type}, ${this.numberOfDoors} Doors, ${this.fuelType} is now yours.`;
	}
}
