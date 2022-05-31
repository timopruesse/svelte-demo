export type BodyDirection = -1 | 1;

export interface CanvasBody {
	x: number;
	y: number;
	radius: number;
	color: string;
	speed: number;
	direction: { x: BodyDirection; y: BodyDirection };
}

export function reverseDirection(dir: BodyDirection): BodyDirection {
	return -dir as BodyDirection;
}

function getRandomBetween(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(): string {
	const num = getRandomBetween(0, 4);
	switch (num) {
		case 0:
			return 'lime';
		case 1:
			return 'purple';
		case 2:
			return 'magenta';
		case 3:
			return 'green';
		case 4:
			return 'red';
		default:
			return 'red';
	}
}

function getRandomDirection(): BodyDirection {
	return getRandomBetween(0, 1) === 0 ? 1 : -1;
}

export function createRandomBody(width: number, height: number): CanvasBody {
	const radius = getRandomBetween(25, 50);
	const safeZone = radius * 2;

	return {
		radius,
		x: getRandomBetween(safeZone, width),
		y: getRandomBetween(safeZone, height),
		color: getRandomColor(),
		speed: getRandomBetween(5, 15),
		direction: { x: getRandomDirection(), y: getRandomDirection() }
	};
}
