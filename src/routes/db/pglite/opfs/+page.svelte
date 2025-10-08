<script>
	import { todoOpfs } from '$lib/db/opfs/todo-pglite-opfs.svelte.js';
	import * as Callout from '$lib/components/callout';
	import TodoCard from '$lib/components/TodoCard.svelte';
</script>

<svelte:head>
	<title>PGLite OPFS Sample</title>
</svelte:head>

<section class="space-y-6">
	<div class="space-y-4">
		<h1 class="text-3xl font-semibold">PGLite OPFS Sample</h1>
		<p class="text-gray-600 dark:text-gray-400">
			Web Worker와 Origin Private File System을 사용한 고성능 PostgreSQL 데모입니다.
		</p>

		<div class="space-y-3">
			<h3 class="text-lg font-semibold">OPFS의 장점</h3>
			<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
				<li>
					<strong>Web Worker 실행:</strong> 메인 스레드를 차단하지 않아 UI가 부드럽게 동작합니다.
				</li>
				<li>
					<strong>고성능 파일 시스템:</strong> File System Access API를 사용하여 IndexedDB보다 빠른 I/O 성능을 제공합니다.
				</li>
				<li>
					<strong>동기식 API:</strong> Worker 내부에서 동기식 파일 API를 사용할 수 있어 PostgreSQL과의 호환성이 뛰어납니다.
				</li>
			</ul>
		</div>

		<Callout.Root variant="warning">
			<Callout.Header>
				<h3 class="font-semibold">브라우저 호환성</h3>
			</Callout.Header>
			<Callout.Content>
				<p>
					OPFS는 <strong>최신 브라우저</strong>(Chrome 102+, Edge 102+, Safari 15.2+)에서만 지원됩니다.
					구형 브라우저에서는 IndexedDB 버전을 사용하세요.
				</p>
			</Callout.Content>
		</Callout.Root>

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

	{#if !todoOpfs.supported}
		<Callout.Root variant="error">
			<Callout.Header>
				<h3 class="font-semibold">OPFS 미지원</h3>
			</Callout.Header>
			<Callout.Content>
				<p class="mb-2">
					현재 브라우저는 OPFS(Origin Private File System)를 지원하지 않습니다.
				</p>
				<p class="mb-2">
					<strong>권장 브라우저:</strong> Chrome 102+, Edge 102+, Opera 88+
				</p>
				<p>
					<strong>Safari 사용자:</strong> Safari는 현재 OPFS Access Handle Pool을 지원하지 않습니다.
					<a href="/db/pglite/idb" class="underline text-blue-600 dark:text-blue-400">
						IndexedDB 버전
					</a>을 사용해주세요.
				</p>
				{#if todoOpfs.error}
					<p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
						상세 오류: {todoOpfs.error}
					</p>
				{/if}
			</Callout.Content>
		</Callout.Root>
	{:else if todoOpfs.error}
		<Callout.Root variant="error">
			<Callout.Header>
				<h3 class="font-semibold">오류 발생</h3>
			</Callout.Header>
			<Callout.Content>
				<p>{todoOpfs.error}</p>
			</Callout.Content>
		</Callout.Root>
	{:else}
		<div class="space-y-3">
			<header class="flex justify-between items-center">
				<h3 class="flex-1">Todo Items ({todoOpfs.loading ? 0 : todoOpfs.items.length})</h3>
				<div class="flex gap-2">
					<button
						class="btn btn-sm preset-tonal-surface"
						onclick={() => todoOpfs.refresh()}
						disabled={todoOpfs.loading}
					>
						Add Item
					</button>
					<button
						class="btn btn-sm preset-tonal-error"
						onclick={() => todoOpfs.clearAll()}
						disabled={todoOpfs.loading}
					>
						Clear All
					</button>
				</div>
			</header>

			{#if todoOpfs.loading}
				{#each Array(3) as _}
					<TodoCard />
				{/each}
			{:else}
				{#each todoOpfs.items as item (item.id)}
					<TodoCard {item} onToggle={(id) => todoOpfs.toggleComplete(id)} />
				{/each}
			{/if}
		</div>
	{/if}

	<Callout.Root variant="warning">
		<Callout.Header>
			<h3 class="font-semibold">브라우저에서 OPFS 데이터 완전히 삭제하기</h3>
		</Callout.Header>
		<Callout.Content>
			<p class="mb-3">
				Clear All 버튼은 테이블의 데이터만 삭제합니다.
				OPFS(Origin Private File System) 자체를 완전히 삭제하려면 브라우저 개발자 도구를 사용하세요.
			</p>
			<ol class="list-decimal list-inside space-y-2">
				<li><strong>Chrome/Edge:</strong> F12 → Application 탭 → Storage → Origin Private File System → 파일 선택 → Delete 또는 Clear storage 사용</li>
				<li><strong>Firefox:</strong> OPFS는 Storage 탭에서 직접 확인이 어려우므로, 사이트 데이터 전체 삭제 (F12 → Storage → 우클릭 → Delete All)</li>
				<li><strong>Safari:</strong> 개발자 메뉴 → 웹 속성 → Storage 탭에서 사이트 데이터 전체 삭제</li>
			</ol>
			<p class="mt-3 text-sm">
				<strong>팁:</strong> 가장 간단한 방법은 Chrome/Edge에서 Application 탭 → Storage 섹션 하단의 "Clear site data" 버튼을 사용하는 것입니다.
			</p>
		</Callout.Content>
	</Callout.Root>
</section>
