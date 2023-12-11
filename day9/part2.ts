export {};
const fs = require("fs");
const inputArr: Array<Array<number>> = fs
	.readFileSync("./input.txt")
	.toString()
	.replace("\r")
	.split("\n")
	.map((line: string) => {
		return line.split(" ").map((num: string) => parseInt(num));
	});
console.log(
	inputArr
		.map((line) => getLastInSequence(line.reverse()))
		.reduce((a, b) => a + b, 0)
);
function getLastInSequence(array: Array<number>): number {
	console.log(array);
	if (
		array.reduce((a, b) => {
			return a && !(b !== 0);
		}, true)
	) {
		return 0;
	} else {
		return (
			array[array.length - 1] +
			getLastInSequence(
				array
					.map((num, index) => {
						if (index === 0) {
							return null;
						} else {
							return num - array[index - 1];
						}
					})
					.splice(1) as Array<number>
			)
		);
	}
}
