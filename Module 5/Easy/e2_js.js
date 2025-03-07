document.addEventListener("DOMContentLoaded", () => {
	const buttonInput = document.querySelector("#clickButton");
	const counterOutput = document.querySelector(".counter");
	const messageOutput = document.querySelector(".message");

	function waitOnClick() {
		return new Promise((resolve) => {
			const handleClick = () => {
				// Delete the event listener after handling
				buttonInput.removeEventListener("click", handleClick);
				resolve();
			};
			buttonInput.addEventListener("click", handleClick);
		});
	}

	async function startCounter() {
		let count = 0;

		while (count < 5) {
			await waitOnClick();

			count++;
			counterOutput.textContent = count;

			console.log(`Click ${count} registerd.`);
		}

		messageOutput.textContent = "Congratulations! You've clicked the button 5 times.";
		buttonInput.disabled = true;
	}

	startCounter();
});
