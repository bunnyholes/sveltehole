<script>
	import Github from '@lucide/svelte/icons/github';
</script>

<header
	id="main-header"
	class="sticky top-0 flex h-20 bg-surface-50-950/70 backdrop-blur"
>
	<section class="flex-1 content-center-safe pl-6 overflow-x-auto">
		<h1 class="preset-typo-title uppercase">SvelteHole</h1>
	</section>
	<section>
		<a
			class="grid place-items-center-safe h-20 w-20 hover:preset-tonal-secondary"
			href="https://github.com/bunnyholes/sveltehole"
			target="_blank"
			rel="noreferrer noopener"
		>
			<Github />
		</a>
	</section>
</header>
