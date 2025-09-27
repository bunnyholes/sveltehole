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

<main class="p-4 space-y-8">
    <header>
        <h2 class="preset-typo-headline">실험실</h2>
        <p class="preset-typo-caption">
            실험 기능을 활용한 데모 목록입니다.
        </p>
    </header>

	<section class="grid">
        <header>
            <h3 class="preset-typo-title mb-4">하위 페이지</h3>
        </header>

		<a href="/experimental/remote-functions" class="card p-4 preset-filled-surface-300-700 hover:preset-filled-surface-400-600 ">
			<h3 class="preset-typo-title">remote functions</h3>
			<p class="preset-typo-body-2 mt-2">타입 안전한 서버-클라이언트 통신</p>
		</a>
	</section>

    <section class="space-y-2">
        <header>
            <h3 class="preset-typo-title mb-4">데모 선택</h3>
        </header>

        {#each demos as demo}
            <a href={demo.link} class="flex flex-col card p-4 preset-filled-surface-300-700 hover:preset-filled-surface-400-600 ">
                <h3 class="preset-typo-title">{demo.title}</h3>
                <p class="preset-typo-body-2 mt-2">{demo.description}</p>
            </a>
        {/each}
    </section>
</main>
