<nav class="bg-purple-400 mx-auto p-2 grid grid-cols-2 sticky top-0 ">
	<div class="name">
		<a class="font-black text-2xl text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all mx-5 " href="/">DA</a>
	</div>
	<div class="others flex justify-end mx-10 space-x-5">
		<a class="text-2xl font-semibold text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all" href="/about">Home</a>
		<a class="text-2xl font-semibold text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all" href="/about">Strumenti</a>
		<a class="text-2xl font-semibold text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all" href="/about">Progetti</a>
		<a class="text-2xl font-semibold text-yellow-200 hover:text-yellow-300 ease-in duration-100 transition-all" href="/about">Contattami</a>
	</div>
</nav>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,800;1,100;1,200;1,500;1,700&display=swap" rel="stylesheet">
<style>
    body{
        background-color: #FFF3C7;
        font-family: Poppins;
    }
</style>

</svelte:head>
<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

</style>
<slot></slot>


