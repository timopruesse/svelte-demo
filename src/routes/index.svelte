<script lang="ts">
	import AnimationFrame from '$lib/animationFrame.svelte';
	import ScrollAwareContainer from '$lib/scrollAwareContainer.svelte';
	import SetInterval from '$lib/setInterval.svelte';
	import Transform from '$lib/transform.svelte';
	import { convertRange } from '$lib/utils/number';

	let currentScroll: number;
	let offsetPercentage = 0;

	$: scale = convertRange(offsetPercentage, -66, 3, 1, 4);
	$: xBox = 5 - convertRange(offsetPercentage, -33, 3, -5, 5);
	$: yBox = convertRange(offsetPercentage, -66, -33, -5, 5);

	let yo = false;
</script>

<div class="m-10">
	<button on:click={() => (yo = !yo)}>COLOR CHANGE</button>
	<div
		class="h-20 w-20 transition-all duration-1000 transform-gpu"
		class:bg-red-500={yo}
		class:bg-green-500={!yo}
		class:scale-100={yo}
		class:scale-150={!yo}
	/>
</div>

<div class="p-6 flex justify-center bg-blue-50">
	<SetInterval />
</div>

<div class="p-6 flex justify-center bg-orange-50">
	<AnimationFrame />
</div>

<ScrollAwareContainer class="p-6 bg-green-50 h-[300vh]" bind:offsetPercentage bind:currentScroll>
	<Transform
		x="{xBox}vh"
		y="{yBox}vh"
		{scale}
		class="fixed top-[50%] left-[50%] bg-red-500 h-10 w-10 animate-lightring-pulse border-4"
	/>
</ScrollAwareContainer>
