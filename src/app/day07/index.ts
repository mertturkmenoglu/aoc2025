import {
	defineAocModule,
	type Matrix,
	Mtr,
	type Pos,
	posAdd,
	posStr,
	readLines,
} from "@/lib";

const mtr = readLines("day07/input.txt").map((l) =>
	l.split(""),
) as Matrix<string>;

async function sol1() {
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

const memo = new Map<string, number>();

function paths(start: Pos): number {
	if (memo.has(posStr(start))) {
		return memo.get(posStr(start))!;
	}

	let result = 0;

	if (start[0] === mtr.length - 1) {
		result = 1;
	} else {
		const below = Mtr.$at(mtr, posAdd(start, [1, 0]));

		if (below === "^") {
			result = paths(posAdd(start, [1, -1])) + paths(posAdd(start, [1, 1]));
		} else {
			result = paths(posAdd(start, [1, 0]));
		}
	}

	memo.set(posStr(start), result);
	return result;
}

function sol2(): number {
	return paths([1, mtr[0]!.indexOf("S")]);
}

export default defineAocModule({
	day: 7,
	exp1: 1711,
	exp2: 36_706_966_158_365,
	sol1,
	sol2,
});
