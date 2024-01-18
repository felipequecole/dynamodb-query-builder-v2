<script>
	import BiCodeCurly from 'svelte-icons-pack/bi/BiCodeCurly';
	import FaBrandsTwitter from 'svelte-icons-pack/fa/FaBrandsTwitter';
	import BsLinkedin from 'svelte-icons-pack/bs/BsLinkedin';
	import FaBrandsGithub from 'svelte-icons-pack/fa/FaBrandsGithub';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { PRIMARY_COLOR } from '$lib/constants.js';
</script>

<footer
	class="footer items-center p-4 bg-neutral text-neutral-content sticky top-[100vh] bottom-0 left-0 pt-4"
>
	<aside class="items-center grid-flow-col">
		<Icon src={BiCodeCurly} color={PRIMARY_COLOR} className="fill-current" size="1.5em" />
		<p>fquecole © 2024 - All right reserved</p>
	</aside>
	<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
		<a href="https://twitter.com/felipequecole">
			<Icon src={FaBrandsTwitter} color={PRIMARY_COLOR} className="fill-current" size="1.5em" />
		</a>
		<a href="https://www.linkedin.com/in/felipequecole/">
			<Icon src={BsLinkedin} color={PRIMARY_COLOR} className="fill-current" size="1.5em" />
		</a>
		<a href="https://github.com/felipequecole">
			<Icon src={FaBrandsGithub} color={PRIMARY_COLOR} className="fill-current" size="1.5em" />
		</a>
	</nav>
</footer>
