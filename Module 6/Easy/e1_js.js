import { getData } from "/utils.js";

document.addEventListener("DOMContentLoaded", () => {
	const inputButton = document.querySelector("#haalTekstOp");
	const outputResult = document.querySelector("#resultaat");
	const url = "https://jsonplaceholder.typicode.com/posts/1";

	inputButton.addEventListener("click", setOutputResult);

	async function setOutputResult() {
		try {
			const { id, userId, title, body } = await getData(url);
			outputResult.replaceChildren();
			const articleElement = outputResult.appendChild(document.createElement("article"));
			const titleElement = articleElement.appendChild(document.createElement("h2"));
			const paragraphElement = articleElement.appendChild(document.createElement("p"));

			titleElement.textContent = title.charAt(0).toUpperCase() + title.slice(1);
			paragraphElement.textContent = body.charAt(0).toUpperCase() + body.slice(1);
		} catch (error) {
			console.log("Error occurred while fetching data:", error.message);

			outputResult.replaceChildren();
			const paragraph = outputResult.appendChild(document.createElement("h2"));
			paragraph.textContent = error.message.charAt(0).toUpperCase() + error.message.slice(1);
			paragraph.classList.add("error");
		}
	}
});
