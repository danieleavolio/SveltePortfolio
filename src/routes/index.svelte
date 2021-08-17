<script>
    import {fade} from 'svelte/transition';
    let socials = ['twitter', 'github', 'instagram', 'discord'];
</script>



<title>Daniele Avolio</title>

<div transition:fade class="container bg-yellow-100 w-max h-auto my-52 rounded-lg grid grid-cols-2 m-auto ">
    <div class="info mx-auto flex flex-col">
        <div class="cnt-image m-2">
            <img class="border-4 border-gray-600 rounded-full h-72 w-72 shadow-md" src="\src\images\avatar.jpg" alt="">
        </div>
        <div class="infos shadow-md rounded-md bg-gray-700 p-2">
            <h2 class="flex justify-center text-2xl font-semibold text-yellow-200">Daniele Avolio</h2>
            <h3 class="flex justify-center text-lg text-yellow-200">Computer Science student</h3>
        </div>
        <button class=" hover:scale-110 hover:text-yellow-200 mx-auto mt-5 bg-gray-600 rounded p-2 h-min max-w-sm font-semibold text-white hover:bg-gray-700 transition-all duration-150 ease-linear center">
            Download CV 
    </button>
    </div>
    <div class="bio m-auto">
        <div class="testo shadow-xl rounded-lg bg-gray-700">
            <h1 class="flex justify-left p-5 text-4xl font-semibold text-yellow-200">Ciao! 👋</h1>
            <p class="mx-5 text-lg text-yellow-100">Mi chiamo Daniele.</p>
            <p class="mx-5 text-lg text-yellow-100">Sono uno studente di <span class="font-semibold text-yellow-200 text-2xl">Informatica</span> dell'Università della calabria e sono
                appassionato di tecnologia e programmazione. Il mio punto forte è lo <span class="font-semibold text-yellow-200 text-2xl">sviluppo Front-End</span>.
            </p>
            <p class="mx-5 text-lg text-yellow-100">Puoi navigare sul sito e vedere tutti i miei <a href="/progetti"><span class="font-semibold text-yellow-200 text-2xl">progetti</span></a>, il mio curriculum e i miei contatti!</p>
        </div>
        
        <div class="m-5 social flex flex-row space-x-5">
            {#each socials as social }
                <img class="h-10 w-10 cursor-pointer opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-150 " src="src\icons\{social}.svg" alt="">
            {/each}
        </div>
    </div>
    
</div>
