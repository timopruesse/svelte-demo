<script lang="ts">
	export let good: boolean;
	export let okay: boolean;
	export let bad: boolean;
</script>

<span class:text-green-900={good} class:text-orange-500={okay} class:text-red-500={bad}>
	<slot />
</span>
