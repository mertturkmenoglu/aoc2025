import { describe, expect, test } from "bun:test";
import { readLines } from "@/lib";

const lines: string[] = readLines("_template/sample.txt");

describe.only("day00 tests", () => {
	test("sample line length", () => {
		expect(lines.length).toBe(1);
	});
});
