import * as fs from "fs";

let input: string = fs.readFileSync("../input.txt", "utf-8");
// let input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
let games: Array<string> = input.split("\n");
let validGames = games.map((game, index) => {
	let redArr = game.matchAll(/(\d*)(\sred)/g);
	let minRed = Array.from(redArr)
		.map((match) => {
			return match[1];
		})
		.reduce(
			(max, element) => (parseInt(element) > max ? parseInt(element) : max),
			0
		);
	let greenArr = game.matchAll(/(\d*)(\sgreen)/g);

	let minGreen = Array.from(greenArr)
		.map((match) => {
			return match[1];
		})
		.reduce(
			(max, element) => (parseInt(element) > max ? parseInt(element) : max),
			0
		);
	let blueArr = game.matchAll(/(\d*)(\sblue)/g);
	let minBlue = Array.from(blueArr)
		.map((match) => {
			return match[1];
		})
		.reduce(
			(max, element) => (parseInt(element) > max ? parseInt(element) : max),
			0
		);

	return minRed * minBlue * minGreen;
});
console.log(validGames.reduce((sum, element) => sum + element, 0));
