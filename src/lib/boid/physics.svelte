<script lang="ts">
	import { browser } from '$app/env';
	import { onDestroy, onMount } from 'svelte';

	export let update: (delta: number) => void;

	let physicsFrame: number;
	let lastUpdateTime: number;

	function nextPhysics(timestamp: number) {
		const delta = timestamp - (lastUpdateTime || timestamp);

		update(delta);

		lastUpdateTime = timestamp;

		physicsFrame = requestAnimationFrame(nextPhysics);
	}

	onMount(() => {
		physicsFrame = requestAnimationFrame(nextPhysics);
	});

	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(physicsFrame);
		}
	});
</script>
