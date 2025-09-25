<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SvelteHole - 스벨트 데모 저장소</title>
</svelte:head>

<Sidebar />

<div class="flex min-h-screen flex-col divide-y divide-slate-200">
    <Header />

    {@render children?.()}
</div>
