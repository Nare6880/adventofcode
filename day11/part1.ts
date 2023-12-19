export {};
const fs = require("fs");
let inputArr: Array<String> = fs
	.readFileSync("./input.txt")
	.toString()
	.replaceAll("\r", "")
	.split("\n");
console.log(inputArr.length, inputArr[0].length);
function expandSpace(input: Array<String>): Array<String> {
	const horizonalLine = new Array(input[0].length + 1).join(".");
	for (let i = 0; i < input.length; i++) {
		if (input[i].indexOf("#") === -1) {
			input = input
				.splice(0, i)
				.concat(horizonalLine)
				.concat([...input]);
			i++;
		}
	}
	for (let i = 0; i < input[0].length; i++) {
		let column = input.map((row) => row[i]).join("");
		if (column.indexOf("#") === -1) {
			input = input.map((row) =>
				row.slice(0, i).concat(".").concat(row.slice(i))
			);
			i++;
		}
	}
	return input;
}
inputArr = expandSpace(inputArr);
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
console.log(
	getGalaxyPerms(getGalaxies(inputArr)).reduce((a, b) => {
		return a + getDistanceBetweenPoints(b);
	}, 0)
);
function getDistanceBetweenPoints(galaxyPair: Array<Array<number>>): number {
	return (
		Math.abs(galaxyPair[0][0] - galaxyPair[1][0]) +
		Math.abs(galaxyPair[0][1] - galaxyPair[1][1])
	);
}
