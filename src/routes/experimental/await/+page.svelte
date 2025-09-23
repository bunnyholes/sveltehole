<script>
	import { fetchPosts, fetchUserProfile, fetchComments } from '$lib/api.js';

	/** @type {import('./$types').PageData} */
	let { data } = $props();
</script>

<svelte:head>
	<title>await</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 p-8">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-3xl font-bold text-slate-900 mb-6">await</h1>
		
		<p class="text-lg text-slate-600 mb-8">
			같은 데이터를 두 가지 방식으로 렌더링하여 차이점을 비교해보세요.
		</p>

		<!-- 단일 게시물에서 두 방식 비교 -->
		<div class="space-y-8">
			<!-- 비교 섹션 -->
			<section class="bg-white rounded-lg border border-slate-200 p-6">
				<h2 class="text-2xl font-semibold text-slate-900 mb-6">비교</h2>
				
				<div class="grid gap-6 lg:grid-cols-2">
					<!-- SSR 방식 -->
					<div class="space-y-4">
						<div class="flex items-center gap-2 mb-4">
							<div class="w-3 h-3 bg-green-600 rounded-full"></div>
							<h3 class="text-lg font-semibold text-green-800">SSR 방식</h3>
						</div>
						<p class="text-sm text-slate-600 mb-4">서버에서 모든 데이터를 미리 가져온 후 완성된 페이지를 전송</p>
						
						{#if data.posts[0]}
							<div class="bg-slate-50 p-4 rounded-lg border border-slate-300">
								<h4 class="font-semibold text-slate-900">{data.posts[0].title}</h4>
								<p class="text-sm text-slate-600">작성자: {data.posts[0].author}</p>
								
								<div class="mt-3 pt-3 border-t border-slate-300">
									<h5 class="text-sm font-medium text-slate-800 mb-2">댓글</h5>
									{#each data.posts[0].comments as comment}
										<div class="text-xs text-slate-600 bg-white rounded p-2 mb-1">
											<strong>{comment.author}:</strong> {comment.content}
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>

					<!-- await 방식 -->
					<div class="space-y-4">
						<div class="flex items-center gap-2 mb-4">
							<div class="w-3 h-3 bg-blue-600 rounded-full"></div>
							<h3 class="text-lg font-semibold text-blue-800">await 방식</h3>
						</div>
						<p class="text-sm text-slate-600 mb-4">스켈레톤 UI를 먼저 보여주고 데이터가 로드되면 내용을 채움</p>
						
						{#await fetchPosts()}
							<div class="bg-slate-50 p-4 rounded-lg border border-slate-300 animate-pulse">
								<div class="h-5 bg-slate-300 rounded mb-2"></div>
								<div class="h-4 bg-slate-300 rounded w-1/3 mb-3"></div>
								
								<div class="mt-3 pt-3 border-t border-slate-300">
									<div class="h-4 bg-slate-300 rounded w-16 mb-2"></div>
									<div class="h-3 bg-slate-300 rounded mb-1"></div>
									<div class="h-3 bg-slate-300 rounded w-3/4"></div>
								</div>
							</div>
						{:then posts}
							{#if posts[0]}
								<div class="bg-slate-50 p-4 rounded-lg border border-slate-300">
									<h4 class="font-semibold text-slate-900">{posts[0].title}</h4>
									<p class="text-sm text-slate-600">작성자: {posts[0].author}</p>
									
									<div class="mt-3 pt-3 border-t border-slate-300">
										<h5 class="text-sm font-medium text-slate-800 mb-2">댓글</h5>
										{#await fetchComments(posts[0].id)}
											<div class="text-xs bg-white rounded p-2 mb-1 animate-pulse">
												<div class="h-3 bg-slate-300 rounded w-3/4"></div>
											</div>
										{:then comments}
											{#each comments as comment}
												<div class="text-xs text-slate-600 bg-white rounded p-2 mb-1">
													<strong>{comment.author}:</strong> {comment.content}
												</div>
											{/each}
										{/await}
									</div>
								</div>
							{/if}
						{/await}
					</div>
				</div>
			</section>
		</div>

		<!-- 구현 방법 설명 -->
		<section class="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
			<h2 class="text-xl font-semibold text-blue-900 mb-4">💡 await SSR 활성화 방법</h2>
			
			<div class="space-y-4 text-sm text-blue-800">
				<div>
					<p class="mt-2 text-xs">
						자세한 설정 방법은 
						<a href="https://svelte.dev/docs/svelte/await-expressions" class="text-blue-600 hover:text-blue-800 underline" target="_blank">
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
				<a href="https://github.com/bunnyholes/sveltehole/blob/main/src/routes/experimental/await/+page.svelte" 
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