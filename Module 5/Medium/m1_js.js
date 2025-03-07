document.addEventListener("DOMContentLoaded", () => {
	const progressBar = document.querySelector(".progress-bar");
	const loadButton = document.querySelector("#loadButton");
	const galary = document.querySelector(".gallery");
	const imageURLList = ["https://picsum.photos/id/10/300/300", "https://picsum.photos/id/20/300/300", "https://picsum.photos/id/30/2500/1440"];

	function loadImage(url) {
		return new Promise((resolve, reject) => {
			const img = new Image();

			img.onload = () => {
				resolve(img);
			};

			img.onerror = () => {
				reject(new Error(`Fout bij het laden van afbeelding: ${url}`));
			};

			img.src = url;
		});
	}

	function updateProgress(currentImage, totalImageCount) {
		const percentage = Math.round((currentImage / totalImageCount) * 100);
		progressBar.style.width = `${percentage}%`;
		progressBar.textContent = `${percentage}%`;
	}

	function loadGalary() {
		// Reset the galary
		galary.replaceChildren();
		progressBar.style.width = "0%";
		progressBar.textContent = "0%";

		// Start with the first image
		loadImage(imageURLList[0])
			.then((img) => {
				// Add the first image
				galary.appendChild(img);
				updateProgress(1, imageURLList.length);

				// Load the second image
				return loadImage(imageURLList[1]);
			})
			.then((img) => {
				// Add the second image
				galary.appendChild(img);
				updateProgress(2, imageURLList.length);

				// Load the third image
				return loadImage(imageURLList[2]);
			})
			.then((img) => {
				// Add the third image
				galary.appendChild(img);
				updateProgress(3, imageURLList.length);

				console.log("All images have successfully loaded!");
			})
			.catch((error) => {
				console.error(error);
				alert("An error occured while loading the images.");
			});
	}

	// Event listener voor de load button
	loadButton.addEventListener("click", loadGalary);
});
