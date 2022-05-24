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
</script>

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
