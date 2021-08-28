<script>
	import { fade, slide } from 'svelte/transition';
	let showNav = false;
	let show = false;

	function onMouseIn(e) {
		show = !show;
	}

	function mouseClick(e) {
		showNav = !showNav;
	}

	function closeMenu(e) {
		showNav = false;
	}
</script>

<nav class="bg-gray-700 mx-auto p-2 h-12 sticky top-0 dark:bg-yellow-200 ">
	<div class="name">
		{#if show}
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<a
				in:slide={{ y: 100 }}
				out:slide={{ y: 100 }}
				class="font-black text-2xl dark:text-gray-700 dark:hover:text-gray-600 text-yellow-300 mx-5 absolute"
				href="/"
				on:mouseout={onMouseIn}
				on:click={(closeMenu, onMouseIn)}
			>
				Daniele Avolio</a
			>
		{/if}

		{#if !show}
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<a
				in:slide={{ y: -100 }}
				out:slide={{ y: 100 }}
				class="font-black text-2xl dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200  mx-5 absolute"
				href="/"
				on:mouseover={onMouseIn}
				on:click={closeMenu}>DA</a
			>
		{/if}
	</div>
	<div class="others  m-auto justify-end mx-10 space-x-5 hidden sm:flex">
		<a
			class=" text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"
			href="/">Home</a
		>
		<a
			class="text-2xl  font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"
			href="/strumenti">Strumenti</a
		>
		<a
			class=" text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"
			href="/progetti">Progetti</a
		>
		<a
			class=" text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"
			href="/contattami">Contattami</a
		>
	</div>

	<div class="dropdown sm:hidden flex justify-end">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-8 h-8 self-center hover:cursor-pointer dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 duration-75 transition-all"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			on:click={mouseClick}
		>
			<!-- Quando clicchi sul burger praticamente cambia anche il nome che c'è a sinistra -->
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	</div>
	{#if showNav}
		<div
			transition:slide={{ y: 200, duration: 100 }}
			class="navOpen space-x-5 m-2 p-5 justify-center flex flex-col bg-gray-700 dark:bg-yellow-200 rounded-b-lg "
		>
			<a
				class="flex justify-center text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"
				on:click={mouseClick}
				href="/">Home</a
			>
			<a
				class="flex justify-center  text-2xl  font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"
				href="/strumenti"
				on:click={mouseClick}
				>Strumenti
			</a>
			<a
				class="flex justify-center  text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"
				href="/progetti"
				on:click={mouseClick}>Progetti</a
			>
			<a
				class="flex justify-center  text-2xl font-semibold dark:text-gray-700 dark:hover:text-gray-600 text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all"
				href="/contattami"
				on:click={mouseClick}>Contattami</a
			>
		</div>{/if}
</nav>
