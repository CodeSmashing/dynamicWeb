"use strict";

const interfaceControlContainer = document.querySelector("#controls");
const inputControlList = [
	interfaceControlContainer.querySelector("#playerName"),
	interfaceControlContainer.querySelector("#createPlayer"),
	interfaceControlContainer.querySelector("#doDamage"),
	interfaceControlContainer.querySelector("#levelUp")
];
const outputStats = document.querySelector("#playerStats");
const playerList = [];
let incrementalNameId = 1;
let currentPlayer = {};
let baseLevel = 1;
let baseHealth = 100;
let baseDamage = 25;

const findPlayer = (inputName = currentPlayer.name) => {
	const player = playerList.find((p) => p.name === inputName);
	if (player !== undefined) {
		currentPlayer = player;
		updatePlayerStats();
		return currentPlayer;
	}

	return undefined;
};

const updatePlayerStats = () => {
	outputStats.replaceChildren();
	outputStats.appendChild(currentPlayer.card);
};

const createPlayer = () => {
	const inputName = interfaceControlContainer.querySelector("#playerName").value;
	if (inputName === "") return alert("The name input was left empty.");
	if (findPlayer(inputName) !== undefined) return alert("We already have a player with that name.");
	currentPlayer = new Player(inputName);
	updatePlayerStats();
};

const doDamage = () => {
	if (findPlayer() === undefined) return alert("Can't do damage to a none-existant player.");
	currentPlayer.health -= baseDamage;
	if (currentPlayer.health <= 0) {
		currentPlayer.health = baseHealth;
		currentPlayer.level--;
	}
	currentPlayer.updateCard();
};

const levelUp = () => {
	if (findPlayer() === undefined) return alert("Can't level up a none-existant player.");
	currentPlayer.level++;
	currentPlayer.health = baseHealth;
	currentPlayer.updateCard();
};

const handleInput = (input) => {
	switch (input.id) {
		case "createPlayer":
			createPlayer();
			break;
		case "doDamage":
			doDamage();
			break;
		case "levelUp":
			levelUp();
			break;
		default:
			alert("We haven't considerd that case yet.");
			break;
	}
};

for (const input of inputControlList) {
	if (input.tagName === "BUTTON") input.addEventListener("click", () => handleInput(input));
	if (input.id === "doDamage") {
		const outputDamageSpan = input.querySelector("#damageTotal");
		outputDamageSpan.textContent = baseDamage;
	}
}

class Player {
	constructor(name = `Player ${incrementalNameId++}`) {
		const card = document.createElement("div");
		const lastPlayer = playerList[Math.max(playerList.length - 1, 0)];
		const indexOf = lastPlayer === undefined ? undefined : lastPlayer.id.indexOf("-");
		const idString = lastPlayer === undefined ? "player-1" : "player-" + (parseInt(lastPlayer.id.slice(indexOf + 1)) + 1);

		const htmlString = `
		<h3>Stats</h3>
		<p>Name: ${name}</p>
		<p>Level: ${baseLevel}</p>
		<p>Health: ${baseHealth}</p>`;

		card.innerHTML = htmlString;

		playerList.push(this);
		this.id = idString;
		this.name = name;
		this.level = baseLevel;
		this.health = baseHealth;
		this.card = card;
	}

	updateCard() {
		const htmlString = `
		<h3>Stats</h3>
		<p>Name: ${this.name}</p>
		<p>Level: ${this.level}</p>
		<p>Health: ${this.health}</p>`;

		this.card.innerHTML = htmlString;
	}
}
