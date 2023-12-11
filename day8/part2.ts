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
let ghostLocations: Array<string> = Object.keys(adjacentcyMat).filter(
	(element) => element[2] === "A"
);
console.log(instructions.length);
console.log(followDirectections(instructions, adjacentcyMat, ghostLocations));
function followDirectections(
	instructions: Array<string>,
	adjacentcyMat: Record<string, Array<string>>,
	ghostLocations: Array<string>
) {
	let stepCount = 0;
	var allGhost = true;
	let lastDestinationStep: Record<number, number> = {};
	while (stepCount == 0 || !allGhost) {
		allGhost = true;

		ghostLocations.forEach((location, index) => {
			ghostLocations[index] =
				instructions[stepCount % instructions.length] === "L"
					? adjacentcyMat[location][0]
					: adjacentcyMat[location][1];
			if (ghostLocations[index][2] === "Z") {
				console.log(index, stepCount - lastDestinationStep[index]!, stepCount);
				lastDestinationStep[index] = stepCount;
				allGhost = false;
			}
			allGhost = false;
		});
		stepCount++;
	}
	return stepCount;
}
