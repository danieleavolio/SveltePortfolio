
<script>
    import LanguageBox from '../components/LanguageBox.svelte';
	import {fade} from 'svelte/transition';

	let strAndLinguaggi = ['Javascript', 'Java', 'Python','C++','CSS','HTML','Perl','SQL','Git','Eclipse','IntelliJIdea','VSCode','Tailwind CSS']
	

</script>
<div transition:fade class="container bg-yellow-100 w-max h-auto rounded-lg m-auto mt-20">

	<div class="boxCentrale">
		<h1 class="p-2 text-4xl text-gray-700 font-extrabold text-center">Programming languages</h1>
		<div class="boxLinguaggi grid grid-cols-2 m-10 gap-10">
			{#each strAndLinguaggi as linguaggio}
				<LanguageBox class="m-5" titolo={linguaggio}></LanguageBox>
			{/each}
		</div>
	</div>

</div>