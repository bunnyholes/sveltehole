<script>
    import { getGuestbookItem } from '$lib/remote/data.remote.js';
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
	<title>Remote Functions - Query</title>
</svelte:head>

<article class="p-4 space-y-8">
    <header>
        <h1>Query</h1>
        <p>
            <code>query</code>는 어디서든 호출할 수 있지만 항상 서버에서 실행됩니다. 자동 캐싱과 타입 안전성을 제공합니다.
        </p>
    </header>

    <section class="space-y-2">
        <header class="flex justify-between items-center">
            <h3 class="flex-1">데모</h3>
            <button
                    class="btn btn-sm preset-tonal-surface"
                    onclick={() => {
                        itemIds.forEach(id => getGuestbookItem(id).refresh());
                    }}
            >
                새로고침
            </button>
        </header>
        
        <div class="flex flex-col gap-2">
        {#each itemIds as id}
            {@const query = getGuestbookItem(id)}

            {#if query.error}
                <div class="p-4 bg-error-100-900 rounded-lg border border-error-200-800">
                    <div class="text-center py-4 text-error-500">
                        <p>로딩 실패</p>
                        <p class="mt-1 text-error-400-600">{query.error.message}</p>
                    </div>
                </div>
            {:else if !query.current && !query.loading}
                <div class="p-4 bg-surface-200-800 rounded-lg text-center">
                    <p class="text-surface-600-400">방명록을 찾을 수 없습니다.</p>
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
            동일한 인자로 호출하면 같은 인스턴스를 반환해 캐시를 공유합니다. <code>.refresh()</code>로 최신 데이터를 다시 가져올 수 있습니다.
        </p>
        <p>
            이 데모는 항목을 개별로 불러와 N+1 문제를 재현합니다.
        </p>
    </section>

    <Callout.Root variant="info">
		<Callout.Header>
			다중 요청 문제
		</Callout.Header>

		<Callout.Content>
            <ul class="list-disc list-inside space-y-1 text-sm">
                <li>4개의 <code>query</code>가 각각 요청이 발생합니다.</li>
                <li>N개의 요청이 필수적으로 발생합니다.</li>
            </ul>
        </Callout.Content>

		<Callout.Footer>
            <a href="/experimental/remote-functions/query-batch" class="font-semibold underline underline-offset-4 hover:text-primary-800-200">
                Query Batch 데모
            </a>에서 <code>query.batch</code>로 해결한 결과를 확인하세요.
		</Callout.Footer>
    </Callout.Root>

</article>
