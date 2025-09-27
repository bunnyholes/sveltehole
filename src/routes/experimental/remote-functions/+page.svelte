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

<main class="p-4 space-y-8">
	<header>
		<h2 class="preset-typo-headline mb-4">Remote Functions</h2>
		<p class="preset-typo-caption">
			SvelteKit의 Remote Function을 활용해 클라이언트-서버 간 타입 안전한 상호작용을 설계하는 방법을 살펴보세요.
		</p>
	</header>

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
