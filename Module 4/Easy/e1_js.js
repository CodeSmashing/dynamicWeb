"use strict";

const outputElement = document.querySelector("#output");
const studentList = [
	new Student("Bob", 21, [
		"World History: Ancient Civilizations", 
		"Digital Marketing Strategies", 
		"Calculus II: Integration Techniques", 
		"Creative Writing Workshop"
	]),
	new Student("Tim", 23, {
		"Quantum Physics: Theory and Applications": "N/A",
		"Business Law and Ethics": 52,
		"Digital Photography Techniques": 234,
		"Human Anatomy and Physiology": 12,
		"Cybersecurity Fundamentals": "N/A",
	}),
];

console.log("Average of student 1: ", studentList[0].average());
studentList[0].addScore("Calculus II: Integration Techniques", 14);
studentList[0].addScore("World History: Ancient Civilizations", 1945);
studentList[0].addScore(0, 1945); // Meant to not set anything
console.log("New average of student 1: ", studentList[0].average());

console.log("Average of student 2: ", studentList[1].average());
studentList[1].addScore("Quantum Physics: Theory and Applications", 32);
console.log("New average of student 2: ", studentList[1].average());

outputElement.replaceChildren();
for (const student of studentList) {
	outputElement.appendChild(student.showReport());
}
