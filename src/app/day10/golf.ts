/** biome-ignore-all lint/style/useConst: No need */
/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: No need*/
import { Arr, defineAocModule, readLines } from "@/lib";

type B = boolean;
type I = number;
type Q = [B[], I];
type X = string;
type W = Set<X>;
type Z = [Q[], W];
type Y = [B[], I[][]];

let [L, S] = [readLines("day10/input.txt"), JSON.stringify];
let W = (c: B[], t: B[]) => S(c) === S(t);
let A = (s: X, d = "") => s.slice(1, -1).split(d);
let D = (n: I): Z => [[[Arr.repeat(n, false), 0]], new Set<string>()];
let E = (s: X[]) => A(s[0]!).map((x) => x === "#");
let G = (s: X[]) => s.slice(1, -1).map((x) => A(x, ",").map(Number));
let P = (l: X, s = l.split(" ")): Y => [E(s), G(s)];
let Q = (b: I[], i: I, v: B) => (b.indexOf(i) !== -1 ? !v : v);
let R = (c: B[], b: I[]) => Arr.copy(c).map((v, i) => Q(b, i, v));
let H = (B: I[][], c: B[]) => B.map((b) => R(c, b));
let J = (a: B[][], e: W, o: Q[]) =>
	a.filter((n) => !e.has(S(n)) && !o.some((x) => S(x[0]) === S(n)));
let M = (a: B[][], o: Q[], s: I) => a.forEach((n) => o.push([n, s + 1]));
let N = (y: Y) => D(y[0].length);
let K = (y: Y, [o, e] = N(y), [c, s] = o.shift()!, _ = e.add(S(c))): I =>
	W(c, y[0]) ? s : [M(J(H(y[1], c), e, o), o, s), K(y, [o, e])][1]!;
let F = (y: Y, d = D(y[0].length)) => (d[0].length === 0 ? 0 : K(y, d));

export default defineAocModule({
	day: 10,
	exp1: 524,
	exp2: 0,
	sol1: () => L.map((l) => P(l)).reduce((acc, x) => acc + (F(x) ?? 0), 0),
	sol2: () => 0,
});
