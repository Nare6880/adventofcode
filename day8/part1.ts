export {};
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");
let adjacentcyMat: Record<string, Array<string>> = {};
let lines = input.split("\n");
let instructions = lines.splice(0, 1)[0].replace("\r", "").split("");
console.log(instructions);
lines.forEach((line: string) => {
	let nodeString = line.split(" ")[0];
	let connectedNodes = line
		.slice(line.indexOf("(") + 1)
		.replace(",", "")
		.replace(")", "")
		.replace("\r", "")
		.split(" ");
	adjacentcyMat[nodeString] = connectedNodes;
});
console.log(adjacentcyMat);
console.log(followDirectections(instructions, adjacentcyMat));
function followDirectections(
	instructions: Array<string>,
	adjacentcyMat: Record<string, Array<string>>
) {
	let currNode = "AAA";
	let stepCount = 0;
	while (currNode !== "ZZZ") {
		console.log(currNode);
		if (instructions[stepCount % instructions.length] === "L") {
			currNode = adjacentcyMat[currNode][0];
		} else {
			currNode = adjacentcyMat[currNode][1];
		}
		stepCount++;
	}
	return stepCount;
}
