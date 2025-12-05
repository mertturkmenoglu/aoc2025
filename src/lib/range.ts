/** biome-ignore-all lint/style/noNonNullAssertion: Array indices are checked */
import type { Range } from "./types";

export function merge(ranges: Range[]): Range[] {
	const sorted = ranges.sort((a, b) => a[0] - b[0]);
	const merged: Range[] = [];

	for (let i = 0; i < sorted.length; i++) {
		let [start, end] = sorted[i]!;

		if (merged.length > 0 && merged.at(-1)![1] >= end) {
			continue;
		}

		for (let j = i + 1; j < sorted.length; j++) {
			if (sorted[j]![0] <= end) {
				end = Math.max(end, sorted[j]![1]);
			}
		}

		merged.push([start, end]);
	}

	return merged;
}
