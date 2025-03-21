document.addEventListener("DOMContentLoaded", () => {
	const themeToggleButton = document.querySelector("#themeToggle");
	themeToggleButton.addEventListener("click", toggleTheme);

	function toggleTheme() {
		const themePreference = localStorage.getItem("preference") || "dark";
		const themeOpposites = {
			dark: "light",
			light: "dark",
		};

		document.body.className = `${themeOpposites[themePreference]}-theme`;
		themeToggleButton.textContent = `Schakel naar ${themeOpposites[themePreference] === "dark" ? "Licht" : "Donker"} thema`;
		localStorage.setItem("preference", themeOpposites[themePreference]);
	}

	function loadTheme() {
		const themePreference = localStorage.getItem("preference") || "dark";

		document.body.className = `${themePreference}-theme`;
		themeToggleButton.textContent = `Schakel naar ${themePreference === "dark" ? "Licht" : "Donker"} thema`;
	}

	loadTheme();
});
