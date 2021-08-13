<script>
    import { svg_element } from 'svelte/internal';
import {fade} from 'svelte/transition';

    let socials = ['twitter', 'github', 'instagram', 'discord'];

</script>

<title>Daniele Avolio</title>

<div transition:fade class="container bg-yellow-100 w-max h-auto my-52 rounded-lg grid grid-cols-2 flex items-center ">
    <div class="info mx-auto flex flex-col">
        <div class="cnt-image m-5">
            <img class="border-4 border-purple-200 rounded-full h-72 w-72 shadow-md" src="\src\images\avatar.jpg" alt="">
        </div>
        <div class="infos shadow-md rounded-md">
            <h1 class="flex justify-center text-2xl font-semibold text-purple-600">Daniele Avolio</h1>
            <h2 class="flex justify-center text-lg">Computer Science student</h2>
        </div>
        <button class=" hover:scale-110 mx-auto mt-5 bg-purple-500 rounded p-2 h-min max-w-sm font-semibold text-white hover:bg-purple-600 transition-all duration-150 ease-linear center">
            Download CV 
    </button>
    </div>

    <div class="bio">
        <div class="testo shadow-xl rounded-lg">
            <h1 class="flex justify-left p-5 text-3xl font-semibold  text-purple-600">Ciao!</h1>
            <p class="mx-5 text-lg">Mi chiamo Daniele.</p>
            <p class="mx-5 text-lg">Sono uno studente di <span class="font-semibold text-purple-600">Informatica</span> dell'Università della calabria e sono
                appassionato di tecnologia e programmazione. Il mio punto forte è lo <span class="font-semibold text-purple-600">sviluppo Front-End</span>.
            </p>
            <p class="mx-5 text-lg">Puoi navigare sul sito e vedere tutti i miei <span class="font-semibold text-purple-600">progetti</span>, il mio curriculum e i miei contatti!</p>
        </div>
        
        <div class="m-5 social flex flex-row space-x-5">
            {#each socials as social }
                <img class="h-10 w-10 cursor-pointer opacity-75 hover:opacity-100 hover:scale-125 transition-all duration-150 " src="src\icons\{social}.svg" alt="">
            {/each}
        </div>
    </div>
    
</div>
