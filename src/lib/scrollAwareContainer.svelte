<script lang="ts">
	import { browser } from '$app/env';
	import { getOffsetTop } from '$lib/utils/htmlElement';
	import { onDestroy, onMount } from 'svelte';

	let container: HTMLDivElement;
	let observer: IntersectionObserver;

	export let offsetPercentage = 0;
	export let currentScroll = 0;

	function setOffsetPercentage() {
		const maxScroll = getOffsetTop(container);

		currentScroll = maxScroll - window.pageYOffset;

		offsetPercentage = Math.min(
			100,
			Math.max(-100, (currentScroll / container.clientHeight) * 100)
		);
	}

	function handleScroll() {
		setOffsetPercentage();
	}

	function attachScrollHandler() {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}
	}

	function detachScrollHandler() {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	}

	onMount(() => {
		container.style.minHeight = `${container.clientHeight}px`;

		setOffsetPercentage();

		observer = new IntersectionObserver((entries) => {
			const entry = entries[0];

			if (entry.isIntersecting) {
				attachScrollHandler();
			} else {
				detachScrollHandler();
			}
		}, {});

		observer.observe(container);
	});

	onDestroy(() => {
		observer?.disconnect();
		detachScrollHandler();
	});
</script>

<div bind:this={container} {...$$props}><slot /></div>
