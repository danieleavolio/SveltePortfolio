<script>
	import Nav from '../components/Nav.svelte';
</script>

<Nav></Nav>
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,800;1,100;1,200;1,500;1,700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

<style>
    body{
        background-color: #FFF3C7;
        font-family: Poppins;
    }
	h1{
		font-family: 'Libre Baskerville', serif;
	}
</style>

</svelte:head>
<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
<slot></slot>


