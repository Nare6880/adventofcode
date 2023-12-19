import { get } from "http";

export {};
const fs = require("fs");
const inputArr: Array<string> = fs
	.readFileSync("./test.txt")
	.toString()
	.replaceAll("\r", "")
	.split("\n");

console.log(inputArr);
let lines = inputArr.map((line) => {
	return line.split(" ");
});
lines.forEach((line) => {
	let brokenSprings = line[1].split(",").map((x) => parseInt(x));
	console.log(getLinePerms(line[0], brokenSprings));
});

function getLinePerms(
	input: String,
	brokenSprings: Array<number>,
	inContiguousBlock: boolean = false,
	currentString: string = ""
): number {
	if (input.length == 0) return 1;
	let firstChar = input[0];
	let remainingInput = input.slice(1);
	console.log(currentString);
	if (firstChar === "?") {
		let brokenSpringsBroken = [...brokenSprings];
		brokenSpringsBroken[0] -= 1;
		if (brokenSpringsBroken[0] === 0) brokenSpringsBroken.shift();
		getLinePerms(
			remainingInput,
			brokenSpringsBroken,
			false,
			currentString + "#"
		);
		getLinePerms(remainingInput, brokenSprings, true, currentString + ".");
	}

	return 0;
}
