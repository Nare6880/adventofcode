export {};
const fs = require("fs");
let inputArr: Array<String> = fs
	.readFileSync("./input.txt")
	.toString()
	.replaceAll("\r", "")
	.split("\n");
console.log(inputArr.length, inputArr[0].length);
function expandSpace(input: Array<String>): Array<Array<number>> {
	let emptyRow: Array<number> = [];
	for (let i = 0; i < input.length; i++) {
		if (input[i].indexOf("#") === -1) {
			emptyRow.push(i);
		}
	}
	let emptyColumn: Array<number> = [];
	for (let i = 0; i < input[0].length; i++) {
		let column = input.map((row) => row[i]).join("");
		if (column.indexOf("#") === -1) {
			emptyColumn.push(i);
		}
	}

	return [emptyRow, emptyColumn];
}

console.log(inputArr.length, inputArr[0].length);
//@ts-nocheck
function getGalaxies(input: Array<String>): Array<Array<number>> {
	let galaxiesPositions: Array<Array<number>> = [];
	input.forEach((row, rowIndex) => {
		Array.from(row.matchAll(/#/g)).forEach((match) => {
			galaxiesPositions.push([rowIndex, match.index!]);
		});
	});
	return galaxiesPositions;
}
function getGalaxyPerms(
	galaxies: Array<Array<number>>
): Array<Array<Array<number>>> {
	let perms: Array<Array<Array<number>>> = [];
	for (let i = 0; i < galaxies.length; i++) {
		for (let j = i; j < galaxies.length; j++) {
			if (i !== j) {
				perms.push([galaxies[i], galaxies[j]]);
			}
		}
	}
	return perms;
}
const spaceExpansionArr = expandSpace(inputArr);
console.log(spaceExpansionArr);
console.log(
	getGalaxyPerms(getGalaxies(inputArr)).reduce((a, b) => {
		return a + getDistanceBetweenPoints(b, spaceExpansionArr);
	}, 0)
);

function getDistanceBetweenPoints(
	galaxyPair: Array<Array<number>>,
	spaceExpansionArr: Array<Array<number>>
): number {
	let numColExpansions = spaceExpansionArr[1].filter((num) => {
		return (
			num >= Math.min(galaxyPair[0][1], galaxyPair[1][1]) &&
			num <= Math.max(galaxyPair[0][1], galaxyPair[1][1])
		);
	}).length;
	let numRowExpansions = spaceExpansionArr[0].filter((num) => {
		return (
			num >= Math.min(galaxyPair[0][0], galaxyPair[1][0]) &&
			num <= Math.max(galaxyPair[0][0], galaxyPair[1][0])
		);
	}).length;
	return (
		1000000 * numRowExpansions +
		Math.abs(galaxyPair[0][0] - galaxyPair[1][0]) -
		numRowExpansions +
		(1000000 * numColExpansions +
			Math.abs(galaxyPair[0][1] - galaxyPair[1][1]) -
			numColExpansions)
	);
}
