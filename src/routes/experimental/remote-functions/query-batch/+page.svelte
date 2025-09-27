<script>
	import { getGuestbookItems } from '$lib/remote/data.remote.js';
	import GuestbookCard from '$lib/components/GuestbookCard.svelte';

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

<main class="p-4 space-y-8">
	<header>
		<h2 class="preset-typo-headline">Query Batch</h2>
		<p class="preset-typo-caption">
			Remote Function의 <code>query.batch</code> 동작을 살펴보는 예제입니다.
		</p>
	</header>

	<section class="space-y-2">
		<header class="flex justify-between">
			<h3 class="preset-typo-title flex-1">데모</h3>
			<button
					class="btn preset-filled-tertiary-500"
					onclick={() => {
				// 배치 쿼리의 경우 개별 ID로 refresh 호출
				itemIds.forEach(id => getGuestbookItems(id).refresh());
			}}
			>
				Refresh
			</button>
		</header>

		<div class="grid gap-2 md:grid-cols-2">
				{#each itemIds as id}
					{@const query = getGuestbookItems(id)}
					
					{#if query.error}
						<div class="p-4 bg-error-100-900 border border-error-200-800 rounded-lg">
							<p class="preset-typo-caption text-error-500">{query.error.message}</p>
						</div>
					{:else if !query.current && !query.loading}
						<div class="p-4 bg-surface-200-800 rounded-lg text-center">
							<p class="preset-typo-caption text-surface-600-400">항목을 찾을 수 없습니다.</p>
						</div>
					{:else}
						<GuestbookCard entry={query.loading ? null : query.current} />
					{/if}
				{/each}
		</div>
	</section>

	<article class="card preset-filled-primary-200-800 divide-y divide-primary-300-700">
		<header class="p-4">
			<h2 class="preset-typo-title text-primary-700-300">SvelteKit query.batch의 의의</h2>
		</header>
		
		<div class="p-4 space-y-6">
			<section>
				<h3 class="preset-typo-title text-primary-700-300 mb-3">핵심 개념 (공식 문서)</h3>
				<p class="text-primary-600-400">
					"query.batch는 query와 동일하게 작동하지만, 동일한 매크로태스크 내에서 발생하는 요청들을 배치 처리합니다."
				</p>
			</section>
			
			<section>
				<h3 class="preset-typo-title text-primary-700-300 mb-3">개발자 관점</h3>
				<ul class="list-disc list-inside space-y-2 text-primary-600-400">
					<li>사용법 - <code class="px-1 py-0.5 rounded preset-filled-primary-100-900">getGuestbookItems(id)</code> - 단일 키 조회처럼 사용</li>
					<li>각 컴포넌트는 독립적으로 자신의 데이터만 요청</li>
					<li>일반 query와 100% 동일한 API</li>
				</ul>
			</section>
			
			<section>
				<h3 class="preset-typo-title text-primary-700-300 mb-3">프레임워크 백그라운드</h3>
				<ul class="list-disc list-inside space-y-2 text-primary-600-400">
					<li>동일 매크로태스크의 모든 호출을 자동 수집</li>
					<li>N개 요청 → 1개 배치 요청으로 자동 변환</li>
					<li><code class="px-1 py-0.5 rounded preset-filled-primary-100-900">WHERE id IN (...)</code> 단일 쿼리로 최적화</li>
				</ul>
			</section>
			
			<section>
				<h3 class="preset-typo-title text-primary-700-300 mb-3">비교</h3>
				<ul class="list-disc list-inside space-y-2 text-primary-600-400">
					<li><strong>일반 query</strong> - 4개 호출 = 4번 DB 쿼리 = 4번 네트워크 요청</li>
					<li><strong>query.batch</strong> - 4개 호출 = 1번 DB 쿼리 = 1번 네트워크 요청</li>
				</ul>
			</section>
		</div>
		
		<footer class="p-4 preset-filled-primary-100-900">
			<h3 class="preset-typo-title text-primary-700-300 mb-2">실제 활용</h3>
			<p class="text-primary-600-400">
				댓글 작성자, 장바구니 상품, 팔로워 프로필 등 N+1 문제 자동 해결
			</p>
		</footer>
	</article>

</main>
