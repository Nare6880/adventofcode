export {};
let fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf-8");
let cards: Array<string> = input.split("\n");
let scores: Array<number> = cards.map((card) => {
	card = card.slice(card.indexOf(":") + 1)!;
	console.log(card);
	let cardArr = card.split("|");
	let cardNumsString = cardArr[0];
	let winningNums = cardArr[1].replace("\r", "").split(" ");
	console.log(winningNums);
	let cardNums: Array<string> = cardNumsString!.split(" ");
	cardNums = cardNums.filter((num) => num !== "");
	winningNums = winningNums.filter((num) => num !== "");
	console.log(cardNums);
	let scorePower = 0;
	cardNums.forEach((num) => {
		if (winningNums.indexOf(num) !== -1) {
			scorePower++;
		}
	});
	return scorePower;
});
let cardNumArr: Array<number> = [];
for (let i = scores.length - 1; i >= 0; i--) {
	let numCards = 1;
	for (let j = 0; j < scores[i]; j++) {
		numCards += cardNumArr[j];
	}
	cardNumArr.unshift(numCards);
}
console.log(cardNumArr.reduce((a, b) => a + b, 0));
