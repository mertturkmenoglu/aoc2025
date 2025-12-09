/** biome-ignore-all lint/style/useConst: <explanation> */
import { Arr, defineAocModule, type Pos, readLines } from "@/lib";

let L = readLines("day09/input.txt").map(
	(l) => l.split(",").map(Number) as Pos,
);

let D = ([x1, y1]: Pos, [x2, y2]: Pos) =>
	(Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);

function sol2(): number {
	return 0;
}

export default defineAocModule({
	day: 9,
	exp1: 0,
	exp2: 0,
	sol1: () => Arr.max(L.flatMap((p1) => L.map((p2) => D(p1, p2)))),
	sol2,
});
