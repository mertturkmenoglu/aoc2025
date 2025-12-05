/** biome-ignore-all lint/style/noNonNullAssertion: No need */
/** biome-ignore-all lint/style/useConst: No need */
import { Arr, defineAocModule, type Pos, readByEmptyLine } from "@/lib";

let [G1, G2] = readByEmptyLine("day05/input.txt");
let Z = G1!.map((l) => l.split("-").map(Number) as Pos);
let [R, ids] = [Z.sort((a, b) => a[0] - b[0]), G2!.map(Number)];
let A = (id: number) => (R.some(([a, b]) => id >= a && id <= b) ? 1 : 0);
let B = (E: number, j: number) => (R[j]![0]! <= E ? Math.max(E, R[j]![1]!) : E);
let C = (i: number, end: number) => Arr.range(i + 1, R.length).reduce(B, end);
let D = (res: Pos[]) => res.reduce((acc, [a, b]) => acc + b - a + 1, 0);
let E = (V: Pos[], e: number) => V.length && V.at(-1)![1] >= e;
let S = (V: Pos[] = [], i = 0, [s, e] = R[i] ?? [0, 0]): number =>
	i === R.length ? D(V) : S(E(V, e) ? V : [...V, [s, C(i, e)]], i + 1);

export default defineAocModule({
	day: 5,
	exp1: 756,
	exp2: 355555479253787,
	sol1: () => ids.reduce((acc, id) => acc + A(id), 0),
	sol2: () => S(),
});
