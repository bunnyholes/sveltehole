<script>
	import { addGuestbookEntry, getGuestbookEntries } from '$lib/remote/data.remote.js';
	import { page } from '$app/state';
	import { guestbookFormSchema } from '$lib/validation/guestbookFormSchema.js';
	import GuestbookCard from '$lib/components/GuestbookCard.svelte';
	import * as Callout from '$lib/components/callout/index.js';
	
	// Svelte 5 Rune을 사용한 상태 관리
	let uuidInput = $state();

	// Remote Query 함수로 방명록 항목 조회
	// query는 서버에서만 실행되며 타입 안전성이 보장됨
	const entriesQuery = getGuestbookEntries();
	
	/**
	 * SvelteKit Remote Form 기술 스택 및 실행 흐름
	 * 
	 * 1. preflight(schema) - 클라이언트 사전 검증
	 *    - 목적: 불필요한 서버 요청 차단으로 검증 비용 절감
	 *    - JS 있음: 클라이언트에서 Standard Schema로 사전 검증
	 *    - JS 없음: 건너뛰고 서버에서 검증
	 * 
	 * 2. enhance(callback) - Progressive Enhancement 구현
	 *    - 목적: JavaScript 유무와 관계없이 동작하는 견고한 폼
	 *    - JS 없음: 전통적 HTML 폼 제출 (페이지 새로고침)
	 *    - JS 있음: AJAX 제출 (페이지 새로고침 없음)
	 *    - 콜백 파라미터: form (HTML element), data (FormData), submit (제출 함수)
	 * 
	 * 3. submit().updates() - Single-Flight Mutations
	 *    - 목적: 한 번의 서버 요청으로 폼 제출과 쿼리 업데이트 동시 처리
	 *    - 두 번째 서버 왕복 없이 효율적인 데이터 동기화
	 * 
	 * 4. withOverride(callback) - Optimistic UI Updates  
	 *    - 목적: 네트워크 지연 시간 동안 즉각적인 UI 피드백
	 *    - 동작: 임시 UI 업데이트 → 서버 응답 → 실제 데이터로 교체
	 *    - 실패 시: 자동 롤백으로 이전 상태 복원
	 * 
	 * 실행 순서:
	 * 사용자 입력 → preflight 검증 → enhance 콜백 → submit().updates() 
	 * → withOverride (즉시 UI 업데이트) → 서버 처리 → 실제 데이터 반영/롤백
	 */
	const guestbookForm = addGuestbookEntry
		.preflight(guestbookFormSchema)
		.enhance(async ({ form, submit, data }) => {
			try {
				// 1. Optimistic Entry 생성 (서버 응답 전 표시할 임시 데이터)
				const optimisticEntry = {
					...data, createAt: new Date().toISOString()
				};

				// 2. submit().updates() 실행
				//    - submit(): 서버로 폼 데이터 전송
				//    - updates(): Single-Flight Mutation으로 관련 쿼리 동시 업데이트
				//    - withOverride(): 서버 응답 대기 중 즉시 UI 업데이트 (Optimistic UI)
				await submit().updates(
					getGuestbookEntries().withOverride((entries = []) => {
													form.reset();
						return [optimisticEntry, ...entries]
                        })
				);
				
				// 3. 성공 시 폼 초기화
				uuidInput.value = crypto.randomUUID();
			} catch (error) {
				console.error('방명록 제출 실패', error);
				// 4. 실패 시 withOverride 자동 롤백 (이전 상태 복원)
			}
		});
</script>



<svelte:head>
	<title>Remote Functions - Form</title>
</svelte:head>


