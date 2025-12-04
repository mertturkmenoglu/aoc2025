type Result = number | string | bigint | Promise<number | string | bigint>;

type Duration = number;

export async function measure(fn: () => Result): Promise<[Result, Duration]> {
	const start = performance.now();
	const res = await fn();
	const end = performance.now();
	return [res, end - start];
}
