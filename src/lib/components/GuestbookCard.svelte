<script lang="ts">
	import type { GuestbookEntry } from '$lib/types/guestbook';

	interface Props {
		entry?: GuestbookEntry | null;
	}

	let { entry = null }: Props = $props();
</script>

<div class="space-y-3 card border border-surface-200-800 p-4 shadow-sm">
	<div class="flex items-start justify-between">
		<div
			class={{
				'placeholder w-24 animate-pulse': !entry
			}}
		>
			{entry?.name || '\u00A0'}
		</div>

		<time
			class={{
				'preset-typo-caption': true,
				'placeholder w-16 animate-pulse': !entry
			}}
		>
			{entry?.createdAt ? new Date(entry.createdAt).toLocaleDateString('ko-KR') : '\u00A0'}
		</time>
	</div>

	<div>
		<p
			class={{
				'preset-typo-body': true,
				'placeholder animate-pulse': !entry
			}}
		>
			{entry?.message || '\u00A0'}
		</p>
	</div>
</div>
