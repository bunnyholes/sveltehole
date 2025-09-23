<script>
	/** @type {import('./$types').PageData} */
	let { data } = $props();
</script>

<svelte:head>
	<title>전통적 SSR</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 p-8">
	<div class="max-w-2xl mx-auto">
		<h1 class="text-3xl font-bold text-slate-900 mb-6">전통적 SvelteKit SSR</h1>
		
		<div class="mb-6">
			<a href="/async" class="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 transition-colors">
				Async SSR 비교
			</a>
		</div>

		<section class="mb-8">
			<h2 class="text-xl font-semibold text-slate-800 mb-4">게시물 목록</h2>
			{#each data.posts as post}
				<div class="bg-white p-4 mb-4 rounded-lg shadow-sm border border-slate-200">
					<h3 class="font-semibold text-slate-900">{post.title}</h3>
					<p class="text-sm text-slate-600">작성자: {post.author}</p>
					
					<div class="mt-2 pt-2 border-t border-slate-200">
						<h4 class="text-sm font-medium text-slate-800">댓글</h4>
						{#each post.comments as comment}
							<div class="text-xs text-slate-600 bg-slate-50 rounded p-1 mt-1">
								<strong>{comment.author}:</strong> {comment.content}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</section>

		<section>
			<h2 class="text-xl font-semibold text-slate-800 mb-4">사용자 목록</h2>
			{#each data.users as user}
				<div class="bg-white p-3 mb-2 rounded-lg shadow-sm border border-slate-200 flex items-center">
					<div class="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
						{user.name[0]}
					</div>
					<span class="text-slate-900">{user.name}</span>
				</div>
			{/each}
		</section>
	</div>
</div>