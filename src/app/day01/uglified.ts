import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day01/input.txt");

function sol1(): number {
	let [dial, counter] = [50, 0];

	for (const ins of lines) {
		dial = (dial + (ins[0] === "L" ? -+ins.slice(1) : +ins.slice(1))) % 100;
		if (dial === 0) counter++;
	}

	return counter;
}

function sol2(): number {
	let [dial, counter] = [50, 0];

	for (const ins of lines) {
		for (let i = 0; i < +ins.slice(1); i++) {
			dial = (dial + (ins[0] === "L" ? -1 : 1)) % 100;
			if (dial === 0) counter++;
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
