import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day11/input.txt");

function parseInput() {
	const output: [string, string[]][] = [];

	for (const line of lines) {
		const [fst, ...rest] = line.trim().split(" ");
		const label = fst?.replace(":", "");
		output.push([label!, rest]);
	}

	return output;
}

const nodes = parseInput();

const memo = new Map<string, number>();

function getPaths(start: string, end: string) {
	if (start === end) return 1;

	if (start === "out") return 0;

	const key = `${start},${end}`;

	if (memo.has(key)) return memo.get(key)!;

	const el = nodes.find((x) => x[0] === start);

	if (!el) throw new Error("el expected");

	let paths = 0;

	for (const child of el[1]) {
		paths += getPaths(child, end);
	}

	memo.set(key, paths);

	return paths;
}

function sol1(): number {
	return getPaths("you", "out");
}

function sol2(): number {
	const a = getPaths("svr", "fft");
	const b = getPaths("fft", "dac");
	const c = getPaths("dac", "out");
	const d = getPaths("svr", "dac");
	const e = getPaths("dac", "fft");
	const f = getPaths("fft", "out");
	return a * b * c + d * e * f;
}

export default defineAocModule({
	day: 11,
	exp1: 472,
	exp2: 526_811_953_334_940,
	sol1,
	sol2,
});
