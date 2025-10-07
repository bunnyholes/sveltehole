<script>
	import { page } from '$app/stores';
	import HardHat from '@lucide/svelte/icons/hard-hat';
</script>

<article class="p-4 flex items-center justify-center min-h-[80vh]">
	<div class="text-center space-y-6 max-w-md">
		<HardHat class="w-24 h-24 mx-auto text-warning-500" />

		<header>
			<h1 class="text-4xl font-bold">공사 중</h1>
		</header>

		<div class="space-y-2">
			<p class="text-lg text-surface-600-400">
				요청하신 페이지를 찾을 수 없습니다.
			</p>
			<p class="text-sm text-surface-500-500">
				{$page.status} {$page.error?.message || '페이지가 존재하지 않습니다'}
			</p>
		</div>

		<footer>
			<a href="/" class="chip preset-filled-primary-500">
				홈으로 돌아가기
			</a>
		</footer>
	</div>
</article>
