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
		{ name: 'Cpp' },
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

<body class="dark:bg-gray-700" />


<head>
<!-- HTML Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Daniele Avolio | Strumenti</title>
	<meta
		name="description"
		content="Sono Daniele, sviluppatore Javscript. Cosa utilizzo e quali linguaggi conosco? Trovi tutto in questa.."
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.danieleavolio.it/"/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Daniele Avolio Javascript Developer" />
	<meta
		property="og:description"
		content="Sono Daniele, sviluppatore Javscript. Cosa utilizzo e quali linguaggi conosco? Trovi tutto in questa.."
	/>
	<meta property="og:image" content="https://i.imgur.com/jtjXJOT.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="danieleavolio.it" />
	<meta property="twitter:url" content="https://www.danieleavolio.it/" />
	<meta name="twitter:title" content="Daniele Avolio Javascript Developer" />
	<meta
		name="twitter:description"
		content="Sono Daniele, sviluppatore Javscript. Cosa utilizzo e quali linguaggi conosco? Trovi tutto in questa.."
	/>
	<meta name="twitter:image" content="https://i.imgur.com/jtjXJOT.png" />

	<!-- Meta Tags Generated via https://www.opengraph.xyz -->
</head>
	

<TransitionComponent>
	<title>Strumenti e Linguaggi</title>
	<div class="container bg-yellow-100 dark:bg-gray-700 w-auto h-auto rounded-lg m-auto mt-20">
		<div class="boxCentrale">
			<h2 class="text-5xl dark:text-yellow-200 text-gray-700 font-black text-center m-5">
				Linguaggi e Strumenti
			</h2>
			<div
				transition:slide
				class="boxLinguaggi grid grid-cols-1 md:grid-cols-2 gap-6 m-auto"
				style="scroll-behavior: smooth;"
			>
				{#each strAndLinguaggi as linguaggio}
					<LanguageBox titolo={linguaggio.name} />
				{/each}
			</div>
		</div>
	</div>
	<Footer />
</TransitionComponent>
