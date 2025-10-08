<script>
	let { children } = $props();
</script>

<header class="p-4 bg-white/50 dark:bg-black/50">
	{@render children()}
</header>
