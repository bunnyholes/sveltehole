<script>
	import { addGuestbookEntry, getGuestbookEntries } from '$lib/remote/data.remote.js';
	import { guestbookFormSchema } from '$lib/validation/guestbookFormSchema.js';
	import GuestbookCard from '$lib/components/GuestbookCard.svelte';
	import * as Callout from '$lib/components/callout/index.js';

	let { data } = $props();

	let uuidInput = $state();
	const entriesQuery = getGuestbookEntries();

	const guestbookForm = addGuestbookEntry
		.preflight(guestbookFormSchema)
		.enhance(async ({ form, submit, data: formData }) => {
			try {
				const optimisticEntry = {
					...formData, createAt: new Date().toISOString()
				};

				await submit().updates(
					getGuestbookEntries().withOverride((entries = []) => {
						form.reset();
						return [optimisticEntry, ...entries]
                        })
				);

				uuidInput.value = crypto.randomUUID();
			} catch (error) {
				console.error('방명록 제출 실패', error);
			}
		});

	addGuestbookEntry.fields.name.set("안녕하세요");
	addGuestbookEntry.fields.message.set("스벨트는 미래입니다.");
</script>

<svelte:head>
	<title>Remote Functions - Form</title>
</svelte:head>

<article class="p-4 space-y-8">
	<header>
		<h1>Form</h1>
		<p>
			<code>form</code>은 기존 form actions를 대체하는 타입 안전한 폼 처리 방식입니다. 서버 검증과 업데이트를 처리하면서 JS 없이도 작동합니다.
		</p>
	</header>

	<section class="space-y-2">
		<h3>방명록 작성</h3>
        <form {...guestbookForm}
              novalidate
              class=" space-y-4">
            <input bind:this={uuidInput} type="hidden" name="id" value={data.formId} />

            <label class="label">
                <span class="label-text">이름</span>
                <input
                    placeholder="이름을 입력해주세요"
                    class="input"
                    maxlength="16"
                    required
                    {...addGuestbookEntry.fields.name.as("text")}
                    aria-invalid={!!addGuestbookEntry.fields?.name?.issues()?.length}
                />
                {#if addGuestbookEntry.fields?.name?.issues()?.length}
                    {#each addGuestbookEntry.fields.name.issues() as issue}
                        <span class="text-error-500 text-sm">{issue.message}</span>
                    {/each}
                {:else}
                    <span class="text-surface-500-400 text-sm">최대 16자까지 입력 가능</span>
                {/if}
            </label>

            <label class="label">
                <span class="label-text">메시지</span>
                <textarea
                    rows="4"
                    placeholder="메시지를 입력해주세요..."
                    class="textarea"
                    maxlength="128"
                    required
                    {...addGuestbookEntry.fields.message.as("text")}
                    aria-invalid={!!addGuestbookEntry.fields?.message?.issues()?.length}
                ></textarea>
                {#if addGuestbookEntry.fields?.message?.issues()?.length}
                    {#each addGuestbookEntry.fields.message.issues() as issue}
                        <span class="text-error-500 text-sm">{issue.message}</span>
                    {/each}
                {:else}
                    <span class="text-surface-500-400 text-sm">최대 128자까지 입력 가능</span>
                {/if}
            </label>

            <button
                type="submit"
                class="chip block ml-auto btn preset-filled">
                작성하기
            </button>

            {#if addGuestbookEntry.result}
                <aside class="alert {addGuestbookEntry.result.success ? 'variant-filled-success' : 'variant-filled-error'}">
                    <div class="alert-message">
                        {#if addGuestbookEntry.result.success}
                            <p>방명록이 성공적으로 등록되었습니다!</p>
                        {:else}
                            <p>{addGuestbookEntry.result.message || '등록 중 오류가 발생했습니다.'}</p>
                        {/if}
                    </div>
                </aside>
            {/if}
		</form>
	</section>

	<section class="space-y-2">
			<header class="flex justify-between items-center">
				<h3 class="flex-1">전체 방명록</h3>
                <button
                    class="btn btn-sm preset-tonal-surface"
                    onclick={() => entriesQuery.refresh()}
                    disabled={entriesQuery.pending}
                >
                    새로고침
                </button>
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

	<section class="card preset-filled-primary-200-800 border border-primary-300-700 divide-y divide-primary-300-700" role="note">
		<h3 class="p-4">실행 흐름</h3>
		<div class="p-4 space-y-3 text-sm text-surface-600-400">
			<ol class="list-decimal list-inside space-y-1">
				<li><code>preflight()</code>: 클라이언트 검증으로 잘못된 요청 차단</li>
				<li><code>enhance()</code>: JS 있으면 AJAX, 없으면 전통 HTML 폼 제출</li>
				<li><code>submit().updates()</code>: 단일 요청으로 뮤테이션 + 쿼리 캐시 갱신</li>
				<li><code>withOverride()</code>: 서버 응답 전 임시 데이터로 즉시 UI 반영</li>
			</ol>
		</div>
	</section>

</article>
