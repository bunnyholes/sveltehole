<script>
	let { item = null, onToggle = null } = $props();
</script>

<div class="p-4 card shadow-sm border border-surface-200-800 space-y-3">
	<div class="flex justify-between items-start gap-3">
		<input 
			type="checkbox" 
			checked={item?.completed || false}
			onchange={() => item && onToggle && onToggle(item.id)}
			class="checkbox mt-1"
			disabled={!item || !onToggle}
		/>
		<div class="flex-1 min-w-0">
			<h3 class:line-through={item?.completed} class:text-gray-400={item?.completed} class="text-lg font-medium">
				{#if item}
					{item.title}
				   {:else}
					   <span class="placeholder animate-pulse w-32 inline-block">&nbsp;</span>
				{/if}
			</h3>
		</div>
		<span class="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
			{#if item}
				ID: {item.id}
			   {:else}
				   <span class="placeholder animate-pulse w-16 inline-block">&nbsp;</span>
			{/if}
		</span>
	</div>

	<p class:line-through={item?.completed} class="text-gray-600 dark:text-gray-400">
		{#if item}
			{item.summary}
		   {:else}
			   <span class="placeholder animate-pulse w-full inline-block">&nbsp;</span>
		{/if}
	</p>

	<div class="flex justify-between items-center text-xs gap-2">
		<!-- 완료 (왼쪽) -->
		<div class="flex-1 text-left">
			{#if item?.completed && item?.completed_at}
				<span class="text-success-400 dark:text-success-400">
					완료: {new Date(item.completed_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
				</span>
			{:else if item}
				<span class="text-surface-400 dark:text-surface-400">-</span>
			   {:else}
				   <span class="placeholder animate-pulse w-20 inline-block">&nbsp;</span>
			{/if}
		</div>
		
		<!-- 수정 (중앙) -->
		<div class="flex-1 text-center">
			{#if item?.updated_at}
				<span class="text-surface-400 dark:text-surface-400">
					수정: {new Date(item.updated_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
				</span>
			{:else if item}
				<span class="text-surface-400 dark:text-surface-400">-</span>
			   {:else}
				   <span class="placeholder animate-pulse w-20 inline-block">&nbsp;</span>
			{/if}
		</div>
		
		<!-- 생성 (오른쪽) -->
		<div class="flex-1 text-right text-surface-500 dark:text-surface-500">
			{#if item}
				생성: {new Date(item.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
			   {:else}
				   <span class="placeholder animate-pulse w-20 inline-block">&nbsp;</span>
			{/if}
		</div>
	</div>
</div>
