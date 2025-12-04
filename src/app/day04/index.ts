/** biome-ignore-all lint/style/noNonNullAssertion: No need */
import {
	cardinalCoefs,
	defineAocModule,
	diagonalCoefs,
	type Matrix,
	Mtr,
	type Pos,
	readLines,
} from "@/lib";

const lines: string[] = readLines("day04/input.txt");
const coefs = [...cardinalCoefs, ...diagonalCoefs];
const M: Matrix<string> = lines.map((l) => l.split(""));

function sol1(): number {
	let counter = 0;

	traverse(M, () => counter++);

	return counter;
}

function sol2(): number {
	let totalCounter = 0;

	while (true) {
		const toBeRemoved: Pos[] = [];

		traverse(M, (pos) => toBeRemoved.push(pos));

		if (toBeRemoved.length === 0) {
			break;
		}

		for (const p of toBeRemoved) {
			Mtr.set(M, p, ".");
		}

		totalCounter += toBeRemoved.length;
	}

	return totalCounter;
}

function traverse(m: Matrix<string>, fn: (pos: Pos) => void): void {
	for (let i = 0; i < m.length; i++) {
		for (let j = 0; j < m[0]!.length; j++) {
			const el = Mtr.at(m, [i, j]);

			if (el !== "@") {
				continue;
			}

			let nc = 0;

			for (const [dr, dc] of coefs) {
				const neighbour = Mtr.$at(m, [i + dr, j + dc]);

				if (neighbour === "@") {
					nc++;
				}
			}

			if (nc < 4) {
				fn([i, j]);
			}
		}
	}
}

export default defineAocModule({
	day: 4,
	exp1: 1464,
	exp2: 8409,
	sol1,
	sol2,
});
