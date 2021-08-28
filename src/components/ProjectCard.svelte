<script>
	export let nome;
	export let tipo;
	export let immagine;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	class="max-w-xs sm:max-w-md md:max-w-xl m-5 h-auto flex flex-col shadow-lg rounded-xl bg-gray-700"
>
	<div class="topPart md:flex-shrink-0">
		<img
			class=" max-w-xs sm:max-w-md md:max-w-lg rounded-xl rounded-b-none"
			src="src\images\projects\{immagine}"
			alt=""
		/>
	</div>
	<div class="bottomPart w-full h-full grid grid-cols-2">
		<div class="p-5 testi flex flex-col gap-5">
			<h2 class="text-left text-xl md:text-2xl font-semibold text-yellow-300">
				{nome}
			</h2>
			<p class="text-sm md:text-md text-yellow-200">
				Tipo: <span class="italic"> {tipo}</span>
			</p>
		</div>
		<a
			href="/progetti/{nome}"
			class="bg-yellow-200 items-center text-gray-700 hover:scale-110 hover:bg-yellow-300 h-1/3 cursor-pointer flex m-auto  duration-100 transition-all  ease-in p-3  rounded-md font-semibold"
		>
			More Info
		</a>
	</div>
</div>
