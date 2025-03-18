"use strict";

export function updateOutputList(targetElement, outputList) {
	targetElement.replaceChildren();
	for (const item of outputList) {
		targetElement.appendChild(item.card);
	}
}

export async function getData(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		return await response.json();
	} catch (error) {
		console.error(`Error bij het ophalen van de data: ${error.message}`, error);
		throw error; // Re-throw the error
	}
}

export function createElement(tagName, options = {}) {
	const element = document.createElement(tagName);
	for (const [key, value] of Object.entries(options)) {
		switch (key) {
			case "textContent":
				element.textContent = value;
				break;
			case "classList":
				for (const classValue of value) {
					element.classList.add(classValue);
				}
				break;
			default:
				console.warn(`Unhandled property: ${key}`); // console.warn();
				break;
		}
	}
	return element;
}

export function getRandomInt(min = 0, max = 20) {
	return Math.round(Math.random() * (max - min)) + min;
}
