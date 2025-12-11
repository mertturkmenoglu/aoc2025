import { type BfsNode, defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day11/input.txt");

type Node = [string, string[]];

function parseInput() {
	const output: [string, string[]][] = [];

	for (const line of lines) {
		const [fst, ...rest] = line.trim().split(" ");
		const label = fst?.replace(":", "");
		output.push([label!, rest]);
	}

	return output;
}

function solve(nodes: Node[]) {
	const start = nodes.find((x) => x[0] === "you")!;
	const open: BfsNode<Node>[] = [{ value: start, parent: null }];
	const seen: BfsNode<Node>[] = [];
	const paths = new Set<string>();

	while (open.length > 0) {
		const q = open.shift()!;
		seen.push(q);

		if (q.value[0] === "out") {
			const path = constructPath(q);
			paths.add(path);
			continue;
		}

		for (const child of q.value[1]) {
			const el = nodes.find((x) => x[0] === child);

			if (el === undefined) {
				open.push({ value: ["out", []], parent: q });
			} else {
				open.push({ value: el, parent: q });
			}
		}
	}

	return paths.size;
}

function constructPath(end: BfsNode<Node> | null): string {
	let tmp = end;
	const path: string[] = [];

	while (tmp !== null) {
		path.push(tmp.value[0]);
		tmp = tmp.parent;
	}

	return JSON.stringify(path.toReversed());
}

function sol1(): number {
	const nodes = parseInput();

	return solve(nodes);
}

function sol2(): number {
	return 0;
}

export default defineAocModule({
	day: 11,
	exp1: 0,
	exp2: 0,
	sol1,
	sol2,
});
