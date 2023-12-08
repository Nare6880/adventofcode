import * as fs from "fs";

let input: string = fs.readFileSync("../input.txt", "utf-8");
// let input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
let games: Array<string> = input.split("\n");
let validGames = games.map((game, index) => {
	let redArr = game.matchAll(/(\d*)(\sred)/g);
	for (let match of redArr) {
		if (parseInt(match[1]) > 12) return 0;
	}
	let greenArr = game.matchAll(/(\d*)(\sgreen)/g);
	for (let match of greenArr) {
		if (parseInt(match[1]) > 13) return 0;
	}
	let blueArr = game.matchAll(/(\d*)(\sblue)/g);
	for (let match of blueArr) {
		if (parseInt(match[1]) > 14) return 0;
	}
	return index + 1;
});
console.log(validGames.reduce((sum, element) => sum + element, 0));
