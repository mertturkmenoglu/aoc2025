/**
 * Create an array with length `n` and fill with `0`.
 * @param n is the array length.
 * @returns n-length zero array.
 */
export function zeros(n: number): number[] {
	return new Array(n).fill(n);
}

/**
 * Returns an array of indices.
 *
 * Starts from `0`, goes up to `n` (not included).
 * @param n is the array length.
 * @returns indices
 */
export function indices(n: number): number[] {
	return [...new Array(n).keys()];
}

export function copy<T>(arr: T[]): T[] {
	const out: T[] = new Array(arr.length);

	for (let i = 0; i < arr.length; i++) {
		out[i] = arr[i]!;
	}

	return out;
}

/**
 * Create an array with length `n` and fill with `el`.
 * @param n is the array length.
 * @param el is the element to fill.
 * @returns n-length array filled with `el`.
 */
export function repeat<T>(n: number, el: T): T[] {
	return new Array(n).fill(el);
}

export function rep<T>(
	arr: T[],
	fn: (el: T, idx: number, arr: T[]) => void,
): T[] {
	for (let i = 0; i < arr.length; i++) {
		const el = arr[i];
		if (!el) continue;
		fn(el, i, arr);
	}
	return arr;
}

/**
 * Create an array and fill with a range of numbers.
 * @param start is the start of the range (inclusive).
 * @param end is the end of the range (exclusive).
 * @param step is the step size (default is 1).
 * @returns array filled with the range of numbers.
 */
export function range(start: number, end: number, step = 1): number[] {
	const arr: number[] = [];
	for (let i = start; i < end; i += step) {
		arr.push(i);
	}
	return arr;
}

/**
 * Returns the maximum value in an array of numbers.
 * @param arr is the input array.
 * @returns maximum value or `-Infinity` if the array is empty.
 */
export function max(arr: number[]): number {
	let m = Number.NEGATIVE_INFINITY;

	for (const el of arr) {
		if (el > m) {
			m = el;
		}
	}

	return m;
}

/**
 * Splits an array into chunks of specified size.
 * @param arr is the input array.
 * @param size is the chunk size.
 * @returns array of chunks.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
	const chunks: T[][] = [];

	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}

	return chunks;
}

export function count<T>(arr: T[], el: T): number {
	let counter = 0;

	for (const x of arr) {
		if (x === el) {
			counter++;
		}
	}

	return counter;
}

export function countBy<T>(
	arr: T[],
	predicate: (el: T, i: number) => boolean,
): number {
	let counter = 0;

	for (let i = 0; i < arr.length; i++) {
		if (predicate(arr[i]!, i)) {
			counter++;
		}
	}

	return counter;
}

export function sum(arr: number[]): number {
	let counter = 0;

	for (const el of arr) {
		counter += el;
	}

	return counter;
}
