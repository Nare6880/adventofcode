import * as fs from "fs";

let input: string = fs.readFileSync("./input.txt", "utf-8");
let lineLength = input.indexOf("\n");
input = input.replace(/\n/g, "");
let numbers: IterableIterator<RegExpMatchArray> = input.matchAll(/(\d*)+/g);
let symbols: IterableIterator<RegExpMatchArray> = input.matchAll(/(\*)/g);
let numbersArr: Array<any> = Array.from(numbers).filter(
	(element) => element[0] !== ""
);
let symbolsArr: Array<any> = Array.from(symbols).filter(
	(element) => element[0] !== ""
);
let gearRecords: Record<number, Array<number>> = {};
numbersArr.forEach((element) => {
	let linePositions: Array<number> = Array.from(element[0]).map(
		(char, index: number) => {
			char = char;
			return element.index + index;
		}
	);
	//check if above or bellow is symbol
	let hasAdded = false;
	linePositions.forEach((position: number) => {
		let gear = symbolsArr.find(
			(symbol) =>
				symbol.index === position - lineLength ||
				symbol.index === position + lineLength ||
				symbol.index === position + (lineLength + 1) ||
				symbol.index === position + (lineLength - 1) ||
				symbol.index === position - (lineLength + 1) ||
				symbol.index === position - (lineLength - 1) ||
				(position % lineLength !== 0 && symbol.index === position - 1) ||
				(position % lineLength !== lineLength - 1 &&
					symbol.index === position + 1)
		);

		if (gear && !hasAdded) {
			{
				if (gearRecords[gear.index]) {
					gearRecords[gear.index].push(parseInt(element[0]));
				} else {
					gearRecords[gear.index] = [parseInt(element[0])];
				}
				hasAdded = true;
			}
		}
	});
});

console.log(gearRecords);
console.log(
	Object.values(gearRecords).filter((element) => element.length === 2)
);
