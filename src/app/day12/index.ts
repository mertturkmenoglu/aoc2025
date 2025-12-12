import {
	defineAocModule,
	type Matrix,
	nums,
	type Pos,
	readByEmptyLine,
} from "@/lib";

type SH = Matrix<string>;
type RE = [Pos, number[]];

const groups = readByEmptyLine("day12/input.txt");

function parseInput(): [SH[], RE[]] {
	const shapes: Matrix<string>[] = [];
	const regions: [Pos, number[]][] = [];

	for (const group of groups) {
		const firstElement = group[0]!;

		if (/^\d{1}:/.test(firstElement)) {
			const [_discard, ...rest] = group;
			shapes.push(rest.map((x) => x.split("")));
		} else {
			for (const el of group) {
				const [fst, snd] = el.split(":").map((x) => x.trim());
				const [x, y] = fst!.split("x").map(Number);
				const arr = nums(snd!);
				regions.push([[x!, y!], arr]);
			}
		}
	}

	return [shapes, regions];
}

function canFit(region: RE, shapes: SH[]): boolean {
	const totalArea = region[0][0] * region[0][1];
	let occ = 0;

	for (let i = 0; i < region[1].length; i++) {
		const shape = shapes[i]!;
		const j = shape.map((x) => x.join("")).join("");
		const area = j.split("").filter((x) => x === "#").length;
		occ += area * region[1][i]!;
	}

	if (occ > totalArea) {
		return false;
	}

	return true;
}

function sol1(): number {
	const [shapes, regions] = parseInput();
	let total = 0;

	for (const region of regions) {
		const ok = canFit(region, shapes);

		if (ok) {
			total++;
		}
	}

	console.log(regions.length);
	return total;
}

function sol2(): number {
	return 0;
}

export default defineAocModule({
	day: 12,
	exp1: 589,
	exp2: 0,
	sol1,
	sol2,
});
