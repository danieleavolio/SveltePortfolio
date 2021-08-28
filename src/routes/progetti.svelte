<script>
	import TransitionComponent from '../components/TransitionComponent.svelte';
	import Footer from '../components/Footer.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
	import { slide } from 'svelte/transition';
	import { progetti } from '../stores/progetti';

	//progetti per riempire il box dei progetti

	/*const progetti = [
		{ name: 'Donkey Kong AI' },
		{ name: 'Game Syllabus' },
		{ name: 'Personal Portfolio' },
		{ name: 'Password Generator' },
		{ name: 'I Miss My Bus' },
		{ name: 'Anime Hook' },
		{ name: 'Hero Road' },
		{ name: 'Game Of Life GUI' },
		{ name: 'Lab Network Configuration' }
	];
	*/
</script>

<TransitionComponent>
	<title>Progetti</title>
	<div class="container bg-yellow-100 h-auto rounded-lg m-auto">
		<h2 class="text-7xl text-gray-700 font-black text-center m-5">Progetti</h2>
		<div class="boxCentrale mt-5 h-auto md:h-screen flex flex-row">
			<div
				style="overflow: auto;"
				class="boxProgetti grid sm:flex sm:flex-row overflow-auto m-auto gap-5"
			>
				{#each $progetti as progetto}
					<ProjectCard {...progetto} />
				{/each}
			</div>
		</div>
	</div>
	<Footer />
</TransitionComponent>
