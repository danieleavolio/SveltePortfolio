<script>
	import { fly } from 'svelte/transition';
	export let titolo = 'PL';
	let status = false;

	function handleHover(e) {
		status = !status;
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	class="	main m-auto grid gap-1 
		  bg-gray-700 rounded-xl 
            p-2 
			hover:scale-105 transition-all 
            duration-100 
			w-24  lg:w-48
			hover:w-48 xl:hover:w-64
			hover:shadow-lg 
			mb-5"
	on:mouseover={handleHover}
	on:mouseout={handleHover}
>
	<img
		class="w-30 h-30 flex m-auto p-1 rounded-xl "
		src="src\icons\languages\{titolo.toLowerCase()}.png"
		alt=""
	/>

	{#if status}
		<h1 transition:fly={{ duration: 50 }} class="text-xl font-black  m-auto text-yellow-200">
			{titolo}
		</h1>
	{/if}
</div>
