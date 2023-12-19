export {};
const fs = require("fs");
const inputArr: Array<string> = fs
	.readFileSync("input.txt")
	.toString()
	.replaceAll("\r", "")
	.split("\n")
	.filter((x: string) => x.length > 0);
let seedsLine: string = inputArr.shift()!;
let seeds = seedsLine
	.slice(seedsLine.indexOf(":") + 2)
	.split(" ")
	.filter((element) => element !== " ")
	.map((x) => parseInt(x));

let mappings: Record<string, string> = {};
let mappingsToRanges: Record<string, Array<Array<string>>> = {};
let currentKey: string = "";
inputArr.forEach((line) => {
	if (line.indexOf(":") !== -1) {
		let [key, value] = line.split("-to-");
		value = value.slice(0, value.indexOf(" "));
		mappings[key] = value;
		currentKey = value;
	} else {
		if (mappingsToRanges[currentKey] === undefined) {
			mappingsToRanges[currentKey] = [];
			let [start, number, out] = line.split(" ");
			mappingsToRanges[currentKey].push([
				start + " " + (parseInt(start) + parseInt(out) - 1).toString(),
				number + " " + (parseInt(number) + parseInt(out) - 1).toString(),
			]);
		} else {
			let [start, number, out] = line.split(" ");
			mappingsToRanges[currentKey].push([
				start + " " + (parseInt(start) + parseInt(out) - 1).toString(),
				number + " " + (parseInt(number) + parseInt(out) - 1).toString(),
			]);
		}
	}
});
mappings["location"] = "done";
console.log(mappings);
console.log(mappingsToRanges);
console.log(seeds);
for (let i = 0; i < seeds.length; i++) {
	seeds[i] = mapSeed(seeds[i]);
}
console.log(Math.min(...seeds));
function mapSeed(seed: number): number {
	currentKey = "soil";
	console.log(seed);
	while (currentKey !== "done") {
		let found = false;
		if (mappingsToRanges[currentKey] !== undefined) {
			mappingsToRanges[currentKey]!.forEach((mapping) => {
				let [value, range] = mapping;
				let [start, end] = range.split(" ");
				if (seed >= parseInt(start) && seed <= parseInt(end) && !found) {
					found = true;
					currentKey = mappings[currentKey];
					seed = seed - parseInt(start) + parseInt(value.split(" ")[0]);
					console.log("current:", seed);
				}
			});
		} else console.log(currentKey);
		if (!found) {
			currentKey = mappings[currentKey];
		}
	}
	return seed;
}
