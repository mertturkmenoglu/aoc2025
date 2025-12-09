/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/style/useConst: No need */
import { Arr, defineAocModule, type Pos, readLines as RL } from "@/lib";

type I = number;
type Z = [I, I, I];

let P = RL("day09/input.txt").map((l) => l.split(",").map(Number) as Pos);
let [II, D] = [Arr.indices(P.length), Math.abs];
let [L, H] = [Math.min, Math.max];
let A = ([x1, y1]: Pos, [x2, y2]: Pos) => (D(x2 - x1) + 1) * (D(y2 - y1) + 1);
let B = (i: I, j: I) => A(P[i]!, P[j]!);
let J = (i: I, j: I) => (C(i, j) ? B(i, j) : -1);
let K = (x: Pos, y: Pos, i: 0 | 1) =>
	[x[i], y[i]].toSorted((a, b) => a - b) as [I, I];
let F = (i: I, j: I) => [K(P[i]!, P[j]!, 0), K(P[i]!, P[j]!, 1)] as [Pos, Pos];
let M = ([a, b, c]: Z) => a < b && b < c;
let N = (a: I, b: I, c: I) => L(a, b) <= c && c < H(a, b);
let O = (a: I, b: I, c: I) => L(a, b) < c && c <= H(a, b);
let Q = (a: I, b: I, c: I, d: I, e: I, f: I, g: I) =>
	M([a, b, c]) && (N(d, e, f) || O(d, e, g));
let R = (y1: I, y2: I, y: I, Y: I, x1: I, x2: I, x: I, X: I) =>
	(y1 === y2 && Q(y, y1, Y, x1, x2, x, X)) ||
	(x1 === x2 && Q(x, x1, X, y1, y2, y, Y));
let G = (i: I) => [P[i]!, P[(i + 1) % P.length]!] as [Pos, Pos];
let E = ([a, b, i]: Z, [[x, X], [y, Y]] = F(a, b), [[c, d], [e, f]] = G(i)) =>
	R(d, f, y, Y, c, e, x, X);
let C = (a: I, b: I) => !II.some((i) => E([a, b, i]));

export default defineAocModule({
	day: 9,
	exp1: 4_733_727_792,
	exp2: 1_566_346_198,
	sol1: () => Arr.max(II.flatMap((i) => II.map((j) => B(i, j)))),
	sol2: () => Arr.max(II.flatMap((i) => II.map((j) => J(i, j)))),
});
