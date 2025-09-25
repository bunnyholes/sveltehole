<script>
	import { addGuestbookEntry, getGuestbookEntries } from '../data.remote.js';
	import { page } from '$app/state';
	import { guestbookFormSchema } from '$lib/validation/guestbookFormSchema.js';

	if (!addGuestbookEntry?.preflight) {
		throw new Error('SvelteKit remote form preflight 지원이 필요합니다. 버전을 확인하세요.');
	}

const baseForm = addGuestbookEntry.preflight(guestbookFormSchema);

const guestbookForm = baseForm.enhance(async ({ form, submit, data }) => {
		try {
			const optimisticEntry = {
				id: typeof data?.id === 'string' && data.id ? data.id : page.data.formId,
				name: typeof data?.name === 'string' ? data.name.trim() : '',
				message: typeof data?.message === 'string' ? data.message.trim() : '',
				createdAt: new Date().toISOString(),
				isPending: true
			};

			const submission = submit();
			await submission.updates(
				getGuestbookEntries().withOverride((entries = []) => [optimisticEntry, ...entries])
			);
			const result = await submission;

			if (result?.success) {
				form.reset();
			}
		} catch (error) {
			console.error('방명록 제출 실패', error);
		}
	});
</script>

<svelte:head>
	<title>Remote Functions - Form</title>
</svelte:head>

<section class="space-y-6">
	<div class="space-y-3">
		<h2 class="text-2xl font-semibold text-slate-900">Form</h2>
		<p class="text-slate-600">Remote Function의 Form을 활용한 예제입니다.</p>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<!-- 폼 섹션 -->
		<div class="space-y-4">
			<h3 class="text-lg font-medium text-slate-900">방명록 작성</h3>
			<form {...guestbookForm}
			      novalidate
			      class="p-6 bg-white rounded-lg shadow-sm border border-slate-200 space-y-4">
				<input type="hidden" name="id" value={page.data.formId} />
				<div>
					<label for="form-id" class="block text-sm font-medium text-slate-700 mb-2">엔트리 ID</label>
					<input
						id="form-id"
						type="text"
						value={page.data.formId}
						readonly
						class="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-100 text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
					/>
				</div>
				<div>
					<label for="name" class="block text-sm font-medium text-slate-700 mb-2">이름</label>
					<input 
						id="name"
						name="name" 
						type="text"
						placeholder="이름을 입력해주세요" 
						class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						maxlength="16"
						required
					/>
					<small class="block text-red-600 text-sm mt-1">
						{#if guestbookForm.issues?.name}
							{#each guestbookForm.issues.name as issue}
								{issue.message}
							{/each}
						{:else}
							&nbsp;
						{/if}
					</small>
				</div>
				
				<div>
					<label for="message" class="block text-sm font-medium text-slate-700 mb-2">메시지</label>
					<textarea 
						id="message"
						name="message" 
						placeholder="메시지를 입력해주세요..." 
						class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
						maxlength="128"
						required
					></textarea>
					<small class="block text-red-600 text-sm mt-1">
						{#if guestbookForm.issues?.message}
							{#each guestbookForm.issues.message as issue}
								{issue.message}
							{/each}
						{:else}
							&nbsp;
						{/if}
					</small>
				</div>
				
				<button 
					type="submit"
					class="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
				>
					작성하기
				</button>
				
				{#if guestbookForm.result}
					{#if guestbookForm.result.success}
						<p class="text-green-600 text-sm">✅ 메시지가 등록되었습니다!</p>
					{:else}
						<p class="text-red-600 text-sm">⚠️ {guestbookForm.result.message}</p>
					{/if}
				{/if}
			</form>
		</div>

		<!-- 전체 방명록 섹션 -->
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
					{#if entries.length > 0}
						{#each entries as entry}
							<div class="p-4 bg-white rounded-lg shadow-sm border transition-all {entry.isPending ? 'border-blue-200' : 'border-slate-200'}">
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
	</div>

	<div class="p-5 bg-blue-50 border border-blue-200 rounded-xl">
		<p class="text-sm text-blue-900">
			<strong>📝 Form 패턴:</strong> Remote Function의 <code>form</code>을 사용하여 타입 안전한 폼 제출과 실시간 유효성 검사를 구현합니다. 제출 후 관련 쿼리가 자동으로 새로고침됩니다.
		</p>
	</div>
</section>
