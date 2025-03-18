import { createElement } from "/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
	const outputStatus = document.querySelector("#status-info");
	const outputResponse = document.querySelector("#response-details");
	const inputButtonList = document.querySelector(".endpoint-lijst").children;
	const urlString = "https://httpstat.us/{code}";
	
	for (const button of inputButtonList) {
		button.addEventListener("click", () => handleButton(button.dataset.code));
	}

	function getStatusString(status) {
		if (status >= 200 && status < 300) {
			return "Success";
		} else if (status >= 300 && status < 400) {
			return "Redirect";
		} else if (status >= 400 && status < 500) {
			return "Client error";
		} else if (status >= 500) {
			return "Server error";
		}
		return "Undefiend";
	}

	async function handleButton(code) {
		try {
			const response = await getData(urlString.replace("{code}", code));
			const { status, statusText, ok, headers, type, url } = response;

			// Reset the output divs
			outputStatus.classList.remove(outputStatus.classList[0]);
			outputStatus.replaceChildren();
			outputResponse.replaceChildren();

			// Set the status info div content
			outputStatus.appendChild(createElement("p", { textContent: `Status: ${status} ${statusText}` }));
			outputStatus.appendChild(createElement("p", { textContent: `OK?: ${ok}` }));
			outputStatus.appendChild(createElement("p", { textContent: `Category: ${getStatusString(status)} ${Math.floor(status / 100)}xx` }));
			outputStatus.classList.add(`status-${getStatusString(status).toLowerCase().replaceAll(" ", "-")}`);

			// Set the response details div content
			const headerGroup = outputResponse.appendChild(createElement("div"));
			headerGroup.appendChild(createElement("p", { textContent: "// Headers" }));
			outputResponse.appendChild(createElement("br"));
			outputResponse.appendChild(createElement("p", { textContent: `// Response type: ${type}` }));
			outputResponse.appendChild(createElement("p", { textContent: `// Response URL: ${url}` }));
			headers.forEach((key, value) => {
				headerGroup.appendChild(createElement("p", { textContent: `• ${value}: ${key}` }));
			});
		} catch (error) {
			console.error("Error occurred while fetching data:", error.message);
		}
	}

	async function getData(url) {
		try {
			const response = await fetch(url);
			return response;
		} catch (error) {
			console.error(`Error bij het ophalen van de data: ${error.message}`);
			throw error; // Re-throw the error
		}
	}
});
