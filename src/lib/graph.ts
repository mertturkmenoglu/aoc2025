/** biome-ignore-all lint/style/noNonNullAssertion: Don't care */
import { type BfsNode, type Graph, Mtr } from ".";
import type { Matrix, Pos } from "./types";
import { cardinalCoefs, posAdd, posEq } from "./utils";

export function getCardinalNeighbours(pos: Pos): Pos[] {
	return cardinalCoefs.map((c) => posAdd(pos, c));
}

export function n4<T>(g: Matrix<T>, node: Graph.N): Pos[] {
	return getCardinalNeighbours(node.value).filter(
		(x) => Mtr.isOnGrid(g, x) && Mtr.at(g, x) !== "#",
	);
}

export function path(end: N | null): Pos[] {
	let tmp = end;
	const path: Pos[] = [];

	while (tmp !== null) {
		path.push(tmp.value);
		tmp = tmp.parent;
	}

	return path.toReversed();
}

export function hasPos(arr: N[], p: Pos): boolean {
	return arr.some((x) => posEq(x.value, p));
}

export type N = BfsNode<Pos>;

export function bfs<T>(g: Matrix<T>, start: Pos, end: Pos): Pos[] {
	const open: N[] = [{ value: start, parent: null }];
	const seen: N[] = [];

	while (open.length > 0) {
		const q = open.shift()!;
		seen.push(q);

		if (posEq(q.value, end)) {
			return path(q);
		}

		for (const n of n4(g, q)) {
			if (hasPos(seen, n)) {
				continue;
			}

			if (hasPos(open, n)) {
				continue;
			}

			open.push({ value: n, parent: q });
		}
	}

	return [];
}
