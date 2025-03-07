document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.querySelector("#startButton");
	const rgbArray = window
		.getComputedStyle(document.body, null)
		.getPropertyValue("background-color")
		.replace(/[^\d\s]+/g, "")
		.split(" ");
	const rgbObj = {
		r: { value: rgbArray[0], isAdding: true },
		g: { value: rgbArray[1], isAdding: true },
		b: { value: rgbArray[2], isAdding: true },
	};

	function changeColor() {
		setTimeout(() => {
			const { r, g, b } = rgbObj;
			updateColor(r);
			updateColor(g);
			updateColor(b);

			document.body.style.backgroundColor = `rgb(${r.value}, ${g.value}, ${b.value})`;
			changeColor();
		}, 50);
	}

	function updateColor(color) {
		if (color.isAdding) {
			color.value < 255 ? color.value++ : (color.isAdding = false);
		} else {
			color.value > 0 ? color.value-- : (color.isAdding = true);
		}
	}

	startButton.addEventListener("click", changeColor);
});
