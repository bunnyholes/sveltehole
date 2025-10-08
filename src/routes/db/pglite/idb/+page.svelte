<script>
    import { todo } from '$lib/db/idb/todo-pglite-idb.svelte.js';
    import * as Callout from '$lib/components/callout';
    import TodoCard from '$lib/components/TodoCard.svelte';
</script>

<svelte:head>
    <title>PGLite IDB Sample</title>
</svelte:head>

<section class="space-y-6">
    <div class="space-y-4">
        <h1 class="text-3xl font-semibold">PGLite IndexedDB Sample</h1>
        <p class="text-gray-600 dark:text-gray-400">
            브라우저의 IndexedDB를 사용한 영구 저장소입니다. Add Item 버튼으로 데이터를 추가할 수 있습니다.
        </p>

        <Callout.Root variant="info">
            <Callout.Header>
                <h3 class="font-semibold">SEQUENCE 캐시 동작</h3>
            </Callout.Header>
            <Callout.Content>
                <p>
                    PostgreSQL의 기본 동작이며 32개씩 캐시하기 때문에 화면을 새로 로드할 때마다 32개씩 올라갑니다.
                    화면 자체에서 새로운 글을 쓰면 시퀀스는 정상적으로 올라갑니다.
                </p>
            </Callout.Content>
        </Callout.Root>
    </div>

    {#if todo.error}
        <Callout.Root variant="error">
            <Callout.Header>
                <h3 class="font-semibold">오류 발생</h3>
            </Callout.Header>
            <Callout.Content>
                <p>{todo.error}</p>
            </Callout.Content>
        </Callout.Root>
    {:else}
        <div class="space-y-3">
            <header class="flex justify-between items-center">
                <h3 class="flex-1">Todo Items ({todo.loading ? 0 : todo.items.length})</h3>
                <div class="flex gap-2">
                    <button
                        class="btn btn-sm preset-tonal-surface"
                        onclick={() => todo.addItem()}
                        disabled={todo.loading}
                    >
                        Add Item
                    </button>
                    <button
                        class="btn btn-sm preset-tonal-error"
                        onclick={() => todo.clearAll()}
                        disabled={todo.loading}
                    >
                        Clear All
                    </button>
                </div>
            </header>

            {#if todo.loading}
                {#each Array(3) as _}
                    <TodoCard />
                {/each}
            {:else}
                {#each todo.items as item (item.id)}
                    <TodoCard {item} onToggle={(id) => todo.toggleComplete(id)} />
                {/each}
            {/if}
        </div>
    {/if}

    <Callout.Root variant="warning">
        <Callout.Header>
            <h3 class="font-semibold">브라우저에서 IndexedDB 데이터 완전히 삭제하기</h3>
        </Callout.Header>
        <Callout.Content>
            <p class="mb-3">
                Clear All 버튼은 테이블의 데이터만 삭제합니다.
                IndexedDB 자체를 완전히 삭제하려면 브라우저 개발자 도구를 사용하세요.
            </p>
            <ol class="list-decimal list-inside space-y-2">
                <li><strong>Chrome/Edge:</strong> F12 → Application 탭 → Storage → IndexedDB → <code>idb://sveltehole-pglite</code> 우클릭 → Delete database</li>
                <li><strong>Firefox:</strong> F12 → Storage 탭 → Indexed DB → <code>idb://sveltehole-pglite</code> 우클릭 → Delete "idb://sveltehole-pglite"</li>
                <li><strong>Safari:</strong> 개발자 메뉴 → 웹 속성 → Storage 탭 → Indexed Databases → <code>idb://sveltehole-pglite</code> 선택 → 삭제</li>
            </ol>
        </Callout.Content>
    </Callout.Root>
</section>
