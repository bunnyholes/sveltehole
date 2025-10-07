<script>
	import { getGuestbookItems } from '$lib/remote/data.remote.js';
	import GuestbookCard from '$lib/components/GuestbookCard.svelte';
	import * as Callout from '$lib/components/callout/index.js';

	const itemIds = [
		'00000000-0000-4000-8000-guestbook001',
		'00000000-0000-4000-8000-guestbook002',
		'00000000-0000-4000-8000-guestbook003',
		'00000000-0000-4000-8000-guestbook004'
	];
</script>



<svelte:head>
	<title>Remote Functions - Query Batch</title>
</svelte:head>

<article class="p-4 space-y-8">
	<header>
		<h1>Query Batch</h1>
		<p>
			<code>query.batch</code>는 같은 틱에서 호출된 쿼리를 하나의 요청으로 묶습니다. N+1 문제를 자동으로 해결합니다.
		</p>
	</header>

	<section class="space-y-2">
		<header class="flex justify-between items-center">
			<h3 class="flex-1">데모</h3>
			<button
					class="btn btn-sm preset-tonal-surface"
					onclick={() => {
				itemIds.forEach(id => getGuestbookItems(id).refresh());
			}}
			>
				새로고침
			</button>
		</header>

		<div class="flex flex-col gap-2">
				{#each itemIds as id}
					{@const query = getGuestbookItems(id)}
					
					{#if query.error}
						<div class="p-4 bg-error-100-900 border border-error-200-800 rounded-lg">
							<p class="text-error-500">{query.error.message}</p>
						</div>
					{:else if !query.current && !query.loading}
						<div class="p-4 bg-surface-200-800 rounded-lg text-center">
							<p class="text-surface-600-400">항목을 찾을 수 없습니다.</p>
						</div>
					{:else}
						<GuestbookCard entry={query.loading ? null : query.current} />
					{/if}
				{/each}
		</div>
	</section>

	<section class="space-y-2">
		<h2 class="text-lg font-semibold">작동 방식</h2>
		<p>
			일반 <code>query</code>와 API가 동일하지만, 같은 틱의 호출을 자동으로 묶어 하나의 요청으로 전송합니다.
		</p>
		<p>
			서버는 <code>WHERE id IN (...)</code> 같은 단일 쿼리로 처리해 DB 접근을 최소화합니다.
		</p>
	</section>

	<Callout.Root variant="info">
		<Callout.Header>
			장점
		</Callout.Header>

		<Callout.Content>
			<ul class="list-disc list-inside space-y-1 text-sm">
				<li>4번 호출해도 네트워크와 DB 쿼리는 1번만 실행됩니다.</li>
				<li>컴포넌트 코드 변경 없이 자동으로 최적화됩니다.</li>
				<li>항목별 UI 구성을 유지하면서 N+1 문제를 해결합니다.</li>
			</ul>
		</Callout.Content>

		<Callout.Footer>
			항목 수가 많은 리스트에서 특히 효과적입니다.
		</Callout.Footer>
	</Callout.Root>

</article>
