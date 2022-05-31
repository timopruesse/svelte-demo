<script context="module">
	import '../styles/generated/tailwind.css';
</script>

<script lang="ts">
	import Timer from '$lib/timer.svelte';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	const timerStore = writable(0);

	setContext('timer', timerStore);
</script>

<main class="min-h-screen">
	<Timer />
	<slot />
</main>
