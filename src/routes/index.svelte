<script>
	//Mi serve per fare in modo che le pagine abbiano una transizione
	import TransitionComponent from '../components/TransitionComponent.svelte';
	import Footer from '../components/Footer.svelte';
	let socials = [
		{
			name: 'twitter',
			link: 'https://twitter.com/avolio_daniele'
		},
		{
			name: 'github',
			link: 'https://github.com/danieleavolio'
		},
		{
			name: 'instagram',
			link: 'https://www.instagram.com/oh_dagne/?hl=it'
		},
		{ name: 'discord', link: 'https://discordapp.com/users/0657/' },
		{ name: 'linkedin', link: 'https://www.linkedin.com/in/daniele-avolio-465aba145/' }
	];
</script>

<body class="dark:bg-gray-800" />

<head>
	<!-- HTML Meta Tags -->
	<meta charset="utf-8" />
	<meta
		name="description"
		content="Sono Daniele Avolio, sviluppatore appassionato di Javascript e Front-End Development. Mi appassiona il mondo della tecnologia e della Programmazione Web; Punto a diventare uno sviluppatore Full-Stack! "
	/>
	<title>Daniele Avolio | Javascript Front-End Developer</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.danieleavolio.it/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Daniele Avolio Javascript Developer" />
	<meta
		property="og:description"
		content="Sono Daniele Avolio, sviluppatore appassionato di Javascript e Front-End. Mi appassiona il mondo della tecnologia e della Programmazione Web."
	/>
	<meta property="og:image" content="https://i.imgur.com/GWYh8J2.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="danieleavolio.it" />
	<meta property="twitter:url" content="https://www.danieleavolio.it/" />
	<meta name="twitter:title" content="Daniele Avolio Javascript Developer" />
	<meta
		name="twitter:description"
		content="Sono Daniele Avolio, sviluppatore appassionato di Javascript e Front-End. Mi appassiona il mondo della tecnologia e della Programmazione Web."
	/>
	<meta name="twitter:image" content="https://i.imgur.com/GWYh8J2.png" />

	<!-- Meta Tags Generated via https://www.opengraph.xyz -->
</head>

<TransitionComponent>
	<div
		class="container dark:bg-gray-800 bg-green-400 w-11/12 h-auto sm:h-screen rounded-lg sm:grid sm:grid-cols-2 grid-rows-1 m-auto "
	>
		<div class="info m-auto flex flex-col h-auto md:h-3/4 gap-5 ">
			<div class="cnt-image m-auto hover:scale-110 duration-100 mt-5">
				<img
					class="border-4 dark:border-green-400 border-gray-800 rounded-full h-72 w-72 shadow-md"
					src="images\avatar.jpg"
					alt=""
				/>
			</div>
			<div class="infos shadow-2xl rounded-md dark:bg-gray-900 bg-green-500 p-2">
				<h2
					class="flex justify-center md:text-2xl text-xl font-bold dark:text-green-400 text-gray-800"
				>
					Daniele Avolio
				</h2>
				<h3 class="flex justify-center md:text-xl text-md dark:text-white text-white">
					Computer Science student
				</h3>
			</div>
			<a
				href="https://drive.google.com/file/d/1CidA-GVzxcaZDjttUf7KhOjYr00oKXoX/view?usp=sharing"
				target="_blank"
				class=" hover:scale-125  hover:text-green-400 text-white dark:hover:text-gray-800 mx-auto my-5 dark:bg-gray-900  bg-green-500 rounded p-2 h-min max-w-sm font-semibold dark:hover:bg-green-400  hover:bg-gray-800 transition-all duration-150 ease-linear center shadow-lg"
			>
				Download CV
			</a>
		</div>
		<div class="bio m-auto hover:scale-105 duration-100">
			<div class="shadow-2xl rounded-lg dark:bg-gray-900  bg-green-500">
				<h1
					class="flex justify-left p-5 md:text-4xl text-3xl font-semibold dark:text-green-400 text-gray-800"
				>
					Ciao! 👋
				</h1>
				<p class="mx-5 md:text-xl text-md  text-white">
					Mi chiamo <span class="font-semibold dark:text-green-400 text-gray-800 "> Daniele</span>.
				</p>
				<p class="mx-5 md:text-xl text-md  text-white">
					Sono uno studente di <span
						class="font-semibold dark:text-green-400 text-gray-800 md:text-2xl text-xl"
						>Informatica
					</span>di Cosenza e frequento l'Università della Calabria; adoro la tecnologia e la
					programmazione e sono appassionato di
					<span class="font-semibold dark:text-green-400 text-gray-800 md:text-2xl text-xl"
						>sviluppo Front-End e Javascript!</span
					> Principalmente mi interessa il Web-Development e tutto ciò che ruota intorno ad esso!
				</p>
				<p class="mx-5 pb-5 md:text-xl text-md text-white ">
					Nel sito trovi tutti i miei <a href="/progetti" target="_blank"
						><span class="font-semibold dark:text-green-400 text-gray-900 md:text-2xl text-xl"
							>progetti</span
						></a
					>, il mio CV e i miei contatti!
				</p>
			</div>

			<div class="m-5 grid grid-cols-5 h-auto space-x-5 place-items-center">
				{#each socials as social}
					<a href={social.link} target="_blank">
						<img
							class="h-10 p-2 dark:bg-gray-700 bg-green-500 rounded-lg mb-5 w-10 cursor-pointer opacity-75 hover:opacity-100 dark:hover:bg-green-400 hover:bg-white hover:scale-125 transition-all duration-150 "
							src="icons\{social.name}.svg"
							alt=""
						/>
					</a>
				{/each}
			</div>
		</div>
	</div>
	<Footer />
</TransitionComponent>
