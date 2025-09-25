<script>
	import { Github } from '@lucide/svelte';
</script>

<header id="main-header" class="h-20 content-center sticky top-0 bg-white/80 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
		<div class="flex flex-1 items-center gap-3">
			<h2 class="text-lg font-semibold text-slate-900 uppercase">SvelteHole</h2>
		</div>
		<div class="flex items-center text-sm">
			<a class="inline-flex items-center gap-2 rounded-full px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
			   href="https://github.com/bunnyholes/sveltehole" target="_blank" rel="noreferrer noopener">
				<Github class="w-5 h-5" />
			</a>
		</div>
	</div>
</header>