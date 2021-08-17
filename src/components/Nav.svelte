<script>
    let show = false;
	import {fade} from 'svelte/transition';
    function onMouseIn(e){
    show = !show;



}
</script>
<nav class="bg-gray-700 mx-auto p-2 grid grid-cols-2 sticky top-0 ">
	<div class="name">

		{#if show}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<a transition:fade class="font-black text-2xl text-yellow-300 mx-5 absolute " href="/" on:mouseout={onMouseIn}>Daniele Avolio</a>
		{/if}

		{#if !show}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<a transition:fade class="font-black text-2xl text-yellow-200  mx-5 absolute" href="/" on:mouseover={onMouseIn}>DA</a>
		{/if}

		
	</div>
	<div class="others flex justify-end mx-10 space-x-5">
		<a class="text-2xl font-semibold text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all" href="/">Home</a>
		<a class="text-2xl font-semibold text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all" href="/strumenti">Strumenti</a>
		<a class="text-2xl font-semibold text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all" href="/progetti">Progetti</a>
		<a class="text-2xl font-semibold text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all" href="/contattami">Contattami</a>
	</div>
</nav>