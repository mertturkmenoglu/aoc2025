import { defineAocModule, type Pos, Range, readByEmptyLine } from "@/lib";

const [group1, group2] = readByEmptyLine("day05/input.txt") as [
	string[],
	string[],
];

const ranges = group1
	.map((line) => line.split("-").map(Number) as Pos)
	.sort((a, b) => a[0] - b[0]);

function sol1(): number {
	const ids = group2.map(Number);

	let freshCounter = 0;

	for (const id of ids) {
		if (ranges.some(([a, b]) => id >= a && id <= b)) {
			freshCounter++;
		}
	}

	return freshCounter;
}

function sol2(): number {
	const merged = Range.merge(ranges);

	let counter = 0;

	for (const range of merged) {
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
