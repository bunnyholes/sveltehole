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
            Remote Function의 <code>query</code>를 활용한 예제입니다.
        </p>
    </header>

    <section class="space-y-2">
        <header class="flex justify-between">
            <h3 class="flex-1">데모</h3>
            <button
                    class="btn preset-filled-tertiary-500"
                    onclick={() => {
                        // 각 아이템 ID에 대해 개별적으로 refresh 호출
                        itemIds.forEach(id => getGuestbookItem(id).refresh());
                    }}
            >
                Refresh
            </button>
        </header>
        
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

    </section>

    <Callout.Root variant="info">
		<Callout.Header>
			N+1 문제 발생
		</Callout.Header>
		
		<Callout.Content>
            <section class="space-y-2">
                <div class="font-semibold">현재 상황</div>
                <ul class="list-disc list-inside">
                    <li>4개의 개별 DB 쿼리가 실행되고 있습니다</li>
                    <li>각 <code>getGuestbookItem(id)</code> 호출이 별도의 네트워크 요청을 생성</li>
                    <li>개발자 도구 Network 탭에서 4개의 개별 요청 확인 가능</li>
                    <li>응답 시간: ~200ms × 4 = ~800ms (순차적일 경우)</li>
                </ul>
            </section>

            <section class="space-y-2">
                <div class="font-semibold">실제 문제 상황</div>
                <ul class="list-disc list-inside">
                    <li>100개 댓글 = 100번 DB 쿼리 (매우 느림)</li>
                    <li>서버 부하 증가, DB 커넥션 풀 고갈 위험</li>
                </ul>
            </section>
        </Callout.Content>
		
		<Callout.Footer>
            <a href="/experimental/remote-functions/query-batch" class="font-semibold underline underline-offset-4 hover:text-primary-800-200">
                Query Batch 데모
            </a>에서
            <code>query.batch</code>로 해결된 모습을 확인하세요
		</Callout.Footer>
    </Callout.Root>

</article>
