import * as fs from "fs";
const numbers = {
	zero: 0,
	"0": 0,
	one: 1,
	"1": 1,
	two: 2,
	"2": 2,
	three: 3,
	"3": 3,
	four: 4,
	"4": 4,
	five: 5,
	"5": 5,
	six: 6,
	"6": 6,
	seven: 7,
	"7": 7,
	eight: 8,
	"8": 8,
	nine: 9,
	"9": 9,
};
let input: string = fs.readFileSync("./input.txt", "utf-8");
// let input = "sevenine";
console.log(input);
input = input.toLowerCase();
const Lines: Array<string> = input.split("\n");
console.log(Lines.length);
let nums = Lines.map((Line) => {
	let first = { index: Infinity, value: 0 };
	let last = { index: -1, value: 0 };
	(Object.keys(numbers) as (keyof typeof numbers)[]).forEach((key) => {
		let firstIndex = Line.indexOf(key);
		let lastIndex = Line.lastIndexOf(key);
		first =
			firstIndex >= 0 && firstIndex < first.index
				? { index: firstIndex, value: numbers[key] }
				: first;
		last =
			lastIndex >= 0 && lastIndex > last.index
				? { index: lastIndex, value: numbers[key] }
				: last;
		console.log(first, last, key);
	});

	return first.value * 10 + last.value;
});
console.log(nums);
let total = nums.reduce((sum, element) => {
	return sum + element;
}, 0);
console.log(total);
