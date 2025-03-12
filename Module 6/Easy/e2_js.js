import { getData } from "/utils.js";

document.addEventListener("DOMContentLoaded", () => {
	const userContainer = document.querySelector("#gebruikers-container");
	const url = "https://jsonplaceholder.typicode.com/users";

	async function populateUserContainer() {
		try {
			userContainer.replaceChildren();
			const loadNotice = userContainer.appendChild(document.createElement("div"));
			loadNotice.textContent = "Gebruikers laden...";
			loadNotice.classList.add("laad-indicator");

			const userList = await getData(url);
			userContainer.replaceChildren();

			if (userList.length === 0) {
				const errorNotice = userContainer.appendChild(document.createElement("p"));
				errorNotice.textContent = "Geen gebruikers gevonden.";
				errorNotice.classList.add("error-melding");
				return;
			}

			for (const user of userList) {
				const { id, name, username, email, phone, website, address, company } = user;
	
				const card = userContainer.appendChild(document.createElement("div"));
				const nameElement = card.appendChild(document.createElement("p"));
				const emailElement = card.appendChild(document.createElement("p"));
				const phoneElement = card.appendChild(document.createElement("p"));
	
				card.classList.add("gebruiker-kaart");
				nameElement.classList.add("gebruiker-naam");
				emailElement.classList.add("gebruiker-email");
				nameElement.textContent = name.charAt(0).toUpperCase() + name.slice(1);
				emailElement.textContent = email;
				phoneElement.textContent = `Phone: ${phone}`;
			}
		} catch (error) {
			console.log("Error occurred while fetching data:", error.message);

			userContainer.replaceChildren();
			const errorNotice = userContainer.appendChild(document.createElement("div"));
			errorNotice.textContent = error.message.charAt(0).toUpperCase() + error.message.slice(1);
			errorNotice.classList.add("error-melding");
		}
	}

	populateUserContainer();
});
