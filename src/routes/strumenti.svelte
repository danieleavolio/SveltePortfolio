<script>
	import { slide } from 'svelte/transition';
	import LanguageBox from '../components/LanguageBox.svelte';
	import TransitionComponent from '../components/TransitionComponent.svelte';
	import Footer from '../components/Footer.svelte';

	//linguaggi per riempire le categorie
	const strAndLinguaggi = [
		{ name: 'Javascript' },
		{ name: 'Java' },
		{ name: 'Python' },
		{ name: 'C++' },
		{ name: 'CSS' },
		{ name: 'HTML' },
		{ name: 'Perl' },
		{ name: 'SQL' },
		{ name: 'Git' },
		{ name: 'Eclipse' },
		{ name: 'IntelliJIdea' },
		{ name: 'VSCode' },
		{ name: 'Tailwind CSS' }
	];
</script>

<TransitionComponent>
	<div class="container bg-yellow-100 w-1/2 h-auto rounded-lg m-auto mt-20">
		<div class="boxCentrale">
			<h1 class="text-3xl text-gray-700 font-black text-center m-5">Linguaggi e Strumenti</h1>
			<div transition:slide class="boxLinguaggi grid grid-cols-1 md:grid-cols-2 gap-6 m-auto">
				{#each strAndLinguaggi as linguaggio}
					<LanguageBox titolo={linguaggio.name} />
				{/each}
			</div>
		</div>
	</div>
	<Footer />
</TransitionComponent>
