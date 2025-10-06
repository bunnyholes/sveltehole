<script>
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	const { children } = $props();
</script>

<div class="container mx-auto max-w-6xl space-y-6 px-6 py-8">
	<Breadcrumb />
	{@render children?.()}
</div>
