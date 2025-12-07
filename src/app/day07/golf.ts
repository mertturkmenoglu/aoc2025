/** biome-ignore-all lint/style/useConst: No need */
/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/style/noParameterAssign: No need */
import {
	Arr,
	defineAocModule,
	type Matrix,
	Mtr,
	type Pos,
	posAdd,
	posStr,
	readLines,
} from "@/lib";

type G = Map<string, number>;

let M: Matrix<string> = readLines("day07/input.txt").map((l) => l.split(""));
let F: Pos = posAdd([1, 0], Mtr.find(M, "S")!);
Mtr.set(M, F, "|");
let [SET, S] = [(p: Pos) => Mtr.set(M, p, "|"), 0];
let B = ([r, c]: Pos) => Mtr.$at(M, [r + 1, c]);
let A = (p: Pos) => [posAdd(p, [1, -1]), posAdd(p, [1, 1])] as [Pos, Pos];
let [b, z] = [(p: Pos, c = "^") => B(p) === c, (p: Pos) => posAdd(p, [1, 0])];
let C = (m: G, k: string, p: Pos) =>
	m.set(k, b(p) ? A(p).reduce((Z, x) => Z + P(m, x), 0) : P(m, z(p))).get(k)!;
let D = (v: string, p: Pos) => (v === "|" ? H(p) : 0);
let E = (p: Pos) => Arr.rep(A(p), (x) => SET(x));
let H = (p: Pos) => (b(p) ? [E(p), S++] : b(p, ".") ? SET(z(p)) : 0);
let I = (p: Pos, m: G, k: string) =>
	p[0] === M.length - 1 ? m.set(k, 1).get(k)! : C(m, k, p);
let P = (m: G, p: Pos, k = posStr(p)): number =>
	m.has(k) ? m.get(k)! : I(p, m, k);

export default defineAocModule({
	day: 7,
	exp1: 1711,
	exp2: 36_706_966_158_365,
	sol1: () => [Mtr.forEach(M, D)].map(() => S)[0]!,
	sol2: () => P(new Map(), F),
});
