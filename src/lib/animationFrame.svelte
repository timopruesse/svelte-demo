<script lang="ts">
	import { browser } from '$app/env';
	import Transform from '$lib/transform.svelte';
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { roundTo2 } from './utils/number';

	let animationFrame: number;
	let x = 50;
	let ticks = 0;
	let drift = 0;
	let missed = 0;

	onMount(() => {
		animationFrame = requestAnimationFrame(animate);
	});

	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(animationFrame);
		}
	});

	let hasMissed = false;
	let prevTimestamp: number;
	let elapsed = 0;
	function animate(timestamp: number) {
		if (prevTimestamp) {
			elapsed += timestamp - prevTimestamp;
		}
		prevTimestamp = timestamp;

		if (elapsed >= 1000) {
			drift = elapsed - 1000;
			elapsed = drift;
			x = -x;
			ticks++;

			hasMissed = roundTo2($timerStore) - ticks > 1;
			if (hasMissed) {
				missed++;
			}
		}

		animationFrame = requestAnimationFrame(animate);
	}

	const timerStore = getContext<Writable<number>>('timer');

	$: goodLatency = drift <= 16;
</script>

<div
	class="absolute left-4 flex flex-col gap-y-1"
	class:text-green-600={!hasMissed}
	class:text-red-500={hasMissed}
>
	<div>Ticks: {ticks}</div>
	<div>Missed: {missed}</div>
	<div class:text-red-500={!goodLatency} class:text-green-600={goodLatency}>
		Drift: {drift.toFixed(2)} ms
	</div>
</div>
<Transform
	x="{x}vh"
	class="duration-1000 bg-orange-300 text-xl rounded-full h-20 w-20 border-2 border-orange-900"
/>
