<script>
	import { fade } from 'svelte/transition';
	import TransitionComponent from '../components/TransitionComponent.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<title>Contattami</title>
<TransitionComponent>
	<div
		class="container bg-yellow-100 items-center justify-center h-screen flex flex-col gap-4 rounded-lg m-auto"
	>
		<div
			class="boxCentrale m-5 bg-gray-700 max-w-lg lg:max-w-2xl xl:max-w-full xl:flex flex-row rounded-xl"
		>
			<div class="left h-auto m-auto flex w-auto md:flex-shrink-0">
				<img
					class="  sm:max-w-lg  lg:max-w-2xl xl:max-w-3xl rounded-t-lg xl:rounded-xl xl:rounded-r-none shadow-lg"
					src="src\images\contact.png"
					alt=""
				/>
			</div>
			<div class="right h-auto m-3 text-justify flex flex-col justify-evenly">
				<h2 class=" text-2xl md:text-4xl xl:text-6xl text-yellow-300 font-semibold text-left ">
					Contattami
				</h2>
				<h2 class=" text-md md:text-lg xl:text-2xl text-yellow-200 font-medium text-left ">
					Per qualsiasi informazione riguardo:
				</h2>
				<ul>
					<li class="text-md md:text-lg text-yellow-200">📌 Progetti</li>
					<li class="text-md md:text-lg text-yellow-200">📌 Formazione</li>
					<li class="text-md md:text-lg text-yellow-200">📌 Lavoro</li>
				</ul>
				<p class="text-sm sm:text-base md:text-lg text-yellow-100">
					Se sei interessato in un progetto per un <span
						class="font-semibold text-yellow-200 underline "
					>
						sito Web
					</span>
					interamente personalizzabile a tuo piacimento e hai bisogno di qualcuno che gestisca le pagine
					che mostrano la tua attività o azienda, sentiti libero di
					<span class="font-semibold text-yellow-200 underline ">contattarmi</span>
					in qualsiasi momento tramite il
					<span class="font-semibold text-yellow-200 underline ">bottone</span> sottostante!
				</p>
			</div>
		</div>
		<a
			class="text-xl font-semibold hover:scale-110 items-center p-3 flex w-min rounded-md bg-yellow-400 hover:bg-yellow-300 text-gray-700 shadow-lg duration-100 ease-in "
			href="mailto:danieleavoliodev@gmail.com">Contattami</a
		>
	</div>
	<Footer />
</TransitionComponent>
