export function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

export function convertRange(
	value: number,
	start1: number,
	end1: number,
	start2: number,
	end2: number
) {
	return ((clamp(value, start1, end1) - start1) * (end2 - start2)) / (end1 - start1) + start2;
}

export function roundTo2(num: number) {
	const m = Number((Math.abs(num) * 100).toPrecision(15));

	return (Math.round(m) / 100) * Math.sign(num);
}
