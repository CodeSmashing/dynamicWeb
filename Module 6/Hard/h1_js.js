import { createElement, getData } from "/utils.js";

document.addEventListener("DOMContentLoaded", () => {
	const outputWeather = document.querySelector("#weather-display");
	const outputFavourite = document.querySelector("#favorites-list");
	const inputCity = document.querySelector("#city-input");
	const inputButton = document.querySelector("#search-button");
	const defaultError = createElement("p", { classList: ["error"] });
	const defaultLoading = createElement("p", { textContent: "Loading...", classList: ["loading"] });
	const geocodeUrl = "https://geocoding-api.open-meteo.com/v1/search?name={CITY}&count=1&language=en&format=json";
	const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&daily=sunset,sunrise&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&forecast_days=1";

	inputButton.addEventListener("click", handleButton);
	inputCity.addEventListener("keydown", handleButton);
	outputWeather.addEventListener("click", handleCardAction);
	outputFavourite.addEventListener("click", handleCardAction);

	// Event listeners to manage switching the temperature notation and favoriting weather cards
	function handleCardAction(event) {
		// Recursively search for an article element parent of our event target,
		// hoping the event target is an input field or button
		const getArticleParent = (element, count = 0) => {
			if (count > 5 || !element) return null;
			return element.tagName !== "ARTICLE" ? getArticleParent(element.parentElement, count + 1) : element;
		};

		const target = event.target;
		const article = getArticleParent(target.parentElement);

		if (!article) return console.warn("No valid article element was found for the action.");

		if (target.classList.contains("temperature-toggle")) {
			const span = article.querySelector(".temperature span");
			toggleTextContent(span);
		}

		if (target.id === "favourite-checkbox" && target.type === "checkbox") {
			handleFavourite(article, target);
		}
	}

	/**
	 * Fetches the latitude and longitude of a given city via the geocoding API of open-meteo.com.
	 *
	 * @param {string} city The name of the city to fetch coordinates for.
	 * @returns {Promise<Object|null>} An object containing the id, latitude, and longitude of the city, or null if an error occurs.
	 * @see {@link https://geocoding-api.open-meteo.com/}
	 */
	async function getCoordinates(city) {
		try {
			const data = await getData(geocodeUrl.replace("{CITY}", encodeURIComponent(city)));
			if (Object.entries(data).length === 0) throw new Error("City not found");

			return {
				id: data.results[0].id,
				latitude: parseFloat(data.results[0].latitude),
				longitude: parseFloat(data.results[0].longitude),
			};
		} catch (error) {
			console.warn("Unable to retrieve coordinates for the city.");
			defaultError.textContent = error.message;
			return null;
		}
	}

	/**
	 * Fetches the current weather of the given latitude and logitude via the API of open-meteo.com.
	 *
	 * @param {number} latitude The latitude of the city.
	 * @param {number} longitude The longitude of the city.
	 * @returns {Promise<Object|null>} An object containing various properties related to the weather returned from open-meteo.com, or null if an error occurs.
	 * @see {@link https://api.open-meteo.com/}
	 */
	async function getCurrentWeather(latitude, longitude) {
		try {
			const data = await getData(weatherUrl.replace("{LATITUDE}", encodeURIComponent(latitude)).replace("{LONGITUDE}", encodeURIComponent(longitude)));
			if (!data.current) throw new Error("Weather data not available");

			return data;
		} catch (error) {
			console.warn("Unable to retrieve current weather data.");
			defaultError.textContent = error.message;
			return null;
		}
	}

	/**
	 * Given an element that has it's `textContent` attribute set and has a `data` attribute `alternative` set, sets the `alternative` (if present) as the new `textContent` and vice versa.
	 *
	 * @param {Node} textElement Node element to toggle the text of.
	 * @returns {void} Returns void.
	 */
	function toggleTextContent(textElement) {
		const currentTextContent = textElement.textContent;
		const alternativeTextContent = textElement.dataset["alternative"];

		if (!currentTextContent || !alternativeTextContent) return console.warn("Can't toggle text content if no text or alternative is provided.");
		textElement.textContent = alternativeTextContent;
		textElement.dataset["alternative"] = currentTextContent;
	}

	function createWeatherCard(currentWeather) {
		const {
			city_name: cityName,
			id,
			current: { temperature_2m: valueT, weather_code: weatherCode, relative_humidity_2m: valueH, wind_speed_10m: valueW },
			current_units: { temperature_2m: unitT, relative_humidity_2m: unitH, wind_speed_10m: unitW },
			daily: { time: time, sunrise, sunset },
		} = currentWeather;
		const card = (currentWeather["card"] = document.createElement("article"));
		const textCelsius = `${valueT}°C`;
		const textFahrenheit = `${(valueT * 9) / 5 + 32}F`;
		const span = createElement("span", { textContent: unitT === "°C" ? textCelsius : textFahrenheit, data: { alternative: unitT === "°C" ? textFahrenheit : textCelsius } });
		const checkbox = createElement("input", { type: "checkbox", id: "favourite-checkbox" });

		card.setAttribute("id", id);
		card.classList.add("weather-card");
		card.appendChild(createElement("h2", { textContent: cityName }));
		card.appendChild(createElement("p", { textContent: "Huidige temperatuur: ", classList: ["temperature"], children: [span] }));
		card.appendChild(createElement("p", { textContent: `Weerbeschrijving: ${weatherCodeToString(weatherCode)}` }));
		card.appendChild(createElement("p", { textContent: `Luchtvochtigheid: ${valueH}${unitH}` }));
		card.appendChild(createElement("p", { textContent: `Windsnelheid: ${valueW}${unitW}` }));
		card.appendChild(createElement("p", { textContent: `Zonsopgang: ${time}, ${sunrise[0].split("T")[1]}` }));
		card.appendChild(createElement("p", { textContent: `Zonsondergang: ${time}, ${sunset[0].split("T")[1]}` }));
		card.appendChild(createElement("button", { textContent: "Switch temp", classList: ["temperature-toggle"] }));
		card.appendChild(createElement("label", { textContent: "Set favourite", for: "favourite-checkbox", classList: ["favourite-label"], children: [checkbox] }));
		outputWeather.replaceChildren(card);
	}

	function weatherCodeToString(weatherCode) {
		switch (weatherCode) {
			case 0:
				return "Onbewolkt";
			case 1:
			case 2:
			case 3:
				return "Overwegend helder, gedeeltelijk bewolkt, of zwaarbewolkt";
			case 45:
			case 48:
				return "Mist en rijpende rijp mist";
			case 51:
			case 53:
			case 55:
				return "Motregen: Licht, matig, of dicht van intensiteit";
			case 56:
			case 57:
				return "Ijzel: Licht of dicht van intensiteit";
			case 61:
			case 63:
			case 65:
				return "Regen: Licht, matig, of zwaar van intensiteit";
			case 66:
			case 67:
				return "Ijzelregen: Licht of zwaar van intensiteit";
			case 71:
			case 73:
			case 75:
				return "Sneeuwval: Licht, matig, of zwaar van intensiteit";
			case 77:
				return "Sneeuwkorrels";
			case 80:
			case 81:
			case 82:
				return "Regenbuien: Licht, matig, of hevig";
			case 85:
			case 86:
				return "Sneeuwbuien: Licht of zwaar";
			case 95:
				return "Onweer: Licht of matig";
			case 96:
			case 99:
				return "Onweer met lichte of zware hagel";
			default:
				return "Onbekende weerconditie";
		}
	}

	// Meant to either add weather cards to the favourite output div or remove them from said div
	function handleFavourite(card, checkbox) {
		if (checkbox.checked) {
			if (!outputFavourite.contains(card)) {
				card.classList.add("favourite-item");
				outputFavourite.appendChild(card);
			}
		} else {
			if (!outputFavourite.contains(card)) {
				return console.warn("Card was not found in favourite list.");
			}
			outputFavourite.removeChild(card);
		}
	}

	// Handle city name input, either through a button click or pressing the "enter" key in the input field
	async function handleButton(event) {
		if (inputCity.value.trim().length === 0) return;
		if (event.key === "Enter" || event.type === "click") {
			const cityName = inputCity.value.charAt(0).toUpperCase() + inputCity.value.slice(1).toLowerCase();
			const locationCoordinates = await getCoordinates(cityName);

			if (!locationCoordinates) {
				return outputWeather.replaceChildren(defaultError);
			}
			const currentWeather = await getCurrentWeather(locationCoordinates.latitude, locationCoordinates.longitude);

			if (!currentWeather) {
				return outputWeather.replaceChildren(defaultError);
			}

			currentWeather["id"] = `weather-${cityName}-${locationCoordinates.id}`;
			currentWeather["city_name"] = cityName;
			outputWeather.replaceChildren(defaultLoading);
			createWeatherCard(currentWeather);
		}
	}
});
