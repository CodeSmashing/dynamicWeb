import { createElement, getData } from "/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
	const MAX_BODY_LENGTH = 100;
	const EMPTY_MESSAGE = "Geen posts gevonden.";
	const FETCH_ERROR_MESSAGE = "Er is een fout opgetreden bij het ophalen van de posts.";
	const outputContainer = document.querySelector("#posts-container");
	const inputTitle = document.querySelector("#zoekterm");
	const inputSort = document.querySelector("#sorteer");
	const inputLimit = document.querySelector("#limiet");
	const inputButton = document.querySelector("#toepassen");
	const urlString = "https://jsonplaceholder.typicode.com/posts";
	const defaultEmpty = createElement("p", { classList: ["geen-resultaten"] });
	const postList = await fetchPosts(urlString);

	inputTitle.value = "";
	inputButton.addEventListener("click", handleButton);
	window.onscroll = extendOutputContainer;

	async function fetchPosts(url) {
		try {
			defaultEmpty.textContent = EMPTY_MESSAGE;
			return await getData(url);
		} catch (error) {
			defaultEmpty.textContent = FETCH_ERROR_MESSAGE;
			return [];
		}
	}

	function extendOutputContainer() {
		if (isInViewport(outputContainer.lastChild)) {
			let counter = 0;
			for (const post of postList) {
				if (counter >= getPostLimit()) break;
				if (outputContainer.contains(post.card) || !post.isDisplayed) continue;
				outputContainer.appendChild(post.card);
				counter++;
			}
		}
	}

	function getPostLimit() {
		const limit = parseInt(inputLimit.value);
		return isNaN(limit) || limit < 1 ? 10 : limit; // Default to 10 if invalid
	}

	// https://phuoc.ng/collection/intersection-observer-with-react/check-if-an-element-is-visible-in-the-viewport/
	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	function initializePostList() {
		for (const post of postList) {
			const card = (post["card"] = document.createElement("article"));
			let bodyText = post.body.charAt(0).toUpperCase() + post.body.slice(1);
			bodyText = bodyText.length > MAX_BODY_LENGTH ? bodyText.substring(0, MAX_BODY_LENGTH) + "..." : bodyText;

			card.setAttribute("id", `post-${post.id}`);
			card.classList.add("post");
			card.dataset.userId = `user-${post.userId}`;
			card.appendChild(createElement("h2", { textContent: post.title.toUpperCase(), classList: ["post-titel"] }));
			card.appendChild(createElement("section", { textContent: bodyText, classList: ["post-body"] }));
			card.appendChild(createElement("section", { textContent: `Post ID: ${post.id}; User ID: ${post.userId}`, classList: ["post-info"] }));
			post["isDisplayed"] = true;
		}

		updateOutput();
	}

	function handleButton() {
		for (const post of postList) {
			if (post.title.toLowerCase().includes(inputTitle.value.toLowerCase()) || inputTitle.value.length === 0) {
				post.isDisplayed = true;
			} else {
				post.isDisplayed = false;
			}
		}

		switch (inputSort.value) {
			case "titel-oplopend":
				postList.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "titel-aflopend":
				postList.sort((a, b) => b.title.localeCompare(a.title));
				break;
			case "id-oplopend":
				postList.sort((a, b) => a.id - b.id);
				break;
			case "id-aflopend":
				postList.sort((a, b) => a.id - b.id);
				break;
			default:
				console.warn(`Failed to sort, unrecognized case: ${inputSort.value}`);
				break;
		}

		updateOutput();
	}

	/**
	 * Updates the output container with filtered and sorted posts.
	 * Displays an empty message if no posts match the criteria.
	 */
	function updateOutput() {
		outputContainer.replaceChildren();

		// Early return if postList isn't defined or if no post has the property isDisplayed set to true
		if (postList === undefined || !postList.map((post) => post.isDisplayed).includes(true)) {
			outputContainer.appendChild(defaultEmpty);
			return;
		}

		// Append posts which matched the criteria up to the limit
		for (const post of postList) {
			if (outputContainer.childNodes.length >= getPostLimit()) break;
			if (post.isDisplayed) outputContainer.appendChild(post.card);
		}
	}

	initializePostList();
});
