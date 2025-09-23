<script>
	import { fetchPosts, fetchUserProfile, fetchComments } from '$lib/api.js';
</script>

<svelte:head>
	<title>Async SSR</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 p-8">
	<div class="max-w-2xl mx-auto">
		<h1 class="text-3xl font-bold text-slate-900 mb-6">Async SSR (Await Boundary)</h1>
		
		<div class="mb-6">
			<a href="/traditional-ssr" class="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 transition-colors">
				전통적 SSR 비교
			</a>
		</div>

		<section class="mb-8">
			<h2 class="text-xl font-semibold text-slate-800 mb-4">게시물 목록</h2>
			
			{#await fetchPosts()}
				<div class="bg-white p-4 mb-4 rounded-lg shadow-sm border border-slate-200 animate-pulse">
					<div class="h-5 bg-slate-200 rounded mb-2 font-semibold"></div>
					<div class="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
					
					<div class="mt-2 pt-2 border-t border-slate-200">
						<div class="h-4 bg-slate-200 rounded w-16 mb-1"></div>
						<div class="h-3 bg-slate-200 rounded w-3/4"></div>
					</div>
				</div>
				<div class="bg-white p-4 mb-4 rounded-lg shadow-sm border border-slate-200 animate-pulse">
					<div class="h-5 bg-slate-200 rounded mb-2 font-semibold"></div>
					<div class="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
					
					<div class="mt-2 pt-2 border-t border-slate-200">
						<div class="h-4 bg-slate-200 rounded w-16 mb-1"></div>
						<div class="h-3 bg-slate-200 rounded w-3/4"></div>
					</div>
				</div>
			{:then posts}
				{#each posts as post}
					<div class="bg-white p-4 mb-4 rounded-lg shadow-sm border border-slate-200">
						<h3 class="font-semibold text-slate-900">{post.title}</h3>
						<p class="text-sm text-slate-600">작성자: {post.author}</p>
						
						<div class="mt-2 pt-2 border-t border-slate-200">
							<h4 class="text-sm font-medium text-slate-800">댓글</h4>
							{#await fetchComments(post.id)}
								<div class="text-xs bg-slate-50 rounded p-1 mt-1 animate-pulse">
									<div class="h-4 bg-slate-200 rounded w-3/4"></div>
								</div>
							{:then comments}
								{#each comments as comment}
									<div class="text-xs text-slate-600 bg-slate-50 rounded p-1 mt-1">
										<strong>{comment.author}:</strong> {comment.content}
									</div>
								{/each}
							{/await}
						</div>
					</div>
				{/each}
			{/await}
		</section>

		<section>
			<h2 class="text-xl font-semibold text-slate-800 mb-4">사용자 목록</h2>
			
			{#await Promise.all([1, 2].map(id => fetchUserProfile(id)))}
				<div class="bg-white p-3 mb-2 rounded-lg shadow-sm border border-slate-200 flex items-center animate-pulse">
					<div class="w-8 h-8 bg-slate-200 rounded-full mr-3"></div>
					<div class="h-4 bg-slate-200 rounded w-20"></div>
				</div>
				<div class="bg-white p-3 mb-2 rounded-lg shadow-sm border border-slate-200 flex items-center animate-pulse">
					<div class="w-8 h-8 bg-slate-200 rounded-full mr-3"></div>
					<div class="h-4 bg-slate-200 rounded w-20"></div>
				</div>
			{:then users}
				{#each users.filter(Boolean) as user}
					<div class="bg-white p-3 mb-2 rounded-lg shadow-sm border border-slate-200 flex items-center">
						<div class="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
							{user.name[0]}
						</div>
						<span class="text-slate-900">{user.name}</span>
					</div>
				{/each}
			{/await}
		</section>
	</div>
</div>