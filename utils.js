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
		console.error(`Error bij het ophalen van de data: ${error.message}`);
		throw error; // Re-throw the error
	}
}

export function getRandomInt(min = 0, max = 20) {
	return Math.round(Math.random() * (max - min)) + min;
}
