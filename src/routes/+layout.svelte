<script>
	import Navbar from '$lib/ui/navbar.svelte';
	import Footer from '$lib/ui/footer.svelte';

	import '../app.css';
</script>

<svelte:head>
	<title>DynamoDBuilder</title>
</svelte:head>

<div class="flex flex-col h-screen">
	<Navbar />

	<div class="flex justify-center flex-grow pb-10">
		<slot />
	</div>

	<Footer />
</div>
