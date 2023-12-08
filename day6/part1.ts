export {};
const fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8").split("\n");
let durationArr: Array<number> = input[0]
	.slice(input[0].indexOf(":") + 1)
	.split(" ")
	.filter((element: string) => element !== "")
	.map((element: string) => parseInt(element));
let record: Array<number> = input[1]
	.slice(input[1].indexOf(":") + 1)
	.split(" ")
	.filter((element: string) => element !== "")
	.map((element: string) => parseInt(element));
console.log(durationArr, record);
let raceCombos = durationArr.map((element, index) => {
	let numWays = 0;
	for (let i = 0; i < element; i++) {
		if ((durationArr[index] - i) * i > record[index]) {
			numWays++;
		}
	}
	return numWays;
});
console.log(raceCombos.reduce((a, b) => a * b, 1));
