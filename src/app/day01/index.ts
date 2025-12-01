import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day01/input.txt");

function sol1(): number {
	let dial = 50;
	let counter = 0;

	for (const ins of lines) {
		const cmd = ins[0];
		let a = +ins.slice(1);

		if (cmd === "L") {
			a = -a;
		}

		dial += a;
		dial %= 100;

		if (dial === 0) {
			counter++;
		}
	}

	return counter;
}

function sol2(): number {
	let dial = 50;
	let counter = 0;

	for (const ins of lines) {
		const cmd = ins[0];
		const a = +ins.slice(1);

		for (let i = 0; i < a; i++) {
			if (cmd === "L") {
				dial--;
			} else {
				dial++;
			}

			dial %= 100;

			if (dial === 0) {
				counter++;
			}
		}
	}

	return counter;
}

export default defineAocModule({
	day: 1,
	exp1: 1026,
	exp2: 5923,
	sol1,
	sol2,
});
