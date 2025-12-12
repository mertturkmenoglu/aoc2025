/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/style/useConst: No need */
/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: No need*/
import { Arr, defineAocModule, nums, type Pos, readByEmptyLine } from "@/lib";

type I = number;
type X = string;
type Z = [Pos, I[]];

let G = readByEmptyLine("day12/input.txt");
let [sh, reg]: [I[], Z[]] = [[], []];
let [R, T] = [(s: X) => /^\d{1}:/.test(s), ([x, y]: Pos, a: I) => a <= x * y];
let A = (g: X[]) => sh.push(Arr.count(g.slice(1).join("").split(""), "#"));
let B = (s: X) => s.split(":").map((x) => x.trim()) as [X, X];
let C = (s: X) => B(s)[0].split("x").map(Number) as Pos;
let D = (g: X[]) => reg.push(...g.map((s) => [C(s), nums(B(s)[1])] as Z));
let P = () => G.forEach((g) => (R(g[0]!) ? A(g) : D(g)));
let [, F] = [P(), ([p, C]: Z) => T(p, Arr.sum(C.map((c, i) => sh[i]! * c)))];

export default defineAocModule({
	day: 12,
	exp1: 589,
	exp2: 0,
	sol1: () => reg.reduce((a, r) => a + (F(r) ? 1 : 0), 0),
	sol2: () => 0,
});
