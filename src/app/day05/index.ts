import { defineAocModule, type Pos, readByEmptyLine } from "@/lib";

const [group1, group2] = readByEmptyLine("day05/input.txt");

function sol1(): number {
	const ranges = group1!.map((line) => line.split("-").map(Number) as Pos);
	const ids = group2!.map(Number);

	let freshCounter = 0;

	for (const id of ids) {
		let bad = true;
		for (const [a, b] of ranges) {
			if (id >= a && id <= b) {
				bad = false;
				break;
			}
		}
		if (!bad) {
			freshCounter++;
		}
	}

	return freshCounter;
}

function sol2(): number {
	const ranges = group1!.map((line) => line.split("-").map(Number) as Pos);

	const sorted = ranges.sort((a, b) => a[0] - b[0]);

	const res: Pos[] = [];

	for (let i = 0; i < sorted.length; i++) {
		const start = ranges[i]![0]!;
		let end = ranges[i]![1]!;

		if (res.length > 0 && res[res.length - 1]![1] >= end) {
			continue;
		}

		for (let j = i + 1; j < sorted.length; j++) {
			if (ranges[j]![0]! <= end) {
				end = Math.max(end, ranges[j]![1]!);
			}
		}

		res.push([start, end]);
	}

	let counter = 0;

	for (const range of res) {
		counter += range[1] - range[0] + 1;
	}

	return counter;
}

export default defineAocModule({
	day: 5,
	exp1: 756,
	exp2: 355555479253787,
	sol1,
	sol2,
});
