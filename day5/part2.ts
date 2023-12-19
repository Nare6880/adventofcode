export {};
const fs = require("fs");
const inputArr: Array<string> = fs
	.readFileSync("input.txt")
	.toString()
	.replaceAll("\r", "")
	.split("\n")
	.filter((x: string) => x.length > 0);
let seedsLine: string = inputArr.shift()!;
let seedsArr = seedsLine
	.slice(seedsLine.indexOf(":") + 2)
	.split(" ")
	.filter((element) => element !== " ")
	.map((x) => parseInt(x));
let starts = seedsArr.filter((x, index) => index % 2 === 0);
let seeds: Array<Array<number>> = [];
seeds.push([]);
let ranges = seedsArr.filter((x, index) => index % 2 === 1);
for (let i = 0; i < starts.length; i++) {
	for (let j = starts[i]; j < starts[i] + ranges[i]; j++) {
		if (seeds[seeds.length - 1].length === 15000000) {
			console.log("yeet");
			seeds.push([]);
		}
		seeds[seeds.length - 1].push(j);
	}
}
console.log(seeds.reduce((acc, val) => acc + val.length, 0));

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
console.log(seeds.reduce((acc, val) => acc + val.length, 0));
// for (let i = 0; i < seeds.length; i++) {
// 	console.log(i / seeds.length);
// 	seeds[i] = mapSeed(seeds[i]);
// }
// console.log(Math.min(...seeds));
let minSeedArr: Array<number> = [];
for (let i = 0; i < seeds.length; i++) {
	let minSeed = seeds[i][0];
	seeds[i].forEach((seed) => {
		let current = mapSeed(seed);
		if (current < minSeed) minSeed = current;
	});
	console.log((i / seeds.length) * 100);
	seeds[i].pop();
	i--;
}
console.log(Math.min(...minSeedArr));
function mapSeed(seed: number): number {
	currentKey = "soil";
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
				}
			});
		}
		if (!found) {
			currentKey = mappings[currentKey];
		}
	}
	return seed;
}
