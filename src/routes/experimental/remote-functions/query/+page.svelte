<script>
    import { getGuestbookItem } from '../data.remote.js';

    const itemIds = [
        '00000000-0000-4000-8000-guestbook001',
        '00000000-0000-4000-8000-guestbook002',
        '00000000-0000-4000-8000-guestbook003',
        '00000000-0000-4000-8000-guestbook004'
    ];
</script>

<svelte:head>
	<title>Remote Functions - Query</title>
</svelte:head>

<section class="space-y-6">
	<div class="space-y-3">
		<h2 class="text-2xl font-semibold text-slate-900">Query</h2>
		<p class="text-slate-600">Remote Function의 Query를 활용한 예제입니다.</p>
	</div>

    <section class="mb-8 space-y-6">
        <div class="flex justify-end mb-4">
            <button
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    onclick={() => {
                        // 각 아이템 ID에 대해 개별적으로 refresh 호출
                        itemIds.forEach(id => getGuestbookItem(id).refresh());
                    }}
            >
                Refresh
            </button>
        </div>
        
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {#each itemIds as id}
                {#await getGuestbookItem(id)}
                    <!-- 로딩 상태 -->
                    <div class="bg-slate-200 rounded-lg h-20 animate-pulse"></div>
                {:then item}
                    {#if item}
                        <div class="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="font-medium text-slate-900">{item.name}</h4>
                                <time class="text-xs text-slate-500">
                                    {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                                </time>
                            </div>
                            <p class="text-sm text-slate-600 leading-relaxed">{item.message}</p>
                        </div>
                    {:else}
                        <div class="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                            <div class="text-center py-4 text-slate-500">
                                <p class="text-sm">방명록을 찾을 수 없습니다.</p>
                            </div>
                        </div>
                    {/if}
                {:catch error}
                    <div class="p-4 bg-white rounded-lg shadow-sm border border-red-200">
                        <div class="text-center py-4 text-red-500">
                            <p class="text-sm font-medium">로딩 실패</p>
                            <p class="text-xs mt-1">{error.message}</p>
                        </div>
                    </div>
                {/await}
            {/each}
        </div>

        <div class="p-5 bg-amber-50 border border-amber-200 rounded-xl">
            <p class="text-sm text-amber-900">
                <strong>🚦 성능 주의:</strong> 이 데모는 매 렌더마다 최대 4개의 네트워크 요청이 발생합니다. 동일 유형의 데이터를 여러 아이디로 불러오는 경우에는 <a href="/experimental/remote-functions/query-batch" class="font-semibold text-amber-900 underline underline-offset-2">Query Batch Demo</a>처럼 <code>query.batch</code>를 적용해 하나의 요청으로 묶는 것이 비용을 크게 줄여줍니다.
            </p>
        </div>
    </section>

</section>