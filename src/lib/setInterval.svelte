<script lang="ts">
	import Transform from '$lib/transform.svelte';
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { roundTo2 } from './utils/number';

	let interval: NodeJS.Timeout;
	let x = 50;
	let ticks = 0;
	let missed = 0;
	let hasMissed = false;

	onMount(() => {
		interval = setInterval(() => {
			x = -x;
			ticks++;

			hasMissed = roundTo2($timerStore) - ticks > 1;
			if (hasMissed) {
				missed++;
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const timerStore = getContext<Writable<number>>('timer');
</script>

<div
	class="absolute left-4 flex flex-col gap-y-1"
	class:text-green-600={!hasMissed}
	class:text-red-500={hasMissed}
>
	<div>Ticks: {ticks}</div>
	<div>Missed: {missed}</div>
</div>
<Transform
	x="{x}vh"
	class="duration-1000 bg-blue-300 text-xl rounded-full h-20 w-20 border-2 border-blue-900"
/>
