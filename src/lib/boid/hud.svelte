<script lang="ts">
	export let fps: number;
	export let physicsTick: number;
</script>

<div class="absolute right-6 top-6 font-mono text-xl font-bold flex gap-x-6">
	<div
		class:text-red-500={fps < 30}
		class:text-orange-500={fps >= 30 && fps < 60}
		class:text-green-900={fps >= 60}
	>
		{fps} fps
	</div>
	<div
		class:text-green-900={physicsTick < 17}
		class:text-orange-500={physicsTick >= 17 && physicsTick < 32}
		class:text-red-500={physicsTick >= 32}
	>
		{physicsTick.toFixed(1)} ms
	</div>
</div>
