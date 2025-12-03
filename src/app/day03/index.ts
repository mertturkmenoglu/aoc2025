import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day03/input.txt");

function sol1(): bigint {
	let sum: bigint = BigInt(0);

	for (const line of lines) {
		sum = sum + maxJoltage(line.split("").map(Number), 2);
	}

	return sum;
}

function sol2(): bigint {
	let sum: bigint = BigInt(0);

	for (const line of lines) {
		sum = sum + maxJoltage(line.split("").map(Number));
	}

	return sum;
}

function maxJoltage(nums: number[], k = 12): bigint {
	let s = "";
	let curr = 0;

	for (let i = k; i > 0; i--) {
		curr = maxIndex(nums, curr, i) + 1;
		s += nums[curr - 1];
	}

	return BigInt(s);
}

function maxIndex(nums: number[], L: number, R: number) {
	let [max, ix] = [0, 0];

	for (let i = L; i <= nums.length - R; i++) {
		if (nums[i]! > max) {
			max = nums[i]!;
			ix = i;
		}
	}

	return ix;
}

export default defineAocModule({
	day: 3,
	exp1: 16812n,
	exp2: 166345822896410n,
	sol1,
	sol2,
});
