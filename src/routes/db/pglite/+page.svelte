<script>
	const demos = [
		{
			title: 'IndexedDB (IDB)',
			description: '브라우저의 IndexedDB를 사용한 영구 저장소',
			link: '/db/pglite/idb'
		},
		{
			title: 'OPFS (Origin Private File System)',
			description: 'Web Worker와 고성능 파일 시스템을 사용한 저장소',
			link: '/db/pglite/opfs'
		}
	];
</script>

<svelte:head>
	<title>PGLite Demo</title>
</svelte:head>

<article class="p-4 space-y-8">
	<header>
		<h1>PGLite Storage Demo</h1>
		<p>
			브라우저에서 PostgreSQL을 실행하는 PGLite 데모입니다.
			두 가지 스토리지 백엔드를 비교해보세요.
		</p>
	</header>

	<section class="space-y-2">
		<header>
			<h3 class="mb-4">스토리지 백엔드</h3>
		</header>

		{#each demos as demo}
			<a href={demo.link} class="btn preset-filled-secondary-300-700 w-full">
				{demo.title}
			</a>
		{/each}
	</section>
</article>
