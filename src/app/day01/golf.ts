import { Arr, defineAocModule, type Pos, readLines } from "@/lib";

const lines: string[] = readLines("day01/input.txt");

const A = (n: number, s: string) =>
	(n + (s[0] === "L" ? -+s.slice(1) : +s.slice(1))) % 100;
const B = (n: number, c: number) =>
	n === 0 ? ([n, c + 1] as Pos) : ([n, c] as Pos);
const C = (s: string) => Arr.indices(+s.slice(1));
const E = (n: number, s: string) => (n + (s[0] === "L" ? -1 : 1)) % 100;
const F = ([D, c]: Pos, I: string) =>
	C(I).reduce(([D, c]) => B(E(D, I), c), [D, c] as Pos);

export default defineAocModule({
	day: 1,
	exp1: 1026,
	exp2: 5923,
	sol1: () => lines.reduce(([D, c], I) => B(A(D, I), c), [50, 0] as Pos)[1],
	sol2: () => lines.reduce(F, [50, 0] as Pos)[1],
});
