import { Arr, defineAocModule, type Pos, readLines } from "@/lib";

const lines: string[] = readLines("day02/input.txt");

function sol1(): number {
	const ranges = lines[0]!
		.split(",")
		.map((part) => part.split("-").map((x) => +x) as Pos);

	let sum = 0;

	for (const [start, end] of ranges) {
		for (let i = start; i <= end; i++) {
			const str = `${i}`;
			if (str.length % 2 !== 0) {
				continue;
			}
			const first = str.slice(0, str.length / 2);
			const second = str.slice(str.length / 2);

			if (first === second) {
				sum += i;
			}
		}
	}

	return sum;
}

function sol2(): number {
	const ranges = lines[0]!
		.split(",")
		.map((part) => part.split("-").map((x) => +x) as Pos);

	let sum = 0;

	for (const [start, end] of ranges) {
		for (let i = start; i <= end; i++) {
			const str = `${i}`;
			const mid = Math.floor(str.length / 2);

			for (let j = 1; j <= mid; j++) {
				const chunks = Arr.chunk(str.split(""), j).map((chunk) =>
					chunk.join(""),
				);
				if (chunks.every((chunk) => chunk === chunks[0])) {
					sum += i;
					break;
				}
			}
		}
	}

	return sum;
}

export default defineAocModule({
	day: 2,
	exp1: 21898734247,
	exp2: 28915664389,
	sol1,
	sol2,
});
