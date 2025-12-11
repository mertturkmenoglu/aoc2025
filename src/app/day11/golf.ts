/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/style/useConst: No need */
import { defineAocModule, readLines } from "@/lib";

type X = string;
type I = number;

let L = readLines("day11/input.txt").map((l) => l.split(" "));
let N = L.map(([f, ...r]) => [f!.replace(":", ""), r] as [X, X[]]);
let [M, A] = [new Map<X, I>(), (s: X) => N.find((x) => x[0] === s)];
let B = (s: X, e: X) => A(s)![1].reduce((acc, x) => acc + P(x, e), 0);
let [C, E] = [(s: X, e: X) => (s === e ? 1 : 0), (s: X, e: X) => `${s},${e}`];
let D = (s: X, e: X, k: X) => (M.has(k) ? M.get(k) : M.set(k, B(s, e)).get(k));
let F = (s: X, e: X) => s === e || s === "out";
let P = (s: X, e: X, k = E(s, e)): I => (F(s, e) ? C(s, e) : D(s, e, k)!);
let Z = P("svr", "fft") * P("fft", "dac") * P("dac", "out");
let Y = P("svr", "dac") * P("dac", "fft") * P("fft", "out");

export default defineAocModule({
	day: 11,
	exp1: 472,
	exp2: 526_811_953_334_940,
	sol1: () => P("you", "out"),
	sol2: () => Z + Y,
});
