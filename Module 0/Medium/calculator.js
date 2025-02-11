"use strict";

const input1 = document.querySelector("#number1");
const input2 = document.querySelector("#number2");
const button = document.querySelector("#calculate");
const paragraf = document.querySelector("#result");

button.addEventListener("click", () => {
	if (isNaN(input1.value) || isNaN(input2.value)) {
		input1.textContent = "";
		input2.textContent = "";
		paragraf.textContent = "Voer alstublieft geldige getallen in.";
		return;
	} else {
		try {
			const number1 = parseInt(input1.value);
			const number2 = parseInt(input2.value);

			paragraf.textContent = `${number1} + ${number2} = ${number1 + number2}`;
		} catch (error) {
			input1.textContent = "";
			input2.textContent = "";

			paragraf.textContent = "Iets onverwachts is gebeurd, gelieve geldige getallen in te voeren: " + error;
		}
	}
});
