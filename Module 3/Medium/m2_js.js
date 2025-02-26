"use strict";

const inputName = document.querySelector("#playerName");
const inputScore = document.querySelector("#score");
const outputField = document.querySelector("#scoreBoard");
const processScore = (name = "Unknown", score = 0) => { 
	const domElement = document.createElement("p");
	domElement.textContent = `${name}: ${score}`;

	return { name, score, domElement };
};
const scoreList = [];

function addScore() {
	if (inputName.value === "") return alert("The name input was left empty.");
	if (isNaN(Number.parseInt(inputScore.value))) return alert("Your inputted score isn't recognized as a number.");
	if (scoreList.find(score => score.name === inputName.value) !== undefined) return alert("The inputted name is already in use.");
	
	const newScore = processScore(inputName.value, inputScore.value);
	scoreList.push(newScore);
	outputField.appendChild(newScore.domElement);
	return newScore;
}