<article class="p-4 space-y-8">
	<header>
		<h1>Form</h1>
		<p>
			Svelte Remote Functions의 <code>form</code> 패턴으로 타입 안전한 폼 제출과 Optimistic UI를 구현한 예제입니다.
		</p>
		
		<Callout.Root variant="info">
			<Callout.Header>
				핵심 기능
			</Callout.Header>
			
			<Callout.Content>
				<section class="space-y-2">
					<ul class="list-disc list-inside">
						<li><code>preflight()</code> - 클라이언트 측 유효성 검사로 불필요한 서버 요청 방지</li>
						<li><code>enhance()</code> - Progressive Enhancement로 JS 없이도 동작</li>
						<li><code>withOverride()</code> - Optimistic UI로 즉각적인 사용자 피드백</li>
						<li>타입 안전성 - 서버와 클라이언트 간 완벽한 TypeScript 지원</li>
					</ul>
				</section>
			</Callout.Content>
		</Callout.Root>
	</header>

	<!-- 방명록 작성 섹션 -->
	<section class="space-y-2">
		<h3>방명록 작성</h3>
        <form {...guestbookForm}
              novalidate
              class=" space-y-4">
            <!-- 고유 ID 생성 - 서버에서 제공하는 formId 사용 -->
            <input bind:this={uuidInput} type="hidden" name="id" value={page.data.formId} />

            <label class="label">
                <span class="label-text">이름</span>
                <input
                    name="name"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    class="input"
                    maxlength="16"
                    required
                    aria-invalid={!!guestbookForm.fields?.name?.issues()?.length}
                />
                {#if guestbookForm.fields?.name?.issues()?.length}
                    {#each guestbookForm.fields.name.issues() as issue}
                        <span class="text-error-500 text-sm">{issue.message}</span>
                    {/each}
                {:else}
                    <span class="text-surface-500-400 text-sm">최대 16자까지 입력 가능</span>
                {/if}
            </label>

            <label class="label">
                <span class="label-text">메시지</span>
                <textarea
                    name="message"
                    rows="4"
                    placeholder="메시지를 입력해주세요..."
                    class="textarea"
                    maxlength="128"
                    required
                    aria-invalid={!!guestbookForm.fields?.message?.issues()?.length}
                ></textarea>
                {#if guestbookForm.fields?.message?.issues()?.length}
                    {#each guestbookForm.fields.message.issues() as issue}
                        <span class="text-error-500 text-sm">{issue.message}</span>
                    {/each}
                {:else}
                    <span class="text-surface-500-400 text-sm">최대 128자까지 입력 가능</span>
                {/if}
            </label>

            <button
                type="submit"
                class="block ml-auto btn preset-filled">
                작성하기
            </button>

            {#if guestbookForm.result}
                <aside class="alert {guestbookForm.result.success ? 'variant-filled-success' : 'variant-filled-error'}">
                    <div class="alert-message">
                        {#if guestbookForm.result.success}
                            <p>방명록이 성공적으로 등록되었습니다!</p>
                        {:else}
                            <p>{guestbookForm.result.message || '등록 중 오류가 발생했습니다.'}</p>
                        {/if}
                    </div>
                </aside>
            {/if}
		</form>
	</section>

	<!-- 전체 방명록 조회 섹션 -->
	<section class="space-y-2">
			<header class="flex justify-between items-center">
				<h3 class="flex-1">전체 방명록</h3>
				<div class="flex gap-2 items-center">
					{#if entriesQuery.pending}
						<span>새로고침 중...</span>
					{/if}
					<button
						class="btn variant-filled-surface"
						onclick={() => entriesQuery.refresh()}
						disabled={entriesQuery.pending}
					>
						새로고침
					</button>
				</div>
			</header>
			<div class="space-y-2">
				{#if entriesQuery.error}
					<aside class="alert variant-filled-error">
						<div class="alert-message">
							<p>{entriesQuery.error.message}</p>
						</div>
					</aside>
				{:else if entriesQuery.loading}
					{#each Array(3) as _}
						<GuestbookCard />
					{/each}
				{:else if entriesQuery.current?.length > 0}
					{#each entriesQuery.current as entry}
						<GuestbookCard {entry} />
					{/each}
				{:else}
					<div class="text-center py-8 text-surface-400-600">
						<p>아직 방명록이 없습니다.</p>
					</div>
				{/if}
		</div>
	</section>

	<!-- 기술 설명 섹션 -->
	<section class="card preset-filled-primary-200-800 border border-primary-300-700 divide-y divide-primary-300-700" role="note">
		<h3 class="p-4">Remote Form 기술 스택 상세 분석</h3>
		
		<div class="p-4 space-y-4">
			<div>
				<h4 class="font-semibold mb-2">사용된 기술 목록</h4>
				<ol class="list-decimal list-inside space-y-1 text-sm text-surface-600-400">
					<li><strong>preflight(schema)</strong> - 클라이언트 사전 검증</li>
					<li><strong>enhance(callback)</strong> - Progressive Enhancement</li>
					<li><strong>submit().updates()</strong> - Single-Flight Mutations</li>
					<li><strong>withOverride(callback)</strong> - Optimistic UI Updates</li>
					<li><strong>Svelte 5 Runes ($state)</strong> - 반응형 상태 관리</li>
				</ol>
			</div>

			<div>
				<h4 class="font-semibold mb-2">1. preflight(schema) - 클라이언트 사전 검증</h4>
				<p class="text-sm text-surface-600-400 mb-2">
					<strong>목적:</strong> 불필요한 서버 요청 차단으로 검증 비용 절감
				</p>
				<ul class="space-y-1 text-sm text-surface-600-400">
					<li>• <strong>JavaScript 활성화:</strong> 클라이언트에서 Valibot 스키마로 사전 검증</li>
					<li>• <strong>JavaScript 비활성화:</strong> 건너뛰고 서버에서 동일 스키마로 검증</li>
					<li>• <strong>효과:</strong> 네트워크 왕복 시간과 서버 부하 감소</li>
				</ul>
			</div>

			<div>
				<h4 class="font-semibold mb-2">2. enhance(callback) - Progressive Enhancement</h4>
				<p class="text-sm text-surface-600-400 mb-2">
					<strong>목적:</strong> JavaScript 유무와 관계없이 동작하는 견고한 폼 구현
				</p>
				<ul class="space-y-1 text-sm text-surface-600-400">
					<li>• <strong>JavaScript 비활성화:</strong> 전통적 HTML 폼 제출 (전체 페이지 새로고침)</li>
					<li>• <strong>JavaScript 활성화:</strong> AJAX 방식 제출 (페이지 새로고침 없음)</li>
					<li>• <strong>효과:</strong> 모든 환경에서 기능 보장, 점진적 기능 향상</li>
				</ul>
			</div>

			<div>
				<h4 class="font-semibold mb-2">3. submit().updates() - Single-Flight Mutations</h4>
				<p class="text-sm text-surface-600-400 mb-2">
					<strong>목적:</strong> 한 번의 서버 요청으로 폼 제출과 쿼리 업데이트 동시 처리
				</p>
				<ul class="space-y-1 text-sm text-surface-600-400">
					<li>• <strong>동작:</strong> 폼 제출과 관련 쿼리 업데이트를 단일 요청으로 처리</li>
					<li>• <strong>효과:</strong> 두 번째 서버 왕복 없이 효율적인 데이터 동기화</li>
				</ul>
			</div>

			<div>
				<h4 class="font-semibold mb-2">4. withOverride(callback) - Optimistic UI Updates</h4>
				<p class="text-sm text-surface-600-400 mb-2">
					<strong>목적:</strong> 네트워크 지연 시간 동안 즉각적인 UI 피드백 제공
				</p>
				<ul class="space-y-1 text-sm text-surface-600-400">
					<li>• <strong>성공 시:</strong> 임시 UI 업데이트 → 서버 응답 → 실제 데이터로 자동 교체</li>
					<li>• <strong>실패 시:</strong> 자동 롤백으로 이전 상태 복원</li>
					<li>• <strong>효과:</strong> 사용자가 네트워크 지연을 느끼지 못함</li>
				</ul>
			</div>

			<div>
				<h4 class="font-semibold mb-2">실행 순서 및 데이터 흐름</h4>
				<div class="bg-surface-100-900 p-3 rounded text-sm font-mono">
					<ol class="list-decimal list-inside space-y-1">
						<li>사용자 폼 입력</li>
						<li>preflight 검증 (JS 있을 때만)</li>
						<li>enhance 콜백 실행</li>
						<li>submit().updates() 호출</li>
						<li>withOverride로 즉시 UI 업데이트</li>
						<li>서버 처리 (동시 진행)</li>
						<li>성공/실패에 따라 실제 데이터 반영 또는 롤백</li>
					</ol>
				</div>
			</div>

			<div>
				<h4 class="font-semibold mb-2">Progressive Enhancement 철학</h4>
				<p class="text-sm text-surface-600-400">
					SvelteKit Remote Functions는 "점진적 기능 향상" 원칙을 따릅니다. 
					기본 HTML 폼으로 시작하여 JavaScript가 있을 때만 고급 기능을 추가합니다.
					이는 접근성, 견고성, 성능을 모두 보장하는 현대적인 웹 개발 접근법입니다.
				</p>
			</div>
		</div>
	</section>

</article>
