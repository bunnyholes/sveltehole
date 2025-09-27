<script>
	import { page } from '$app/state';

	const segments = $derived(page.url.pathname.split('/').filter(Boolean));
	
	const breadcrumbItems = $derived([
		{ label: '/', href: '/' },
		...segments.map((segment, index) => ({
			label: segment,
			href: index < segments.length - 1 ? '/' + segments.slice(0, index + 1).join('/') : undefined
		}))
	]);
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex items-center gap-3 text-xs text-surface-600-400">
		{#each breadcrumbItems as item, index (item.label)}
			<li class="flex items-center gap-3">
				{#if item.href}
					<a
						href={item.href}
						class="text-surface-600-400 hover:text-primary-500 hover:underline"
					>
						{item.label}
					</a>
				{:else}
					<span aria-current="page" class="font-medium text-surface-950-50">
						{item.label}
					</span>
				{/if}
				{#if index < breadcrumbItems.length - 1}
					<span class="text-surface-400-600" aria-hidden="true">&rsaquo;</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
