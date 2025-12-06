/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/style/useConst: No need */
import { Arr, defineAocModule, Mtr, readLines } from "@/lib";

type W = string[];
type Q = number;
type T = [W, string];
type Z = [number, W];

let OG = readLines("day06/input.txt");
let L = OG.map((l) => l.trim().split(/ +/));
let C = L[0]!.length;
let COLS = Arr.range(0, C).map((i) => Mtr.col(L, i));
let Z = (s: string) => s.replaceAll("0", "");
let TAKE = (col: W) => [col.slice(0, col.length - 1), col.at(-1)!] as T;
let A = ([N, op]: T, m: Q) =>
	[Arr.range(0, m).map((j) => Z(B(N, j))), Z(op)] as T;
let R = (op: string, acc: Q, x: string) => (op === "+" ? acc + +x : acc * +x);
let MAX = COLS.map((col) => Arr.max(col.map((x) => x.length)));
let V = (G: W, max: Q) => G.map((l) => l.slice(0, max).replaceAll(" ", "0"));
let S = ([a, op]: T) => a.reduce((acc, x) => R(op, acc, x), op === "+" ? 0 : 1);
let B = (N: W, i: Q) => N.map((x) => x[i]!).join("");
let D = (s: Q, G: W, m: Q) =>
	[s + S(A(TAKE(V(G, m)), m)), G.map((x) => x.slice(m + 1))] as Z;

export default defineAocModule({
	day: 6,
	exp1: 6_957_525_317_641,
	exp2: 13_215_665_360_076,
	sol1: () => COLS.reduce((acc, col) => acc + S(TAKE(col)), 0),
	sol2: () => MAX.reduce(([s, G], max) => D(s, G, max), [0, OG] as Z)[0],
});
