import { DIR_TARGET } from "electron-builder";
import { get } from "http";

export {};
const fs = require("fs");
const inputArr = fs
	.readFileSync("./input.txt")
	.toString()
	.replaceAll("\r", "")
	.replaceAll("\n", "")
	.replaceAll("|", "║")
	.replaceAll("-", "═")
	.replaceAll("L", "╚")
	.replaceAll("J", "╝")
	.replaceAll("F", "╔")
	.replaceAll("7", "╗");
const LineLength = 140;
console.log(LineLength);
console.log(inputArr);
enum Direction {
	Up,
	Down,
	Left,
	Right,
}

let DirectionDictionary: Record<Direction, Array<String>> = {
	[Direction.Up]: ["S", "╚", "║", "╝"],
	[Direction.Down]: ["S", "╔", "║", "╗"],
	[Direction.Left]: ["S", "╗", "═", "╝"],
	[Direction.Right]: ["S", "╔", "═", "╚"],
};
let CharacterToDirections: Record<string, Array<Direction>> = {};
for (let key in DirectionDictionary) {
	let direction: Direction = key as unknown as Direction;
	for (let char of DirectionDictionary[direction]) {
		if (!CharacterToDirections[char as string])
			CharacterToDirections[char as string] = [];
		CharacterToDirections[char as string].push(direction);
	}
}
let indexOffset: Record<Direction, number> = {
	[Direction.Up]: -LineLength,
	[Direction.Down]: LineLength,
	[Direction.Left]: -1,
	[Direction.Right]: 1,
};
function getAdjacencyMatrix(input: string): Record<number, Array<number>> {
	let adjacencyMatrix: Record<number, Array<number>> = {};
	for (let i = 0; i < input.length; i++) {
		adjacencyMatrix[i] = [];
		if (input[i] !== ".") {
			let possibleDirections: Array<Direction> =
				CharacterToDirections[input[i]];
			for (let direction of possibleDirections) {
				if (input[i + indexOffset[direction]] !== ".") {
					if (adjacencyMatrix[i]) {
						adjacencyMatrix[i].push(i + indexOffset[direction]);
					} else {
						adjacencyMatrix[i] = [i + indexOffset[direction]];
					}
				}
			}
		}
	}
	return adjacencyMatrix;
}
function getFurthestDistance(
	adjacencyMatrix: Record<number, Array<number>>,
	startIndex: number
): number {
	let visited: Array<number> = [];
	let queue: Array<number> = [
		adjacencyMatrix[startIndex][0],
		adjacencyMatrix[startIndex][1],
		adjacencyMatrix[startIndex][2],
		adjacencyMatrix[startIndex][3],
	];

	let path: Record<number, Array<number>> = {};
	let distance: Record<number, number> = {};
	distance[startIndex] = 0;
	for (let element in queue) {
		distance[queue[element]] = 1;
	}
	path[startIndex] = [startIndex];
	while (queue.length > 0) {
		let current = queue.shift() as number;
		visited.push(current);
		for (let neighbor of adjacencyMatrix[current]!) {
			if (!visited.includes(neighbor)) {
				queue.push(neighbor);
				distance[neighbor] = distance[current] + 1;
			}
		}
	}
	fs.writeFileSync(
		"./path.txt",
		(
			"first" +
			(Object.values(path) as Array<Array<number>>).sort(
				(a, b) => b.length - a.length
			)[0] +
			"Second" +
			(Object.values(path) as Array<Array<number>>).sort(
				(a, b) => b.length - a.length
			)[1]
		).toString()
	);
	return Math.max(...Object.values(distance));
}
let adjacencyMatrix = getAdjacencyMatrix(inputArr);
console.log(adjacencyMatrix[inputArr.indexOf("S")]);
console.log(getFurthestDistance(adjacencyMatrix, inputArr.indexOf("S")));
const inputArr2 = fs
	.readFileSync("./input.txt")
	.toString()
	.replaceAll("|", "║")
	.replaceAll("-", "═")
	.replaceAll("L", "╚")
	.replaceAll("J", "╝")
	.replaceAll("F", "╔")
	.replaceAll("7", "╗");
console.log(inputArr2);
