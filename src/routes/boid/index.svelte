<script lang="ts">
	import { browser } from '$app/env';
	import { onDestroy, onMount } from 'svelte';
	import { createRandomBody, reverseDirection, type CanvasBody } from '$lib/boid/body';

	let canvasElement: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	function setCanvasSize() {
		canvasElement.width = canvasElement.offsetWidth;
		canvasElement.height = canvasElement.offsetHeight;
	}

	let numBodies = 10;
	let bodies: CanvasBody[] = [];

	let drawFrame: number;
	let physicsFrame: number;

	function nextDraw() {
		drawBodies();
		drawFrame = requestAnimationFrame(nextDraw);
	}

	function nextPhysics() {
		moveBodies();
		physicsFrame = requestAnimationFrame(nextPhysics);
	}

	$: if (canvasElement) {
		if (bodies.length <= numBodies) {
			for (let i = bodies.length; i <= numBodies; i++) {
				bodies.push(createRandomBody(canvasElement.width, canvasElement.height));
			}
		} else {
			bodies = bodies.slice(0, numBodies);
		}
	}

	onMount(() => {
		ctx = canvasElement.getContext('2d');

		if (!ctx) {
			throw new Error('Could not get 2D context.');
		}

		setCanvasSize();

		drawFrame = requestAnimationFrame(nextDraw);
		physicsFrame = requestAnimationFrame(nextPhysics);
	});

	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(drawFrame);
			cancelAnimationFrame(physicsFrame);
		}
	});

	function drawBody({ x, y, radius, color }: CanvasBody) {
		if (!ctx) return;

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}

	function drawBodies() {
		ctx?.clearRect(0, 0, canvasElement.width, canvasElement.height);
		bodies.forEach(drawBody);
	}

	function moveBody(body: CanvasBody) {
		const threshold = body.radius * 0.5;

		if (body.x >= canvasElement.width - threshold || body.x <= threshold) {
			body.direction.x = reverseDirection(body.direction.x);
		}

		if (body.y >= canvasElement.height - threshold || body.y <= threshold) {
			body.direction.y = reverseDirection(body.direction.y);
		}

		body.x += body.speed * body.direction.x;
		body.y += body.speed * body.direction.y;
	}

	function moveBodies() {
		bodies.forEach(moveBody);
	}
</script>

<div class="w-full h-screen">
	<input
		min="1"
		type="number"
		title="Number of bodies"
		bind:value={numBodies}
		class="absolute top-6 left-6 z-50 w-20 text-center"
	/>
	<canvas bind:this={canvasElement} class="w-full h-full bg-blue-500" on:resize={setCanvasSize} />
</div>
