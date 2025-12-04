/** biome-ignore-all lint/style/noNonNullAssertion: No need */
import {
	Arr,
	cardinalCoefs,
	defineAocModule,
	diagonalCoefs,
	type Matrix,
	Mtr,
	type Pos,
	readLines,
} from "@/lib";

type Fn = (pos: Pos[]) => void;
type Z = number | Promise<number>;

const lines: string[] = readLines("day04/input.txt");
const coefs = [...cardinalCoefs, ...diagonalCoefs];
const A: Pos[] = [];
const M: Matrix<string> = lines.map((l) => l.split(""));
const N = ([i, j]: Pos) =>
	coefs.map(([dr, dc]) => Mtr.$at(M, [i + dr, j + dc]));
const C = ([i, j]: Pos) => N([i, j]).filter((x) => x === "@").length < 4;
const T = async (F: Fn) =>
	Mtr.forEachCell(M, (el, i, j) => F(el === "@" && C([i, j]) ? [[i, j]] : []));
const B = () => new Set(A.map((x) => x.join(","))).size;
const D = async () => Arr.rep(A, (p) => Mtr.set(M, p, "."));
const E = () => T((pos) => A.push(...pos));
const F = () => A.length;
const G = (P = F()) =>
	E().then((): Z => (P === F() ? B() : D().then(() => G(F()))));

export default defineAocModule({
	day: 4,
	exp1: 1464,
	exp2: 8409,
	sol1: () => T((pos) => A.push(...pos)).then(() => A.length),
	sol2: () => G(),
});
