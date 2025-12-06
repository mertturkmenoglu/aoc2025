/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/style/useConst: No need */
import { Arr, defineAocModule, Mtr, readLines } from "@/lib";

type W = string[];
type Q = number;
type Y = string;
type T = [W, string];
type Z = [number, W];

let E = readLines("day06/input.txt");
let L = E.map((l) => l.trim().split(/ +/));
let C = L[0]!.length;
let F = Arr.range(0, C).map((i) => Mtr.col(L, i));
let Z = (s: Y) => s.replaceAll("0", "");
let H = (c: W) => [c.slice(0, c.length - 1), c.at(-1)!] as T;
let A = ([N, o]: T, m: Q) =>
	[Arr.range(0, m).map((j) => Z(B(N, j))), Z(o)] as T;
let R = (op: Y, acc: Q, x: Y) => (op === "+" ? acc + +x : acc * +x);
let M = F.map((col) => Arr.max(col.map((x) => x.length)));
let V = (G: W, max: Q) => G.map((l) => l.slice(0, max).replaceAll(" ", "0"));
let S = ([a, o]: T) => a.reduce((acc, x) => R(o, acc, x), o === "+" ? 0 : 1);
let B = (N: W, i: Q) => N.map((x) => x[i]!).join("");
let D = (s: Q, G: W, m: Q) =>
	[s + S(A(H(V(G, m)), m)), G.map((x) => x.slice(m + 1))] as Z;

export default defineAocModule({
	day: 6,
	exp1: 6_957_525_317_641,
	exp2: 13_215_665_360_076,
	sol1: () => F.reduce((a, c) => a + S(H(c)), 0),
	sol2: () => M.reduce(([s, G], m) => D(s, G, m), [0, E] as Z)[0],
});
