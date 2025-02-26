const inputNameElement = document.querySelector("#playerName");
const outputStats = document.querySelector("#playerStats");
const playerList = [];
let incrementalId = 1;
let currentPlayer;

const findPlayer = () => {
	const inputName = inputNameElement.value;
	const player = playerList.find(p => p.name === inputName);
	if (player !== undefined) return currentPlayer = player;

	return undefined;
};

const createNewPlayer = () => {
	const newPlayer = {
		name: inputNameElement.value !== "" ? inputNameElement.value : `Player ${incrementalId++}`,
		level: 1,
		health: 100
	}

	// Only add if we don't have a duplicate
	if (findPlayer() !== undefined) return alert("We already have a player with that name.");
	currentPlayer = newPlayer
	playerList.push(currentPlayer);
	updatePlayerStats(currentPlayer);
}

const doDamageToPlayer = () => {
	if (findPlayer() === undefined) return alert("No player could be found with that name.");

	currentPlayer.health -= 25;
	if (currentPlayer.health <= 0) {
		currentPlayer.health = 100;
		currentPlayer.level--;
	}
	updatePlayerStats(currentPlayer);
}

const levelPlayerUp = () => {
	if (findPlayer() === undefined) return alert("No player could be found with that name.");

	currentPlayer.level++;
	currentPlayer.health = 100;
	updatePlayerStats(currentPlayer);
}

function updatePlayerStats(player) {
	let htmlStrong = `
	<p>Name: ${player.name}</p>
	<p>Level: ${player.level}</p>
	<p>Health: ${player.health}</p>`;

	outputStats.innerHTML = htmlStrong;
}

