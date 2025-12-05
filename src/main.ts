import module01 from "@/app/day01";
import golf01 from "@/app/day01/golf";
import module02 from "@/app/day02";
import golf02 from "@/app/day02/golf";
import module03 from "@/app/day03";
import golf03 from "@/app/day03/golf";
import module04 from "@/app/day04";
import golf04 from "@/app/day04/golf";
import module05 from "@/app/day05";
import golf05 from "@/app/day05/golf";
import module06 from "@/app/day06";
import golf06 from "@/app/day06/golf";
import module07 from "@/app/day07";
import golf07 from "@/app/day07/golf";
import module08 from "@/app/day08";
import golf08 from "@/app/day08/golf";
import module09 from "@/app/day09";
import golf09 from "@/app/day09/golf";
import module10 from "@/app/day10";
import golf10 from "@/app/day10/golf";
import module11 from "@/app/day11";
import golf11 from "@/app/day11/golf";
import module12 from "@/app/day12";
import golf12 from "@/app/day12/golf";

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

const golfMapping: Record<string, AocModule> = {
	"01": golf01,
	"02": golf02,
	"03": golf03,
	"04": golf04,
	"05": golf05,
	"06": golf06,
	"07": golf07,
	"08": golf08,
	"09": golf09,
	"10": golf10,
	"11": golf11,
	"12": golf12,
};

function mux(day: string, mode: "run" | "golf" = "run"): AocModule {
	const module = mode === "golf" ? golfMapping[day] : mapping[day];

	if (!module) {
		throw new Error(`Module for day ${day} and mode ${mode} not found.`);
	}

	return module;
}

import { type AocModule, formatTime, measure } from "@/lib";

async function main() {
	const day = (Bun.env.DAY ?? "").padStart(2, "0");
	const mode = (Bun.env.MODE ?? "run") as "run" | "golf";
	console.log("Day:", day);
	console.log("Mode:", mode);
	const module = mux(day, mode);

	const [res1, dur1] = await measure(module.sol1);
	const [res2, dur2] = await measure(module.sol2);

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

await main();
