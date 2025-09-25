<script>
	import { getGuestbookItems } from '../data.remote.js';

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

<section class="space-y-6">
	<div class="space-y-3">
		<h2 class="text-2xl font-semibold text-slate-900">Query Batch</h2>
		<p class="text-slate-600">Remote Function의 <code>query.batch</code>를 활용한 예제입니다.</p>
	</div>

	<section class="mb-8 space-y-6">
		<div class="flex justify-end mb-4">
			<button
					class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
					onclick={() => {
				// 배치 쿼리의 경우 개별 ID로 refresh 호출
				itemIds.forEach(id => getGuestbookItems(id).refresh());
			}}
			>
				Refresh
			</button>
		</div>

		<div class="space-y-4">
			<h3 class="text-lg font-medium text-slate-900">개별 방명록 항목들</h3>
			<div class="grid gap-4 md:grid-cols-2">
				{#each itemIds as id}
					{#await getGuestbookItems(id)}
						<div class="p-4 bg-slate-200 rounded-lg h-20 animate-pulse"></div>
					{:then entry}
						{#if entry}
							<div class="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
								<div class="flex justify-between items-start mb-2">
									<h4 class="font-medium text-slate-900">{entry.name}</h4>
									<time class="text-xs text-slate-500">
										{new Date(entry.createdAt).toLocaleDateString('ko-KR')}
									</time>
								</div>
								<p class="text-sm text-slate-600 leading-relaxed">{entry.message}</p>
							</div>
						{:else}
							<div class="p-4 bg-gray-50 rounded-lg text-center">
								<p class="text-sm text-gray-500">항목을 찾을 수 없습니다.</p>
							</div>
						{/if}
					{:catch error}
						<div class="p-4 bg-red-50 border border-red-200 rounded-lg">
							<p class="text-red-800 text-sm">{error.message}</p>
						</div>
					{/await}
				{/each}
			</div>
		</div>

		<div class="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
			<p class="text-sm text-emerald-900">
				<strong>🚀 Batch 패턴:</strong> Remote Function의 <code>query.batch</code>를 사용하면 여러 데이터를 한 번의 요청으로 효율적으로 가져올 수 있습니다. 대량의 데이터를 처리할 때 네트워크 비용을 크게 줄여줍니다.
			</p>
		</div>
	</section>

</section>
