import { createElement, getData } from "/utils.js";

document.addEventListener("DOMContentLoaded", () => {
	const buttonGetWeather = document.querySelector("#getWeather");
	const outputWeatherData = document.querySelector("#weather-data");
	const loader = document.querySelector("#loader");
	const defaultError = createElement("p", { classList: ["error"] });
	const defaultLoading = createElement("p", { textContent: "Loading...", classList: ["loading"] });
	buttonGetWeather.addEventListener("click", handleButton);

	/**
	 * Fetches the latitude and longitude of a given city via the geocoding API of open-meteo.com.
	 *
	 * @param {string} city The name of the city to fetch coordinates for.
	 * @returns {Promise<Object|null>} An object containing the id, latitude, and longitude of the city, or null if an error occurs.
	 * @see {@link https://geocoding-api.open-meteo.com/}
	 */
	async function getCoordinates(city) {
		const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
		try {
			const data = await getData(geocodeUrl);
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
		const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunset,sunrise&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&forecast_days=1`;
		try {
			const data = await getData(weatherUrl);
			if (!data.current) throw new Error("Weather data not available");

			return data;
		} catch (error) {
			console.warn("Unable to retrieve current weather data.");
			defaultError.textContent = error.message;
			return null;
		}
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

		card.setAttribute("id", id);
		card.classList.add("weather-card");
		card.appendChild(createElement("h2", { textContent: cityName }));
		card.appendChild(createElement("p", { textContent: `Huidige temperatuur: ${valueT}${unitT}` }));
		card.appendChild(createElement("p", { textContent: `Luchtvochtigheid: ${valueH}${unitH}` }));
		card.appendChild(createElement("p", { textContent: `Windsnelheid: ${valueW}${unitW}` }));
		card.appendChild(createElement("p", { textContent: `Zonsopgang: ${time}, ${sunrise[0].split("T")[1]}` }));
		card.appendChild(createElement("p", { textContent: `Zonsondergang: ${time}, ${sunset[0].split("T")[1]}` }));
		outputWeatherData.replaceChildren(card);

		localStorage.setItem("city", JSON.stringify({ name: cityName, currentWeather: currentWeather }));
	}

	// Handle city name input, either through a button click or pressing the "enter" key in the input field
	async function handleButton() {
		const cityData = JSON.parse(localStorage.getItem("city"));

		if (!cityData) {
			const cityName = "Moscow";
			const locationCoordinates = await getCoordinates(cityName);

			if (!locationCoordinates) {
				return loader.replaceChildren(defaultError);
			}
			const currentWeather = await getCurrentWeather(locationCoordinates.latitude, locationCoordinates.longitude);

			if (!currentWeather) {
				return loader.replaceChildren(defaultError);
			}

			currentWeather["id"] = `weather-${cityName}-${locationCoordinates.id}`;
			currentWeather["city_name"] = cityName;
			loader.replaceChildren(defaultLoading);
			createWeatherCard(currentWeather);
		} else {
			createWeatherCard(cityData.currentWeather);
		}
	}
});
