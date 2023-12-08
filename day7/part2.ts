export {};
let fs = require("fs");
let input: string = fs.readFileSync("./input.txt", "utf-8");
let inputArr: Array<string> = input.replace("\r", "").split("\n");
const cards: Array<string> = [
	"J",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"T",
	"Q",
	"K",
	"A",
];
let game = inputArr.map((line) => {
	return line.split(" ");
});

let gameDict: Array<Array<number | Array<number>>> = [];
game.forEach((element, index) => {
	let numOfEachCard: Array<number> = [];
	cards.forEach((card) => {
		numOfEachCard.push(
			Array.from(element[0].matchAll(new RegExp(card, "g"))).length
		);
	});
	if (numOfEachCard[0] !== 0) {
		let numOfJokers = numOfEachCard.splice(0, 1)[0];
		numOfEachCard[numOfEachCard.indexOf(Math.max(...numOfEachCard))] +=
			numOfJokers;
	}

	gameDict.push([
		index,
		numOfEachCard.filter((num) => num !== 0).sort((a, b) => b - a),
	]);
});
console.log(gameDict);
gameDict.sort((a, b) => {
	let index = 0;
	while (
		(a[1] as Array<number>)[index] === (b[1] as Array<number>)[index] &&
		index < (a[1] as Array<number>).length &&
		index < (b[1] as Array<number>).length
	) {
		index++;
	}
	if (index > (a[1] as Array<number>).length) {
		return -1;
	} else if (index > (b[1] as Array<number>).length) {
		return 1;
	} else if (
		index === (a[1] as Array<number>).length &&
		index === (b[1] as Array<number>).length
	) {
		for (let i = 0; i < 5; i++) {
			if (
				cards.indexOf(game[a[0] as number][0][i]) !==
				cards.indexOf(game[b[0] as number][0][i])
			) {
				return (
					cards.indexOf(game[a[0] as number][0][i]) -
					cards.indexOf(game[b[0] as number][0][i])
				);
			}
		}
		return 0;
	}
	return (a[1] as Array<number>)[index] - (b[1] as Array<number>)[index];
});
console.log(gameDict);
gameDict.reverse();
console.log(
	gameDict.reduce((sum, element, index) => {
		return (
			sum + (gameDict.length - index) * parseInt(game[element[0] as number][1])
		);
	}, 0)
);
