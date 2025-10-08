<script>
	const demos = [
		{
			title: 'IndexedDB (IDB)',
			description: 'IndexedDB를 사용한 PGLite 저장소',
			link: '/db/pglite/idb'
		},
		{
			title: 'OPFS',
			description: 'Origin Private File System을 사용한 PGLite 저장소',
			link: '/db/pglite/opfs'
		}
	];
</script>

<svelte:head>
	<title>Database Demos</title>
</svelte:head>

<article class="p-4 space-y-8">
	<header>
		<h1>Database Demos</h1>
		<p>
			DB 관련 샘플을 탐색하세요.
		</p>
	</header>

	<section class="grid">
		<header>
			<h3 class="mb-4">개요 페이지</h3>
		</header>

		<a href="/db/pglite" class="btn preset-filled-surface-300-700 w-full">
			PGLite Storage
		</a>
	</section>

	<section class="space-y-2">
		<header>
			<h3 class="mb-4">빠른 실행</h3>
		</header>

		{#each demos as demo}
			<a href={demo.link} class="btn preset-filled-secondary-300-700 w-full">
				{demo.title}
			</a>
		{/each}
	</section>
</article>
