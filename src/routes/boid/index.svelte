<script lang="ts">
	import { onMount } from 'svelte';
	import { createRandomBody, reverseDirection, type CanvasBody } from '$lib/boid/body';
	import Render from '$lib/boid/render.svelte';
	import Physics from '$lib/boid/physics.svelte';
	import Hud from '$lib/boid/hud.svelte';

	let canvasElement: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	function setCanvasSize() {
		canvasElement.width = canvasElement.offsetWidth;
		canvasElement.height = canvasElement.offsetHeight;
	}

	let numBodies = 10;
	let bodies: CanvasBody[] = [];

	$: if (canvasElement) {
		if (bodies.length <= numBodies) {
			for (let i = bodies.length; i < numBodies; i++) {
				bodies.push(createRandomBody(canvasElement.width, canvasElement.height));
			}
		} else {
			bodies = bodies.slice(0, numBodies);
		}
	}

	onMount(() => {
		ctx = canvasElement.getContext('2d');
		setCanvasSize();
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

	let physicsTick = 0;
	function doUpdate(delta: number) {
		moveBodies();
		physicsTick = delta;
	}

	let fps = 0;
</script>

<div class="w-full h-screen relative">
	<input
		min="1"
		type="number"
		title="Number of bodies"
		bind:value={numBodies}
		class="absolute top-6 left-6 z-50 w-20 text-center"
	/>

	<Hud {fps} {physicsTick} />

	<canvas bind:this={canvasElement} class="w-full h-full bg-blue-300" on:resize={setCanvasSize} />

	<Render draw={drawBodies} on:fps={(e) => (fps = e.detail)} />
	<Physics update={doUpdate} />
</div>
