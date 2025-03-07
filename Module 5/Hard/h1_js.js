// Wait function that returns a Promis that waits the requested amount of time
function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to only light the blocks
async function lightBlock(block, time = 500) {
	// Save the original color
	const originalColor = block.style.backgroundColor;

	// Color change to white
	block.style.backgroundColor = "white";
	block.style.boxShadow = "0 0 20px white";

	// Wait for the given amount of time
	await wait(time);

	// Restore the original color
	block.style.backgroundColor = originalColor;
	block.style.boxShadow = "none";
}

// Function to start the lightshow with async/await
async function startLightShow() {
	const blockList = document.querySelectorAll(".block");
	const startInput = document.querySelector("#startBtn");

	// Disable the button during the show
	startInput.disabled = true;

	try {
		// Forwards sequence (from left to right)
		for (let i = 0; i < blockList; i++) {
			await lightBlock(blockList[i]);
		}

		// Small break before we return
		await wait(300);

		// Backwards sequence (from right to left)
		for (let i = blockList.length - 1; i >= 0; i--) {
			await lightBlock(blockList[i]);
		}
	} catch (error) {
		console.error("Something went wrong with the lightshow:", error);
	} finally {
		// Show is done, reactivate the button
		startInput.disabled = false;
	}
}

// Event listener for the start button
document.querySelector("#startBtn").addEventListener("click", startLightShow);
