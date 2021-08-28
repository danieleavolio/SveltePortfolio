<script>
	import TransitionComponent from '../components/TransitionComponent.svelte';
	import Footer from '../components/Footer.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
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

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body class="dark:bg-gray-700 " />

<TransitionComponent>
	<title>Progetti</title>
	<div class="container dark:bg-gray-700 bg-yellow-100 h-auto rounded-lg m-auto">
		<h2 class="text-7xl dark:text-yellow-200 text-gray-700 font-black text-center m-5">Progetti</h2>
		<div class="boxCentrale mt-5 h-screen flex flex-row ">
			<div
				style="scroll-snap-type: x  mandatory; overflow-x: scroll; scroll-behavior: smooth;"
				class="boxProgetti flex flex-row overflow-auto m-auto gap-5 h-auto overflow-x-hidden "
			>
				{#each $progetti as progetto}
					<ProjectCard
						nome="{progetto.nome},"
						tipo="{progetto.tipo},"
						immagine={progetto.immagine}
					/>
				{/each}
			</div>
		</div>
	</div>
	<Footer />
</TransitionComponent>
