"use strict";

const button = document.querySelector("#themaKnop");
const metaElement = document.querySelector('meta[name="color-scheme"]');

button.addEventListener("click", () => {
	if (metaElement.getAttribute("content") == "light") {
		metaElement.setAttribute("content", "dark");
	} else {
		metaElement.setAttribute("content", "light");
	}
});
