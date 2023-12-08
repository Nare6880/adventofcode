const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").split("\n");
let duration: number = parseInt(
	input[0]
		.slice(input[0].indexOf(":") + 1)
		.split(" ")
		.filter((element: string) => element !== "")
		.reduce((acc: string, element: string) => acc + element, "")
);
let record: number = parseInt(
	input[1]
		.slice(input[1].indexOf(":") + 1)
		.split(" ")
		.filter((element: string) => element !== "")
		.reduce((acc: string, element: string) => acc + element, "")
);

console.log(duration, record);
let numWays = 0;
for (let i = 0; i < duration; i++) {
	if ((duration - i) * i > record) {
		numWays++;
	}
}
console.log(numWays);
