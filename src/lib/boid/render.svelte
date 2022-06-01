<script lang="ts">
	import { browser } from '$app/env';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let draw: (delta: number) => void;

	let drawFrame: number;
	let lastDrawTime: number;
	let drawDelta = 0;
	let drawFrames = 0;

	const dispatch = createEventDispatcher<{ fps: number }>();

	function nextDraw(timestamp: number) {
		const delta = timestamp - (lastDrawTime || timestamp);

		drawDelta += delta;
		lastDrawTime = timestamp;

		if (drawDelta >= 1000) {
			dispatch('fps', drawFrames);

			drawDelta = drawDelta - 1000;
			drawFrames = 0;
		}
		drawFrames++;

		draw(delta);

		drawFrame = requestAnimationFrame(nextDraw);
	}

	onMount(() => {
		drawFrame = requestAnimationFrame(nextDraw);
	});

	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(drawFrame);
		}
	});
</script>
