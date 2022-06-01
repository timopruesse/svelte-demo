<script lang="ts">
	import HudText from './hudText.svelte';

	export let fps: number;
	export let physicsTick: number;

	let tickDelta = 0;
	let ticksPerSec = 0;
	let tickAvg = 0;

	$: {
		tickDelta += physicsTick;
		if (tickDelta >= 1000) {
			tickAvg = tickDelta / ticksPerSec;
			tickDelta = tickDelta - 1000;
			ticksPerSec = 0;
		}
		ticksPerSec++;
	}
</script>

<div class="absolute right-6 top-6 font-mono text-xl font-bold flex gap-x-6">
	<HudText bad={fps < 30} okay={fps >= 30 && fps < 60} good={fps >= 60}>{fps} FPS</HudText>
	|
	<HudText good={tickAvg < 17} okay={tickAvg >= 17 && tickAvg < 32} bad={tickAvg >= 32}>
		AVG → {tickAvg.toFixed(2)} ms
	</HudText>
	|
	<HudText
		good={physicsTick < 17}
		okay={physicsTick >= 17 && physicsTick < 32}
		bad={physicsTick >= 32}
	>
		TICK → {physicsTick.toFixed(3)} ms
	</HudText>
</div>
