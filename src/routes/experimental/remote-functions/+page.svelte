<script>
	import QueryDemo from './QueryDemo.svelte';
	import QueryBatchDemo from './QueryBatchDemo.svelte';
</script>

<svelte:head>
	<title>Remote Functions - Query & Batch</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 p-8">
	<div class="max-w-6xl mx-auto">
		<h1 class="text-3xl font-bold text-slate-900 mb-6">Remote Functions - Query & Batch</h1>
		
		<p class="text-lg text-slate-600 mb-8">
			SvelteKit Remote Functions의 Query와 Query Batch 기능을 사용한 데이터 조회 데모입니다.
		</p>

		<!-- Remote Functions Query 데모 -->
		<QueryDemo />
		
		<!-- Remote Functions Query Batch 데모 -->
		<QueryBatchDemo />

		<!-- 구현 방법 설명 -->
		<section class="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
			<h2 class="text-xl font-semibold text-blue-900 mb-4">💡 Remote Functions Query 사용법</h2>
			
			<div class="space-y-4 text-sm text-blue-800">
				<div>
					<p class="mt-2 text-xs">
						자세한 설정 방법은 
						<a href="https://svelte.dev/docs/kit/remote-functions" class="text-blue-600 hover:text-blue-800 underline" target="_blank">
							공식 문서
						</a>를 참고하세요.
					</p>
				</div>
			</div>
		</section>

		<!-- GitHub 링크 -->
		<section class="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-300">
			<div class="flex items-center justify-between">
				<div>
					<h3 class="text-lg font-semibold text-slate-800">📚 소스 코드</h3>
					<p class="text-sm text-slate-600 mt-1">이 페이지의 구현 코드를 확인하세요</p>
				</div>
				<a href="https://github.com/bunnyholes/sveltehole/blob/main/src/routes/experimental/remote-functions" 
				   class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors text-sm font-medium"
				   target="_blank">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
					</svg>
					GitHub에서 보기
				</a>
			</div>
		</section>
	</div>
</div>