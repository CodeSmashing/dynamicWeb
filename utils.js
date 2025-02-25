"use strict";

function updateOutputList(targetElement, outputList) {
	targetElement.replaceChildren();
	for (const item of outputList) {
		targetElement.appendChild(item.card);
	}
}

function getRandomInt(min = 0, max = 20) {
	return Math.round(Math.random() * (max - min)) + min;
}
