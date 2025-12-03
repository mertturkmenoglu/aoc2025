/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
/** biome-ignore-all lint/style/useConst: <explanation> */

import { Arr, defineAocModule, type Pos, readLines } from "@/lib";

type T = number[];
type S = number;
type E = [string, number];
type H = [T, S, S];

let L = readLines("day03/input.txt").map((l) => l.split("").map(Number));
let G = ([N, L, R]: H) => Arr.range(L, N.length - R + 1);
let P = ([N, L, R]: H) => G([N, L, R]).map((i) => [N[i]!, i] as Pos);
let M = ([N, L, R]: H) => P([N, L, R]).toSorted((a, b) => b[0] - a[0])[0]![1];
let R = (k: S) => Arr.range(1, k + 1).toReversed();
let F = ([a, b]: E, i: S, N: T) => [a + N[M([N, b, i])], M([N, b, i]) + 1] as E;
let J = (N: T, k = 12) => R(k).reduce((A, i) => F(A, i, N), ["", 0] as E)[0];

export default defineAocModule({
	day: 3,
	exp1: 16812n,
	exp2: 166345822896410n,
	sol1: () => L.reduce((A, l) => A + BigInt(J(l, 2)), 0n),
	sol2: () => L.reduce((A, l) => A + BigInt(J(l, 12)), 0n),
});
