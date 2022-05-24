<script lang="ts">
	import { browser } from '$app/env';
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	let animationFrame: number;

	let prevTimestamp: number;
	let elapsed = 0;

	function tick(timestamp: number) {
		if (prevTimestamp) {
			elapsed += timestamp - prevTimestamp;
		}
		prevTimestamp = timestamp;
		animationFrame = requestAnimationFrame(tick);
	}

	onMount(() => {
		animationFrame = requestAnimationFrame(tick);
	});

	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(animationFrame);
		}
	});

	$: seconds = elapsed * 0.001;

	const timerStore = getContext<Writable<number>>('timer');

	$: timerStore.set(seconds);
</script>

<div class="p-4 font-bold text-lg font-mono">Elapsed: {seconds.toFixed(2)} seconds</div>
