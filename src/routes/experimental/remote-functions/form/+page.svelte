<script>
	import { addGuestbookEntry, getGuestbookEntries } from '$lib/remote/data.remote.js';
	import { page } from '$app/state';
	import { guestbookFormSchema } from '$lib/validation/guestbookFormSchema.js';
	import GuestbookCard from '$lib/components/GuestbookCard.svelte';

	let uuidInput = $state();
	
	const entriesQuery = getGuestbookEntries();
	
	const guestbookForm = addGuestbookEntry
    .preflight(guestbookFormSchema)
    .enhance(async ({ form, submit, data }) => {
		try {
			const optimisticEntry = {
				id: data.id,
				name: data.name.trim(),
				message: data.message.trim(),
				createdAt: new Date().toISOString()
			};


			submit().updates(
				getGuestbookEntries().withOverride((entries = []) => [optimisticEntry, ...entries])
			);
			
			form.reset();
			uuidInput.value = crypto.randomUUID();
		} catch (error) {
			console.error('방명록 제출 실패', error);
		}
	});
</script>



<svelte:head>
	<title>Remote Functions - Form</title>
</svelte:head>


<main class="p-4 space-y-8">
	<header>
		<h2 class="preset-typo-headline">Form</h2>
		<p class="preset-typo-caption">
			Remote Function의 <code>form</code> 패턴으로 타입 안전한 폼 제출을 구현하는 예제입니다.
		</p>
	</header>

	<!-- 방명록 작성 섹션 -->
	<section class="space-y-2">
		<h3 class="preset-typo-title">방명록 작성</h3>
			<form {...guestbookForm}
			      novalidate
			      class="card bg-surface-200-800 border border-surface-200-800 p-6 shadow-sm space-y-4">
				<input bind:this={uuidInput} type="hidden" name="id" value={page.data.formId} />
				<div>
					<label for="name" class="block preset-typo-caption text-surface-600-400 mb-2">이름</label>
					<input 
						id="name"
						name="name" 
						type="text"
						placeholder="이름을 입력해주세요" 
						class="input focus:outline-none focus:ring-2 focus:ring-primary-400-600"
						maxlength="16"
						required
					/>
					<div class="mt-1">
						<p class="preset-typo-caption {addGuestbookEntry.issues?.name ? 'text-error-600-400' : 'text-surface-500-500'}">
							{#if addGuestbookEntry.issues?.name}
								{#each addGuestbookEntry.issues.name as issue}
									{issue.message}
								{/each}
							{:else}
								&nbsp;
							{/if}
						</p>
					</div>
				</div>
				
				<div>
					<label for="message" class="block preset-typo-caption text-surface-600-400 mb-2">메시지</label>
					<textarea 
						id="message"
						name="message" 
						placeholder="메시지를 입력해주세요..." 
						class="textarea focus:outline-none focus:ring-2 focus:ring-primary-400-600 h-24 resize-none"
						maxlength="128"
						required
					></textarea>
					<div class="mt-1">
						<p class="preset-typo-caption {addGuestbookEntry.issues?.message ? 'text-error-600-400' : 'text-surface-500-500'}">
							{#if addGuestbookEntry.issues?.message}
								{#each addGuestbookEntry.issues.message as issue}
									{issue.message}
								{/each}
							{:else}
								&nbsp;
							{/if}
						</p>
					</div>
				</div>
				
				<button 
					type="submit"
					class="btn btn-base preset-filled-primary-500 w-full">
					작성하기
				</button>
				
				{#if guestbookForm.result}
					{#if guestbookForm.result.success}
						<p class="preset-typo-caption text-success-600-400">메시지가 등록되었습니다!</p>
					{:else}
						<p class="preset-typo-caption text-error-600-400">{guestbookForm.result.message}</p>
					{/if}
				{/if}
		</form>
	</section>

	<!-- 전체 방명록 조회 섹션 -->
	<section class="space-y-2">
			<header class="flex justify-between">
				<h3 class="preset-typo-title flex-1">전체 방명록</h3>
				<button
					class="btn preset-filled-tertiary-500"
					onclick={() => entriesQuery.refresh()}
				>
					Refresh
				</button>
			</header>
			<div class="space-y-2">
				{#if entriesQuery.error}
					<div class="p-4 bg-error-100-900 border border-error-200-800 rounded-lg">
						<p class="preset-typo-caption text-error-500">{entriesQuery.error.message}</p>
					</div>
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
						<p class="preset-typo-caption">아직 방명록이 없습니다.</p>
					</div>
				{/if}
		</div>
	</section>

	<article class="card preset-filled-primary-200-800 divide-y divide-primary-300-700">
		<header class="p-4">
			<h2 class="preset-typo-title text-primary-700-300">Form 패턴</h2>
		</header>
		
		<div class="p-4">
			<p class="text-primary-600-400">
				Remote Function의 <code class="px-1 py-0.5 rounded bg-primary-100-900">form</code>을 사용해 타입 안전한 폼 제출과 실시간 유효성 검사를 구현하며, 제출 후 관련 쿼리가 자동으로 새로 고침됩니다.
			</p>
		</div>
	</article>
</main>
