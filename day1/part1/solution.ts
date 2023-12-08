import * as fs from "fs";

const input: string = fs.readFileSync("./input.txt", "utf-8");
// const input = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";
console.log(input);
const Lines: Array<string> = input.split("\n");
console.log(Lines.length);
let nums = Lines.map((Line) => {
	let tempArr = Line.split("").filter((element: String) => {
		return element >= "0" && element <= "9";
	});
	return tempArr[0] + tempArr[tempArr.length - 1];
});
console.log(nums);
let total = nums.reduce((sum, element) => {
	return sum + parseInt(element, 10);
}, 0);
console.log(total);
