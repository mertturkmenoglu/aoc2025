import { defineAocModule, type Pos, readLines } from "@/lib";

const lines = readLines("day09/input.txt").map(
	(l) => l.split(",").map(Number) as Pos,
);

function sol1(): number {
	let area = -1;

	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines.length; j++) {
			const [x1, y1] = lines[i]!;
			const [x2, y2] = lines[j]!;

			const newArea = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);

			if (newArea > area) {
				area = newArea;
			}
		}
	}

	return area;
}

function sol2(): number {
	return 0;
}

export default defineAocModule({
	day: 9,
	exp1: 0,
	exp2: 0,
	sol1,
	sol2,
});
