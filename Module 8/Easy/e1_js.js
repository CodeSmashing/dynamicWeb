document.addEventListener("DOMContentLoaded", () => {
	const themeToggle = document.querySelector("#themeToggle");
	themeToggle.addEventListener("click", toggleTheme);

	function toggleTheme() {
		const currentTheme = localStorage.getItem("preference") || "dark";
		const themeOpposites = {
			dark: "light",
			light: "dark",
		};

		document.body.classList.replace(`${currentTheme}-theme`, `${themeOpposites[currentTheme]}-theme`);
		localStorage.setItem("preference", themeOpposites[currentTheme]);
	}
});
