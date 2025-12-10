import { Arr, defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day10/input.txt");

type Button = number[];
type Q = [boolean[], number];

const S = JSON.stringify;

type Machine = {
	config: boolean[];
	buttons: Button[];
	joltages: number[];
};

function parseInput() {
	return lines.map(parseMachine);
}

function parseMachine(line: string): Machine {
	const segments = line.split(" ");
	const configSegment = segments[0]!;
	const joltagesSegment = segments.at(-1)!;
	const buttonsSegment = segments.slice(1, -1);
	const config = configSegment
		.slice(1, -1)
		.split("")
		.map((x) => x === "#");
	const joltages = joltagesSegment.slice(1, -1).split(",").map(Number);
	const buttons = buttonsSegment.map((x) =>
		x.slice(1, -1).split(",").map(Number),
	);

	return {
		config,
		joltages,
		buttons,
	};
}

function isTarget(current: boolean[], target: boolean[]): boolean {
	return S(current) === S(target);
}

function findFewestPress(machine: Machine): number {
	const cfg = machine.config;
	const open: Q[] = [[Arr.repeat(cfg.length, false), 0]];
	const seen = new Set<string>();

	while (open.length > 0) {
		const [curr, step] = open.shift()!;
		seen.add(S(curr));

		if (isTarget(curr, cfg)) {
			return step;
		}

		for (const b of machine.buttons) {
			const newCfg = press(curr, b);

			if (seen.has(S(newCfg))) {
				continue;
			}

			if (open.some((x) => S(x[0]) === S(newCfg))) {
				continue;
			}

			open.push([newCfg, step + 1]);
		}
	}

	return -1;
}

function press(cfg: boolean[], btn: number[]) {
	const out = Arr.copy(cfg);

	for (const num of btn) {
		out[num] = !out[num];
	}

	return out;
}

function sol1(): number {
	const input = parseInput();
	let total = 0;

	for (const machine of input) {
		total += findFewestPress(machine);
	}

	return total;
}

function sol2(): number {
	return 0;
}

export default defineAocModule({
	day: 10,
	exp1: 524,
	exp2: 0,
	sol1,
	sol2,
});
