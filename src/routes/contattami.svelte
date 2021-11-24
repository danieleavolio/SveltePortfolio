<script>
	import Footer from '../components/Footer.svelte';
</script>

<body class="dark:bg-gray-800" />


<head>
<!-- HTML Meta Tags -->
	<title>Daniele Avolio | Contattami</title>
	<meta
		name="description"
		content="Hai bisogno di qualche servizio o hai qualche domanda farmi? Puoi contattarmi direttamente da.."
	/>

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://www.danieleavolio.it/"/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Daniele Avolio Javascript Developer" />
	<meta
		property="og:description"
		content="Hai bisogno di qualche servizio o hai qualche domanda farmi? Puoi contattarmi direttamente da.."
	/>
	<meta property="og:image" content="https://i.imgur.com/jtjXJOT.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="danieleavolio.it" />
	<meta property="twitter:url" content="https://www.danieleavolio.it/" />
	<meta name="twitter:title" content="Daniele Avolio Javascript Developer" />
	<meta
		name="twitter:description"
		content="Hai bisogno di qualche servizio o hai qualche domanda farmi? Puoi contattarmi direttamente da.."
	/>
	<meta name="twitter:image" content="https://i.imgur.com/jtjXJOT.png" />

	<!-- Meta Tags Generated via https://www.opengraph.xyz -->
</head>

	<div
		class="container dark:bg-gray-800 bg-green-400 items-center justify-center h-screen flex flex-col gap-4 rounded-lg m-auto"
	>
		<div
			class="boxCentrale m-5 bg-gray-800 dark:bg-green-400 max-w-lg lg:max-w-2xl xl:max-w-full xl:flex flex-row rounded-xl hover:shadow-lg duration-100 ease-linear"
		>
			<div class="left h-auto m-auto flex w-auto md:flex-shrink-0">
				<img
					class="  sm:max-w-lg  lg:max-w-2xl xl:max-w-3xl rounded-t-lg xl:rounded-xl xl:rounded-r-none shadow-lg"
					src="images\contact.png"
					alt=""
				/>
			</div>
			<div class="right h-auto m-3 text-justify flex flex-col justify-evenly">
				<h2
					class=" text-2xl md:text-4xl xl:text-6xl text-green-400 dark:text-gray-800 font-semibold text-left "
				>
					Contattami
				</h2>
				<h2
					class=" text-md md:text-lg xl:text-2xl text-white  font-medium text-left "
				>
					Per qualsiasi informazione riguardo:
				</h2>
				<ul>
					<li class="text-md md:text-lg text-green-400 dark:text-gray-800">📌 Progetti</li>
					<li class="text-md md:text-lg text-green-400 dark:text-gray-800">📌 Formazione</li>
					<li class="text-md md:text-lg text-green-400 dark:text-gray-800">📌 Lavoro</li>
				</ul>
				<p class="text-sm sm:text-base md:text-lg text-white">
					Se sei interessato in un progetto per un <span
						class="font-semibold text-green-400 dark:text-gray-800 underline "
					>
						sito Web
					</span>
					interamente personalizzabile a tuo piacimento e hai bisogno di qualcuno che gestisca le pagine
					che mostrano la tua attività o azienda, sentiti libero di
					<span class="font-semibold text-green-400 dark:text-gray-800 underline "
						>contattarmi</span
					>
					in qualsiasi momento tramite il
					<span class="font-semibold text-green-400 dark:text-gray-800 underline ">bottone</span> sottostante!
				</p>
			</div>
		</div>
		<a
			class="text-xl font-semibold hover:scale-110 items-center p-3 flex w-min rounded-md bg-green-400 hover:bg-white text-gray-800 shadow-lg duration-100 ease-in "
			href="mailto:danieleavoliodev@gmail.com">Contattami</a
		>
	</div>
	<Footer />
