
<script>
    import LanguageBox from '../components/LanguageBox.svelte';
    import TransitionComponent from "../components/TransitionComponent.svelte";

	let strAndLinguaggi = ['Javascript', 'Java', 'Python','C++','CSS','HTML','Perl','SQL','Git','Eclipse','IntelliJIdea','VSCode','Tailwind CSS']
	

</script>

<TransitionComponent>
	<div  class="container bg-yellow-100 w-1/2 h-auto rounded-lg m-auto mt-20">
		<div class="boxCentrale">
			<h1 class="p-2 text-4xl text-gray-700 font-black text-center m-5">Linguaggi e Strumenti</h1>
			<div class="boxLinguaggi grid grid-cols-2 gap-6 m-auto">
				{#each strAndLinguaggi as linguaggio}
				<LanguageBox titolo={linguaggio}></LanguageBox>
				{/each}
      </div>
    </div>
  </div>
</TransitionComponent>