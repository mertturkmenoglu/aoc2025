import { Arr, defineAocModule, type Pos, readLines } from "@/lib";

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
	const areas: number[] = [];
	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines.length; j++) {
			const [x1, y1] = lines[i]!;
			const [x2, y2] = lines[j]!;

			const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
			if (isInside([x1, y1], [x2, y2], lines)) {
				areas.push(area);
			}
		}
	}

	return Arr.max(areas);
}

function isInside(p1: Pos, p2: Pos, polygon: Pos[]) {
	const xmin = Math.min(p1[0], p2[0]);
	const xmax = Math.max(p1[0], p2[0]);
	const ymin = Math.min(p1[1], p2[1]);
	const ymax = Math.max(p1[1], p2[1]);

	for (let i = 0; i < polygon.length; i++) {
		const [x1, y1] = polygon[i]!;
		const [x2, y2] = polygon[(i + 1) % polygon.length]!;

		if (y1 === y2) {
			if (
				ymin < y1 &&
				y1 < ymax &&
				((Math.min(x1, x2) <= xmin && xmin < Math.max(x1, x2)) ||
					(Math.min(x1, x2) < xmax && xmax <= Math.max(x1, x2)))
			) {
				return false;
			}
		} else if (x1 === x2) {
			if (
				xmin < x1 &&
				x1 < xmax &&
				((Math.min(y1, y2) <= ymin && ymin < Math.max(y1, y2)) ||
					(Math.min(y1, y2) < ymax && ymax <= Math.max(y1, y2)))
			) {
				return false;
			}
		} else {
			throw new Error("Not rectangular");
		}
	}

	return true;
}

export default defineAocModule({
	day: 9,
	exp1: 4_733_727_792,
	exp2: 1_566_346_198,
	sol1,
	sol2,
});
