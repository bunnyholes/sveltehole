<script>
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	const { children } = $props();
</script>

<div class="container mx-auto max-w-6xl px-6 py-8 space-y-6">
	<Breadcrumb />
    {@render children?.()}
</div>
