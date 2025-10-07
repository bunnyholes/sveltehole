<script>
	const demos = [
		{
			title: 'Query',
			description: '독립 Remote Function 호출과 스트리밍 UX 비교',
			link: '/experimental/remote-functions/query'
		},
		{
			title: 'Query Batch',
			description: '동일 데이터 요청을 배치해 N+1 문제 줄이기',
			link: '/experimental/remote-functions/query-batch'
		},
		{
			title: 'Form',
			description: 'Form을 활용한 타입 안전한 데이터 제출과 유효성 검사',
			link: '/experimental/remote-functions/form'
		}
	];
</script>

<article class="p-4 space-y-8">
    <header>
        <h1>실험실</h1>
        <p>
            실험 기능을 활용한 데모 목록입니다.
        </p>
    </header>

	<section class="grid">
        <header>
            <h3 class="mb-4">개요 페이지</h3>
        </header>

		<a href="/experimental/remote-functions" class="btn preset-filled-surface-300-700 w-full">
			remote functions
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
