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

<section class="space-y-8">
	<header class="space-y-3">
		<h1 class="text-3xl font-bold text-slate-900">Remote Functions</h1>
		<p class="text-lg text-slate-600">
			SvelteKit의 Remote Function을 활용해 클라이언트-서버 간 타입 안전한 상호작용을 설계하는 방법을 살펴보세요.
		</p>
	</header>

	<div class="space-y-2">
		<h2 class="text-2xl font-semibold text-slate-900">데모 선택</h2>
		<p class="text-slate-600 text-sm">확인하고 싶은 패턴을 선택하세요.</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		{#each demos as demo}
			<a
				href={demo.link}
				class="block h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
			>
			<div class="space-y-2">
				<h3 class="text-xl font-semibold text-slate-900">{demo.title}</h3>
				<p class="text-sm text-slate-600">{demo.description}</p>
			</div>
		</a>
	{/each}
	</div>
</section>
