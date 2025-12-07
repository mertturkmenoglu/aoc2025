import { defineAocModule, type Matrix, Mtr, readLines } from "@/lib";

const mtr = readLines("day07/input.txt").map((l) =>
	l.split(""),
) as Matrix<string>;

function sol1(): number {
	let splits = 0;

	// Add first bean
	Mtr.set(mtr, [1, mtr[0]!.indexOf("S")], "|");

	for (let r = 0; r < mtr.length; r++) {
		for (let c = 0; c < mtr[r]!.length; c++) {
			const cell = Mtr.at(mtr, [r, c]);

			if (cell === "|") {
				// Get the bottom cell
				const bottom = Mtr.$at(mtr, [r + 1, c]);
				// If the bottom is a splitter, split
				if (bottom === "^") {
					// Create two beans
					// Check boundaries
					if (Mtr.isOnGrid(mtr, [r + 1, c - 1])) {
						Mtr.set(mtr, [r + 1, c - 1], "|");
					}
					if (Mtr.isOnGrid(mtr, [r + 1, c + 1])) {
						Mtr.set(mtr, [r + 1, c + 1], "|");
					}
					splits += 1;
				} else if (bottom === ".") {
					// else if the bottom is empty '.' char, replace with bean
					Mtr.set(mtr, [r + 1, c], "|");
				}
			}
		}
	}

	return splits;
}

function sol2(): number {
	return 0;
}

export default defineAocModule({
	day: 7,
	exp1: 0,
	exp2: 0,
	sol1,
	sol2,
});
