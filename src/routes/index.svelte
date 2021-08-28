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
		{ name: 'discord', link: 'https://discordapp.com/users/0657/' }
	];
</script>

<title>Daniele Avolio</title>
<TransitionComponent>
	<div
		class="container bg-yellow-100 w-11/12 h-auto sm:h-screen rounded-lg sm:grid sm:grid-cols-2 grid-rows-1 m-auto "
	>
		<div class="info m-auto flex flex-col h-auto md:h-3/4 gap-5 ">
			<div class="cnt-image m-auto hover:scale-110 duration-100 ">
				<img
					class="border-4 border-gray-600 rounded-full h-72 w-72 shadow-md"
					src="images\avatar.jpg"
					alt=""
				/>
			</div>
			<div class="infos shadow-md rounded-md bg-gray-700 p-2">
				<h2 class="flex justify-center md:text-2xl text-xl font-semibold text-yellow-200">
					Daniele Avolio
				</h2>
				<h3 class="flex justify-center md:text-xl text-md text-yellow-200">
					Computer Science student
				</h3>
			</div>
			<a
				href="https://drive.google.com/file/d/1YYLo_PTYPDJEwrUOVGqychMAdH1QsNvq/view?usp=sharing"
				target="_blank"
				class=" hover:scale-125 hover:text-yellow-200 mx-auto my-5 bg-gray-600 rounded p-2 h-min max-w-sm font-semibold text-white hover:bg-gray-700 transition-all duration-150 ease-linear center"
			>
				Download CV
			</a>
		</div>
		<div class="bio m-auto hover:scale-105 duration-100">
			<div class="testo shadow-xl rounded-lg bg-gray-700">
				<h1 class="flex justify-left p-5 md:text-4xl text-3xl font-semibold text-yellow-200">
					Ciao! 👋
				</h1>
				<p class="mx-5 md:text-xl text-md text-yellow-100">Mi chiamo Daniele.</p>
				<p class="mx-5 md:text-xl text-md text-yellow-100">
					Sono uno studente di <span class="font-semibold text-yellow-200 md:text-2xl text-xl"
						>Informatica</span
					>
					dell'Università della calabria e sono appassionato di tecnologia e programmazione. Il mio punto
					forte è lo
					<span class="font-semibold text-yellow-200 md:text-2xl text-xl">sviluppo Front-End</span>.
				</p>
				<p class="mx-5 pb-5 md:text-xl text-md text-yellow-100">
					Puoi navigare sul sito e vedere tutti i miei <a href="/progetti" target="_blank"
						><span class="font-semibold text-yellow-200 md:text-2xl text-xl">progetti</span></a
					>, il mio curriculum e i miei contatti!
				</p>
			</div>

			<div class="m-5 grid grid-cols-4 h-auto space-x-5 place-items-center">
				{#each socials as social}
					<a href={social.link} target="_blank">
						<img
							class="h-10 mb-5 w-10 cursor-pointer opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-150 "
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
