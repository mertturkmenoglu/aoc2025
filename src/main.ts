import module01 from "@/app/day01";
import module02 from "@/app/day02";
import module03 from "@/app/day03";
import module04 from "@/app/day04";
import module05 from "@/app/day05";
import module06 from "@/app/day06";
import module07 from "@/app/day07";
import module08 from "@/app/day08";
import module09 from "@/app/day09";
import module10 from "@/app/day10";
import module11 from "@/app/day11";
import module12 from "@/app/day12";

const mapping: Record<string, AocModule> = {
	"01": module01,
	"02": module02,
	"03": module03,
	"04": module04,
	"05": module05,
	"06": module06,
	"07": module07,
	"08": module08,
	"09": module09,
	"10": module10,
	"11": module11,
	"12": module12,
};

function mux(day: string) {
	const module = mapping[day];

	if (!module) {
		throw new Error(`Module for day ${day} not found.`);
	}

	return module;
}

import { type AocModule, formatTime, measure } from "@/lib";

function main() {
	const day = (Bun.env.DAY ?? "").padStart(2, "0");
	console.log("Day:", day);
	const module = mux(day);

	const [res1, dur1] = measure(module.sol1);
	const [res2, dur2] = measure(module.sol2);

	console.info("Day:", module.day);
	console.table([
		{
			name: "Solution 1",
			result: res1,
			expected: module.exp1,
			duration: formatTime(dur1),
			correct: res1 === module.exp1,
		},
		{
			name: "Solution 2",
			result: res2,
			expected: module.exp2,
			duration: formatTime(dur2),
			correct: res2 === module.exp2,
		},
	]);
}

main();
