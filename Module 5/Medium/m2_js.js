document.addEventListener("DOMContentLoaded", () => {
	const secondsInput = document.querySelector("#seconds");
	const startInput = document.querySelector("#startButton");
	const cancelInput = document.querySelector("#cancelButton");
	const timerOutput = document.querySelector("#timerDisplay");
	const messageOutput = document.querySelector("#message");

	let cancelTimer = null; // Function to cancel the timer
	let messageTimer = null;

	// Function to show messages
	function showMessage(text, type) {
		clearInterval(messageTimer);
		messageOutput.textContent = text;
		messageOutput.className = `message ${type}`;
		messageOutput.style.display = "block";

		// Hide the message after 3 seconds
		messageTimer = setTimeout(() => {
			messageOutput.style.display = "none";
		}, 3000);
	}

	// Function meant to return a promise which counts every second
	function createTimer(seconds) {
		return new Promise((resolve, reject) => {
			// Begin with the original value
			timerOutput.textContent = seconds;

			// A function which we call if we wish to cancel
			cancelTimer = () => reject(new Error("Timer cancelled"));

			// Interval to count every second
			const interval = setInterval(() => {
				seconds--;
				timerOutput.textContent = seconds;

				if (seconds <= 0) {
					clearInterval(interval);
					resolve(); // Promise success completion
				}
			}, 1000);

			// Make it so we can clear the interval if we cancel
			cancelTimer = () => {
				clearInterval(interval);
				reject(new Error("Timer cancelled"));
			};
		});
	}

	startInput.addEventListener("click", () => {
		const seconds = parseInt(secondsInput.value);

		if (isNaN(seconds) || seconds < 1) {
			showMessage("Give us a valid number of seconds (minimum 1)", "error");
			return;
		}

		// Update UI
		startInput.disabled = true;
		cancelInput.disabled = false;
		showMessage("Timer started!", "info");

		// Start the timer
		createTimer(seconds)
			.then(() => {
				showMessage("Timer completed!", "success");
			})
			.catch((error) => {
				showMessage(error.message, "error");
			})
			.finally(() => {
				// Reset UI
				startInput.disabled = false;
				cancelInput.disabled = true;
			});
	});

	cancelInput.addEventListener("click", () => {
		if (cancelTimer) {
			cancelTimer();
		}
	});
});
