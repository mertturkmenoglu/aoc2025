import { Arr, defineAocModule, type Pos, readLines } from "@/lib";

const L: string[] = readLines("day02/input.txt");

const P = () => L[0]!.split(",").map((p) => p.split("-").map((x) => +x) as Pos);
const A = (s: string) => s.slice(0, s.length / 2) === s.slice(s.length / 2);
const B = (r: Pos) => I(r).reduce((C, x) => C + x, 0);
const I = ([a, b]: Pos) => Arr.range(a, b).filter((i) => A(`${i}`));
const C = (s: string, n: number) =>
	Arr.chunk(s.split(""), n).map((c) => c.join(""));
const E = (arr: string[]) => arr.every((x) => x === arr[0]);
const F = (i: number) => Arr.range(1, Math.floor(`${i}`.length / 2) + 1);
const G = (X: Pos[]) => X.map((x) => H(x).reduce((acc, x) => acc + x, 0));
const H = ([S, e]: Pos) =>
	Arr.range(S, e + 1).filter((i) => F(i).some((j) => E(C(`${i}`, j))));

export default defineAocModule({
	day: 2,
	exp1: 21898734247,
	exp2: 28915664389,
	sol1: () => P().reduce((acc, x) => acc + B(x), 0),
	sol2: () => G(P()).reduce((acc, x) => acc + x, 0),
});
