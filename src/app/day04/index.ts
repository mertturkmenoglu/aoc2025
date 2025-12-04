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

function sol1(): number {
	const m: Matrix<string> = lines.map((l) => l.split(""));
	let counter = 0;
	const coefs = [...cardinalCoefs, ...diagonalCoefs];

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
				counter++;
			}
		}
	}

	return counter;
}

function sol2(): number {
	const m: Matrix<string> = lines.map((l) => l.split(""));
	let flag = true;
	const coefs = [...cardinalCoefs, ...diagonalCoefs];
	let totalCounter = 0;

	while (flag) {
		const toBeRemoved: Pos[] = [];

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
					toBeRemoved.push([i, j]);
				}
			}
		}

		if (toBeRemoved.length === 0) {
			flag = false;
		} else {
			for (const p of toBeRemoved) {
				Mtr.set(m, p, ".");
			}
		}

		totalCounter += toBeRemoved.length;
	}

	return totalCounter;
}

export default defineAocModule({
	day: 4,
	exp1: 1464,
	exp2: 0,
	sol1,
	sol2,
});
