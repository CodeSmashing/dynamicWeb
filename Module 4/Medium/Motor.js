class Motor extends Vehicle {
	constructor(brand, model, year, rentalPrice, cylinderCapacity, type) {
		super(brand, model, year, rentalPrice);
		this.cylinderCapacity = cylinderCapacity;
		this.availability = true;
		this.type = type;
	}

	rent() {
		super.rent();
		if (this.availability) return `Sorry, but this ${this.brand} ${this.model} is already rented our.`;

		this.availability = false;
		return `Motor ${this.brand} ${this.model} (${this.year}), ${this.type}, ${this.cylinderCapacity}L cylinder capacity, is now yours.`;
	}
}
