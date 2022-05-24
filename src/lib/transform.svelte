<script lang="ts">
	export let x = '0';
	export let y = '0';
	export let scale = 1;

	$: transforms = [`translate3d(${x},${y},0)`, scale !== 1 ? `scale3d(${scale},${scale},1)` : ''];
	$: transformStr = `transform: ${transforms.filter((t) => t.length > 0).join(' ')}`;

	$: styles = [transformStr, $$props.style || ''];
	$: styleStr = styles.filter((s) => s.length > 0).join(';');
</script>

<div style={styleStr} class="transition-transform {$$props.class || ''}">
	<slot />
</div>
