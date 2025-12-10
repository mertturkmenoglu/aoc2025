import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day10/input.txt");

type Button = number[];

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
	if (current.length !== target.length) return false;

	for (let i = 0; i < target.length; i++) {
		if (current[i] !== target[i]) {
			return false;
		}
	}

	return true;
}

function findFewestPress(machine: Machine): number {
	const open: [boolean[], number][] = [
		[new Array(machine.config.length).fill(false), 0],
	];
	const seen: [boolean[], number][] = [];

	while (open.length > 0) {
		const q = open.shift()!;
		seen.push(q);

		if (isTarget(q[0], machine.config)) {
			return q[1];
		}

		for (const b of machine.buttons) {
			const newCfg = press(q[0], b);

			if (seen.some((x) => JSON.stringify(x[0]) === JSON.stringify(newCfg))) {
				continue;
			}

			if (open.some((x) => JSON.stringify(x[0]) === JSON.stringify(newCfg))) {
				continue;
			}

			open.push([newCfg, q[1] + 1]);
		}
	}

	return -1;
}

function press(cfg: boolean[], btn: number[]) {
	const out: boolean[] = JSON.parse(JSON.stringify(cfg));
	for (const num of btn) {
		out[num] = !out[num];
	}
	return out;
}

function sol1(): number {
	const input = parseInput();
	let total = 0;

	for (const machine of input) {
		const a = findFewestPress(machine);
		total += a;
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
