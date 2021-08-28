<script>
	import { fly } from 'svelte/transition';
</script>

<div
	in:fly|local={{ x: -100, duration: 200, delay: 350 }}
	out:fly|local={{ x: 100, duration: 300 }}
>
	<slot />
</div>
