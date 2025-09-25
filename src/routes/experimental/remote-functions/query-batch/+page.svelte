<script>
	import { getGuestbookEntries } from '../data.remote.js';
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
					onclick={() => getGuestbookEntries().refresh()}
			>
				Refresh
			</button>
		</div>

		<div class="space-y-4">
			<h3 class="text-lg font-medium text-slate-900">전체 방명록</h3>
			<div class="space-y-3">
				{#await getGuestbookEntries()}
					<div class="animate-pulse space-y-3">
						{#each Array(3) as _}
							<div class="p-4 bg-slate-200 rounded-lg h-20"></div>
						{/each}
					</div>
				{:then entries}
					{#if entries && entries.length > 0}
						{#each entries as entry}
							<div class="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
								<div class="flex justify-between items-start mb-2">
									<h4 class="font-medium text-slate-900">{entry.name}</h4>
									<time class="text-xs text-slate-500">
										{new Date(entry.createdAt).toLocaleDateString('ko-KR')}
									</time>
								</div>
								<p class="text-sm text-slate-600 leading-relaxed">{entry.message}</p>
							</div>
						{/each}
					{:else}
						<div class="text-center py-8 text-slate-500">
							<p class="text-sm">아직 방명록이 없습니다.</p>
						</div>
					{/if}
				{:catch error}
					<div class="p-4 bg-red-50 border border-red-200 rounded-lg">
						<p class="text-red-800 text-sm">{error.message}</p>
					</div>
				{/await}
			</div>
		</div>

		<div class="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
			<p class="text-sm text-emerald-900">
				<strong>🚀 Batch 패턴:</strong> Remote Function의 <code>query.batch</code>를 사용하면 여러 데이터를 한 번의 요청으로 효율적으로 가져올 수 있습니다. 대량의 데이터를 처리할 때 네트워크 비용을 크게 줄여줍니다.
			</p>
		</div>
	</section>

</section>
