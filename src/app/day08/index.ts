import { defineAocModule, dist3, type Pos3, readLines } from "@/lib";

const lines = readLines("day08/input.txt").map(
	(l) => l.split(",").map(Number) as Pos3,
);

function sol1(): number {
	const arr: [number, Pos3, Pos3][] = [];

	for (let i = 0; i < lines.length - 1; i++) {
		for (let j = i + 1; j < lines.length; j++) {
			const p1 = lines[i]!;
			const p2 = lines[j]!;
			const distance = dist3(p1, p2);

			arr.push([distance, p1, p2]);
		}
	}

	arr.sort((a, b) => a[0] - b[0]);

	const jboxConnections = arr.map(([, p1, p2]) => [p1, p2] as [Pos3, Pos3]);

	const circuits: Set<string>[] = [];

	for (const [box1, box2] of jboxConnections.slice(0, 1000)) {
		const s1 = JSON.stringify(box1);
		const s2 = JSON.stringify(box2);
		let flag = true;

		for (let i = 0; i < circuits.length; i++) {
			const circ = circuits[i]!;

			if (circ.has(s1) || circ.has(s2)) {
				circ.add(s1);
				circ.add(s2);

				const indices: number[] = [];

				for (let j = 0; j < circuits.length; j++) {
					if (j === i) continue;

					const c2 = circuits[j]!;

					if (c2.has(s1) || c2.has(s2)) {
						for (const el of c2) {
							circ.add(el);
						}

						indices.push(j);
					}
				}

				for (const index of indices) {
					circuits.splice(index, 1);
				}

				flag = false;
				break;
			}
		}

		if (flag) {
			const set = new Set<string>();
			set.add(s1);
			set.add(s2);
			circuits.push(set);
		}
	}

	const sizes = circuits.map((x) => x.size);
	sizes.sort((a, b) => b - a);
	const [a, b, c] = sizes;

	if (!a || !b || !c) return 0;

	return a * b * c;
}

function sol2(): number {
	const arr: [number, Pos3, Pos3][] = [];

	for (let i = 0; i < lines.length - 1; i++) {
		for (let j = i + 1; j < lines.length; j++) {
			const p1 = lines[i]!;
			const p2 = lines[j]!;
			const distance = dist3(p1, p2);

			arr.push([distance, p1, p2]);
		}
	}

	arr.sort((a, b) => a[0] - b[0]);

	const jboxConnections = arr.map(([, p1, p2]) => [p1, p2] as [Pos3, Pos3]);

	const circuits: Set<string>[] = [];

	for (const [box1, box2] of jboxConnections) {
		const s1 = JSON.stringify(box1);
		const s2 = JSON.stringify(box2);
		let flag = true;

		for (let i = 0; i < circuits.length; i++) {
			const circ = circuits[i]!;

			if (circ.has(s1) || circ.has(s2)) {
				circ.add(s1);
				circ.add(s2);

				const indices: number[] = [];

				for (let j = 0; j < circuits.length; j++) {
					if (j === i) continue;

					const c2 = circuits[j]!;

					if (c2.has(s1) || c2.has(s2)) {
						for (const el of c2) {
							circ.add(el);
						}

						indices.push(j);
					}
				}

				if (circ.size === lines.length) {
					return box1[0] * box2[0]!;
				}

				for (const index of indices) {
					circuits.splice(index, 1);
				}

				flag = false;
				break;
			}
		}

		if (flag) {
			const set = new Set<string>();
			set.add(s1);
			set.add(s2);
			circuits.push(set);
		}
	}

	const sizes = circuits.map((x) => x.size);
	sizes.sort((a, b) => b - a);
	const [a, b, c] = sizes;

	if (!a || !b || !c) return 0;

	return a * b * c;
}

export default defineAocModule({
	day: 8,
	exp1: 140_008,
	exp2: 9_253_260_633,
	sol1,
	sol2,
});
