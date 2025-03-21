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
		console.error(`Error while retrieving the data: ${error.message}`);
		throw error; // Re-throw the error
	}
}

export function createElement(tagName, options = {}) {
	const element = document.createElement(tagName);
	for (const [key, value] of Object.entries(options)) {
		switch (key) {
			case "id":
			case "for":
			case "type":
				element.setAttribute(key, value);
				break;
			case "textContent":
				element.textContent = value;
				break;
			case "classList":
				for (const classValue of value) {
					element.classList.add(classValue);
				}
				break;
			case "data":
				for (const [property, data] of Object.entries(value)) {
					element.dataset[property] = data;
				}
				break;
			case "children":
				for (const childElement of value) {
					element.appendChild(childElement);
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
