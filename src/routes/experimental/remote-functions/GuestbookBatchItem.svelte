<script>
	import { getGuestbookItems } from './data.remote.js';

	let { itemId } = $props();
</script>

<div class="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
	{#await getGuestbookItems(itemId)}
		<div class="animate-pulse">
			<div class="flex items-start gap-3 mb-3">
				<div class="w-8 h-8 bg-slate-200 rounded-full"></div>
				<div class="flex-1">
					<div class="h-5 bg-slate-200 rounded w-24 mb-2"></div>
					<div class="h-4 bg-slate-200 rounded w-16"></div>
				</div>
			</div>
			<div class="space-y-2">
				<div class="h-4 bg-slate-200 rounded w-full"></div>
				<div class="h-4 bg-slate-200 rounded w-3/4"></div>
			</div>
		</div>
	{:then item}
		{#if item}
			<div class="flex items-start gap-3 mb-3">
				<div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
					<span class="text-sm font-medium text-emerald-600">#{item.id.slice(0, 8)}</span>
				</div>
				<div class="flex-1">
					<h4 class="font-semibold text-slate-900">{item.name}</h4>
					<time class="text-xs text-slate-500">
						{new Date(item.createdAt).toLocaleDateString('ko-KR')}
					</time>
				</div>
			</div>
			<p class="text-slate-700 text-sm leading-relaxed">{item.message}</p>
		{:else}
			<div class="text-center py-4 text-slate-500">
				<p class="text-sm">방명록을 찾을 수 없습니다.</p>
			</div>
		{/if}
	{:catch error}
		<div class="text-center py-4 text-red-500">
			<p class="text-sm font-medium">로딩 실패</p>
			<p class="text-xs mt-1">{error.message}</p>
		</div>
	{/await}
</div>
