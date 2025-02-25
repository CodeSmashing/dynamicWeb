"use strict"

const inputMessage = document.querySelector("#inputText");
const outputTweet = document.querySelector("#tweetOutput");
const outputPost = document.querySelector("#postOutput");
const outputCombo = document.querySelector("#comboOutput");

const formatTweet = text => text.length > 20 ? text.substring(0, 20) + "..." : text;
const formatPost = text => `${text} #awesome`;
const formatMessage = text => formatTweet(formatPost(text));

function formatText() {
	if (inputMessage.value === "") return alert("You will need to fill in the text area.");
	const text = inputMessage.value;

	outputTweet.textContent = formatTweet(text);
	outputPost.textContent = formatPost(text);
	outputCombo.textContent = formatMessage(text);
}
