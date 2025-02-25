"use strict";

const makeOrder = (drink = "cola", snack = "chips") => {
	return { drink, snack, timestamp: new Date().toUTCString() };
};
const outputField = document.querySelector("#output");
const orderList = [makeOrder(), makeOrder("fanta"), makeOrder("sprite", "nootjes")];
let htmlString = `
<tr>
	<th></th>
	<th>Drink</th>
	<th>Snack</th>
	<th>Timestamp</th>
</tr>`;

orderList.forEach((order, index) => {
	htmlString += `
	<tr>
		<td><p>Order ${index + 1}:</p></td>
		<td><p>${order.snack}</p></td>
		<td><p>${order.snack}</p></td>
		<td><p>${order.timestamp}</p></td>
	</tr>`;
	console.log(order);
});

outputField.innerHTML = htmlString;
