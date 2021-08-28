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
			link: 'https://github.com/lovaion'
		},
		{
			name: 'instagram',
			link: 'https://www.instagram.com/oh_dagne/?hl=it'
		},
		{ name: 'discord', link: 'https://discordapp.com/users/0657/' },
		{ name: 'linkedin', link: 'https://www.linkedin.com/in/daniele-avolio-465aba145/' }
	];
</script>

<head>
	<meta property="’og:title’" content="Daniele Avolio Dev" />
	<meta property="’og:image’" content="https://imgur.com/a/3uRNcKO" />
	<meta
		property="’og:description’"
		content="Sono Daniele Avolio, programmatore e sviluppatore. Principalmente mi occupo di sviluppo web."
	/>
	<meta property="’og:url’" content="www.danieleavolio.it" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<!-- TYPE BELOW IS PROBABLY: 'website' or 'article' or look on https://ogp.me/#types -->
	<meta property="og:type" content="website" />
</head>
<body class="dark:bg-gray-700 scroll" />

<title>Daniele Avolio</title>
<TransitionComponent>
	<div
		class="container dark:bg-gray-700 bg-yellow-100 w-11/12 h-auto sm:h-screen rounded-lg sm:grid sm:grid-cols-2 grid-rows-1 m-auto "
	>
		<div class="info m-auto flex flex-col h-auto md:h-3/4 gap-5 ">
			<div class="cnt-image m-auto hover:scale-110 duration-100 mt-5">
				<img
					class="border-4 dark:border-yellow-200 border-gray-600 rounded-full h-72 w-72 shadow-md"
					src="images\avatar.jpg"
					alt=""
				/>
			</div>
			<div class="infos shadow-md rounded-md dark:bg-yellow-200 bg-gray-700 p-2">
				<h2
					class="flex justify-center md:text-2xl text-xl font-semibold dark:text-gray-700 text-yellow-200"
				>
					Daniele Avolio
				</h2>
				<h3 class="flex justify-center md:text-xl text-md dark:text-gray-700 text-yellow-200">
					Computer Science student
				</h3>
			</div>
			<a
				href="https://drive.google.com/file/d/1YYLo_PTYPDJEwrUOVGqychMAdH1QsNvq/view?usp=sharing"
				target="_blank"
				class=" hover:scale-125 hover:text-yellow-300 dark:text-gray-700 text-yellow-200 dark:hover:text-gray-600 mx-auto my-5 dark:bg-yellow-200  bg-gray-600 rounded p-2 h-min max-w-sm font-semibold dark:hover:bg-yellow-300  hover:bg-gray-700 transition-all duration-150 ease-linear center"
			>
				Download CV
			</a>
		</div>
		<div class="bio m-auto hover:scale-105 duration-100">
			<div class="testo shadow-xl rounded-lg dark:bg-yellow-200  bg-gray-700">
				<h1
					class="flex justify-left p-5 md:text-4xl text-3xl font-semibold dark:text-gray-700 text-yellow-200"
				>
					Ciao! 👋
				</h1>
				<p class="mx-5 md:text-xl text-md dark:text-gray-600 text-yellow-100">Mi chiamo Daniele.</p>
				<p class="mx-5 md:text-xl text-md dark:text-gray-600 text-yellow-100">
					Sono uno studente di <span
						class="font-semibold dark:text-gray-700 text-yellow-200 md:text-2xl text-xl"
						>Informatica</span
					>
					dell'Università della calabria e sono appassionato di tecnologia e programmazione. Il mio punto
					forte è lo
					<span class="font-semibold dark:text-gray-700 text-yellow-200 md:text-2xl text-xl"
						>sviluppo Front-End</span
					>.
				</p>
				<p class="mx-5 pb-5 md:text-xl text-md dark:text-gray-600 text-yellow-100">
					Puoi navigare sul sito e vedere tutti i miei <a href="/progetti" target="_blank"
						><span class="font-semibold dark:text-gray-700 text-yellow-200 md:text-2xl text-xl"
							>progetti</span
						></a
					>, il mio curriculum e i miei contatti!
				</p>
			</div>

			<div class="m-5 grid grid-cols-5 h-auto space-x-5 place-items-center">
				{#each socials as social}
					<a href={social.link} target="_blank">
						<img
							class="h-10 p-2 dark:bg-yellow-200 bg-gray-400 rounded-lg mb-5 w-10 cursor-pointer opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-150 "
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
