const outputContainer = document.querySelector("#output");
const vehicleList = [
	new Motor("Motorola", "The American", 1960, "€8000", 1200, "diesel"),
	new Car("Nissan", "XY-11", 2009, "$20000", 4, "diesel"),
	new Car("Toyota", "Corolla", 2022, "$25000", 4, "hybrid"),
	new Motor("Harley-Davidson", "Street 750", 2021, "€12000", 750, "petrol"),
	new Car("Tesla", "Model 3", 2023, "$45000", 4, "electric"),
	new Motor("BMW", "R 1250 GS", 2022, "€18000", 1254, "petrol"),
	new Car("Ford", "Mustang", 2020, "$35000", 2, "petrol"),
	new Motor("Ducati", "Panigale V4", 2023, "€25000", 1103, "petrol"),
	new Car("Volkswagen", "Golf", 2021, "€22000", 4, "petrol"),
	new Motor("Kawasaki", "Ninja 650", 2022, "$8000", 649, "petrol"),
	new Car("Mercedes-Benz", "E-Class", 2023, "€55000", 4, "hybrid"),
	new Motor("Triumph", "Street Triple", 2021, "£10000", 765, "petrol"),
	new Car("Audi", "A4", 2022, "€40000", 4, "diesel"),
	new Motor("Yamaha", "MT-07", 2023, "$9000", 689, "petrol"),
	new Car("Hyundai", "Tucson", 2022, "$28000", 4, "hybrid"),
	new Motor("KTM", "390 Duke", 2023, "€6000", 373, "petrol"),
	new Car("Mazda", "CX-5", 2021, "$30000", 4, "petrol"),
];

function displayVehicles() {
	const outputTitle = outputContainer.appendChild(document.createElement("h2"));
	const outputTable = outputContainer.appendChild(document.createElement("table"));
	const tableHeadList = ["Brand", "Model", "Year", "Rental Price", "Availability", "Number Of Doors", "Cylinder Capacity", "Fuel Type", "Type", "Rent Options"];
	const tableHead = outputTable.createTHead().insertRow();
	const tableBody = outputTable.createTBody();

	tableHeadList.map((key) => (tableHead.insertCell().outerHTML = `<th data-content="${key}">${key}</th>`));
	outputTitle.textContent = "Available vehicles";

	for (const vehicle of vehicleList) {
		const tableRow = tableBody.insertRow();

		for (const key of tableHeadList) {
			const unCapitalizedKey = (key.charAt(0).toLowerCase() + key.slice(1)).replaceAll(" ", "");
			const tableCel = tableRow.insertCell();
			tableCel.setAttribute("data-content", key);

			if (vehicle[unCapitalizedKey] !== undefined) tableCel.textContent = vehicle[unCapitalizedKey];
			if (key === "Rent Options") setRentOptions(vehicle, tableRow.querySelector("[data-content='Availability']"), tableCel);
		}
	}
}

function setRentOptions(vehicle, availabilityCell, tableCel) {
	const buttonRent = tableCel.appendChild(document.createElement("button"));
	const buttonReturn = tableCel.appendChild(document.createElement("button"));

	tableCel.classList.add("options");
	buttonRent.textContent = "Rent";
	buttonReturn.textContent = "Return";

	buttonRent.setAttribute("data-action", "rent");
	buttonReturn.setAttribute("data-action", "return");
	setButtonStates(buttonRent, buttonReturn, vehicle.availability);

	for (const button of [buttonRent, buttonReturn]) {
		button.addEventListener("click", (event) => {
			handleRentReturn(event.target.getAttribute("data-action"), vehicle);
			availabilityCell.textContent = vehicle.availability;
			setButtonStates(buttonRent, buttonReturn, vehicle.availability);
		});
	}
}

function setButtonStates(buttonRent, buttonReturn, isAvailable) {
	buttonRent.disabled = !isAvailable;
	buttonReturn.disabled = isAvailable;
}

function handleRentReturn(action, vehicle) {
	if (action === "rent") alert(vehicle.rent());
	else if (action === "return") alert(vehicle.return());
}

displayVehicles();
