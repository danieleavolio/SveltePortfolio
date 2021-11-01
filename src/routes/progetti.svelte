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
<!-- HTML Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Daniele Avolio | Progetti</title>
	<meta
		name="description"
		content="Sono Daniele, sviluppatore Javscrit. Qui trovi i progetti che ho realizzato da solo e con colleghi; Trovi i codici direttamente.."
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.danieleavolio.it/"/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Daniele Avolio Javascript Developer" />
	<meta
		property="og:description"
		content="Sono Daniele, sviluppatore Javscrit. Qui trovi i progetti che ho realizzato da solo e con colleghi; Trovi i codici direttamente.."
	/>
	<meta property="og:image" content="https://i.imgur.com/jtjXJOT.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="danieleavolio.it" />
	<meta property="twitter:url" content="https://www.danieleavolio.it/" />
	<meta name="twitter:title" content="Daniele Avolio Javascript Developer" />
	<meta
		name="twitter:description"
		content="Sono Daniele, sviluppatore Javscrit. Qui trovi i progetti che ho realizzato da solo e con colleghi; Trovi i codici direttamente.."
	/>
	<meta name="twitter:image" content="https://i.imgur.com/jtjXJOT.png" />

	<!-- Meta Tags Generated via https://www.opengraph.xyz -->
</head>
	
<body class="dark:bg-gray-800" style="overflow-x: hidden;" />

<TransitionComponent>
	<title>Progetti</title>
	<div class="container dark:bg-gray-800 bg-green-400 h-auto rounded-lg m-auto">
		<h2 class="text-7xl dark:text-green-400 text-gray-700 font-black text-center m-5">Progetti</h2>
		<div class="boxCentrale mt-5 h-screen flex flex-row ">
			<div
				style="overflow-x: scroll;"
				class="boxProgetti flex flex-row overflow-auto m-auto h-auto overflow-x-hidden "
			>
				{#each $progetti as progetto}
					<ProjectCard nome={progetto.nome} tipo={progetto.tipo} immagine={progetto.immagine} />
				{/each}
			</div>
		</div>
	</div>
	<Footer />
</TransitionComponent>
