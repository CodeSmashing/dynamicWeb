"use strict";
function handleButton() {
	const button = document.querySelector('button');
	let htmlText = button.textContent;
	
	if (htmlText == 'Hallo!') button.textContent = 'Tot ziens!';
	if (htmlText == 'Tot ziens!') button.textContent = 'Hallo!';
}
