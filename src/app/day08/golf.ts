/** biome-ignore-all lint/style/useConst: No need */
/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: No need*/
import { Arr, defineAocModule, dist3, type Pos3 as R, readLines } from "@/lib";

type W = [number, R, R];
type I = number;
type Q = Set<string>;
type T = Q[];
type X = string;

let L = readLines("day08/input.txt").map((l) => l.split(",").map(Number) as R);
let [LL, S] = [L.length, JSON.stringify];
let A = () => E(Arr.indices(LL - 1).flatMap(D));
let B = (i: I, j: I) => [dist3(L[i]!, L[j]!), L[i]!, L[j]!] as W;
let D = (i: I) => Arr.range(i + 1, LL).map((j) => B(i, j));
let [E] = [(a: W[]) => a.sort((b, c) => b[0] - c[0])];
let F = (C: T) => C.map((x) => x.size).sort((a, b) => b - a);
let G = (a: I[]) => a.slice(0, 3).reduce((b, x) => b * x, 1);
let H = (C: T, i: I) => Arr.indices(C.length).filter((j) => j !== i);
let J = (C: T, s1: X, s2: X) => C.findIndex((c) => c.has(s1) || c.has(s2));
let J2 = (c2: Q, C: T, i: I) => c2.values().forEach((el) => C[i]!.add(el));
let K = (c2: Q, C: T, i: I, Y: I[], j: I) => [J2(c2, C, i), Y.push(j)];
let O = (b: I[], C: T) => b.map((j) => [C[j]!, j] as [Q, I]);
let P = (t: [Q, I][], s1: X, s2: X) =>
	t.filter(([c2]) => c2.has(s1) || c2.has(s2));

let r = (m = false, ar = m ? A() : A().slice(0, 1000), C: T = []) => {
	for (const [, M, N] of ar) {
		let [s1, s2, i] = [S(M), S(N), J(C, S(M), S(N))];
		if (i === -1) C.push(new Set([s1, s2]));
		if (i === -1) continue;
		let [, b, Y] = [C[i]!.add(s1).add(s2), H(C, i), [] as I[]];
		P(O(b, C), s1, s2).forEach(([c2, j]) => K(c2, C, i, Y, j));
		if (m && C[i]!.size === LL) return M[0] * N[0];
		Arr.rep(Y, (i) => C.splice(i, 1));
	}

	return G(F(C));
};

export default defineAocModule({
	day: 8,
	exp1: 140_008,
	exp2: 9_253_260_633,
	sol1: () => r(),
	sol2: () => r(true),
});
