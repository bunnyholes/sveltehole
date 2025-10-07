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

<svelte:head>
	<title>Remote Functions - Overview</title>
</svelte:head>

<article class="p-4 space-y-8">
	<header>
		<h2 class="mb-4">Remote Functions</h2>
		<p>
			SvelteKit의 Remote Function을 활용해 클라이언트-서버 간 타입 안전한 상호작용을 설계하는 방법을 살펴보세요.
		</p>
	</header>

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
