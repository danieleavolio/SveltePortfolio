<script context="module">
	export async function load(ctx) {
		const name = ctx.page.params.name;
		return {
			props: {
				name
			}
		};
	}
</script>

<script>
	export let name;
	import { progetti } from '../../stores/progetti';
	import TransitionComponent from '../../components/TransitionComponent.svelte';
	import Footer from '../../components/Footer.svelte';

	let index = $progetti.findIndex((elem) => elem.nome == name);
	let immagine = $progetti[index].immagine;
	let tipo = $progetti[index].tipo;
	let descrizione = $progetti[index].descrizione;
	let repo = $progetti[index].repo;
</script>

<title>{name}</title>
<TransitionComponent>
	<h2 class="text-center text-5xl m-5 font-black text-gray-700 ">{name}</h2>
	<div class="container w-auto h-screen m-auto flex">
		<div
			class="card w-3/4 md:w-3/4 xl:w-max xl:h-max bg-gray-700 grid xl:flex m-auto gap- rounded-xl"
		>
			<img
				class="flex-shrink-0 rounded-t-xl  xl:w-1/2 xl:h-1/2 xl:rounded-xl xl:rounded-r-none"
				src="..\src\images\projects\{immagine}"
				alt=""
			/>
			<div class="right flex flex-col">
				<div class="testo">
					<h2 class="text-yellow-300 font-semibold text-lg md:text-2xl xl:text-3xl p-5">
						{tipo}
					</h2>
					<p class="text-yellow-200  text-sm md:text-base italic p-5">{descrizione}</p>
				</div>
				<a
					class="p-5 m-2 m-auto mb-5 md:m-5 bg-green-500 hover:bg-green-400 duration-100 ease-in w-min whitespace-nowrap rounded-lg flex flex-row align-middle items-center text-white"
					target="_blank"
					href={repo}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="xl:h-10 xl:w-10 h-6 w-6 text-center text-white"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
							clipRule="evenodd"
						/>
					</svg>
					Source Code
				</a>
			</div>
		</div>
	</div>
	<Footer />
</TransitionComponent>
