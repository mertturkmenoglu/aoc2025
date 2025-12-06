import { Arr, defineAocModule, Mtr, readLines } from "@/lib";

const lines = readLines("day06/input.txt").map((l) => l.trim().split(/ +/));

function sol1(): number {
	const cols = lines[0]!.length;
	let grand = 0;

	for (let i = 0; i < cols; i++) {
		const col = Mtr.col(lines, i);
		const numbers = col.slice(0, col.length - 1).map(Number);
		const op = col.at(-1)!;
		let acc = op === "+" ? 0 : 1;

		for (const num of numbers) {
			acc = op === "+" ? acc + num : acc * num;
		}

		grand += acc;
	}

	return grand;
}

function sol2(): number {
	let original = readLines("day06/input.txt");
	const colsCount = lines[0]!.length;

	let grand = 0;

	for (let i = 0; i < colsCount; i++) {
		const col = Mtr.col(lines, i);
		const max = Arr.max(col.map((x) => x.length));
		const values = original.map((line) =>
			line.slice(0, max).replaceAll(" ", "0"),
		);

		const numbers = values.slice(0, values.length - 1);
		const op = values.at(-1)!.replaceAll("0", "");

		let acc = op === "+" ? 0 : 1;

		const nums: number[] = [];

		for (let j = 0; j < max; j++) {
			const a = numbers
				.map((x) => x[j]!)
				.join("")
				.replaceAll("0", "");
			nums.push(+a);
		}

		for (const num of nums) {
			acc = op === "+" ? acc + num : acc * num;
		}

		grand += acc;

		original = original.map((x) => x.slice(max + 1));
	}

	return grand;
}

export default defineAocModule({
	day: 6,
	exp1: 6_957_525_317_641,
	exp2: 13_215_665_360_076,
	sol1,
	sol2,
});
