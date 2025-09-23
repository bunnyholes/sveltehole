<script>
	import { getPosts, getPostTags } from './data.remote.js';
	
	let selectedPosts = $state([]);
	let tagResults = $state([]);
	let isLoading = $state(false);
	let queryComplete = $state(false);
	
	// 체크박스 상태 변경 핸들러
	function handlePostSelect(postId, checked) {
		if (checked) {
			selectedPosts = [...selectedPosts, postId];
		} else {
			selectedPosts = selectedPosts.filter(id => id !== postId);
		}
	}
	
	// 선택된 포스트들의 태그 조회
	async function fetchSelectedTags() {
		if (selectedPosts.length === 0) return;
		
		isLoading = true;
		queryComplete = false;
		
		try {
			// 배치 쿼리 실행 - 각 포스트 ID에 대해 개별 호출처럼 보이지만 내부적으로 배치 처리됨
			const tagPromises = selectedPosts.map(async (postId) => {
				const tags = await getPostTags(postId);
				return { postId, tags };
			});
			
			const results = await Promise.all(tagPromises);
			tagResults = results;
			
			// 모든 태그를 평면화하고 중복 제거 및 카운팅
			const allTags = results.flatMap(result => result.tags);
			const tagCounts = {};
			allTags.forEach(tag => {
				tagCounts[tag] = (tagCounts[tag] || 0) + 1;
			});
			
			tagResults = { individual: results, summary: tagCounts };
			queryComplete = true;
		} catch (error) {
			console.error('태그 조회 오류:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="space-y-8">
	<!-- 배치 쿼리 데모 섹션 -->
	<section class="bg-white rounded-lg border border-slate-200 p-6">
		<h2 class="text-2xl font-semibold text-slate-900 mb-6">🚀 Query Batch Demo - 포스트 태그 조회</h2>
		<p class="text-sm text-slate-600 mb-4">여러 포스트를 선택하여 배치로 태그를 조회합니다. 개별 쿼리들이 자동으로 하나의 배치 쿼리로 최적화됩니다.</p>
		
		{#await getPosts()}
			<!-- 로딩 중 -->
			<div class="animate-pulse">
				<div class="h-10 bg-slate-300 rounded mb-4"></div>
				{#each Array(5) as _}
					<div class="h-16 bg-slate-200 rounded mb-2"></div>
				{/each}
			</div>
		{:then posts}
			<!-- 포스트 선택 테이블 -->
			{#if posts && Array.isArray(posts)}
				<div class="mb-6">
					<h3 class="text-lg font-medium text-slate-900 mb-4">포스트 선택</h3>
					<div class="overflow-x-auto">
						<table class="w-full border-collapse border border-slate-300">
							<thead class="bg-slate-100">
								<tr>
									<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">선택</th>
									<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">ID</th>
									<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">제목</th>
									<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">작성자</th>
									<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">카테고리</th>
									<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">기본 태그</th>
								</tr>
							</thead>
							<tbody>
								{#each posts as post}
									<tr class="hover:bg-slate-50">
										<td class="border border-slate-300 px-4 py-3 text-center">
											<input 
												type="checkbox" 
												class="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
												onchange={(e) => handlePostSelect(post.id, e.target.checked)}
											>
										</td>
										<td class="border border-slate-300 px-4 py-3 text-sm text-slate-900">{post.id}</td>
										<td class="border border-slate-300 px-4 py-3 text-sm">
											<div class="font-medium text-slate-900">{post.title}</div>
										</td>
										<td class="border border-slate-300 px-4 py-3 text-sm text-slate-700">{post.author}</td>
										<td class="border border-slate-300 px-4 py-3 text-sm">
											<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{post.category}</span>
										</td>
										<td class="border border-slate-300 px-4 py-3 text-sm">
											<div class="flex flex-wrap gap-1">
												{#each post.tags.slice(0, 2) as tag}
													<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{tag}</span>
												{/each}
												{#if post.tags.length > 2}
													<span class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">+{post.tags.length - 2}</span>
												{/if}
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
				
				<!-- 조회 버튼 -->
				<div class="flex items-center gap-4 mb-6">
					<button 
						class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
						onclick={fetchSelectedTags}
						disabled={selectedPosts.length === 0 || isLoading}
					>
						{isLoading ? '조회 중...' : `선택된 ${selectedPosts.length}개 포스트의 태그 조회`}
					</button>
					
					{#if selectedPosts.length > 0}
						<div class="text-sm text-slate-600">
							선택된 포스트: {selectedPosts.join(', ')}
						</div>
					{/if}
				</div>
				
				<!-- 배치 쿼리 결과 -->
				{#if queryComplete && tagResults}
					<div class="space-y-6">
						<!-- 태그 요약 -->
						<div class="bg-green-50 rounded-lg border border-green-200 p-4">
							<h4 class="text-lg font-medium text-green-900 mb-3">🎯 태그 요약 (중복 제거 및 카운팅)</h4>
							<div class="flex flex-wrap gap-2">
								{#each Object.entries(tagResults.summary) as [tag, count]}
									<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
										{tag} ({count}회)
									</span>
								{/each}
							</div>
							<p class="text-xs text-green-700 mt-3">
								✨ 총 {Object.keys(tagResults.summary).length}개의 고유 태그 발견
							</p>
						</div>
						
						<!-- 개별 포스트 태그 -->
						<div class="bg-blue-50 rounded-lg border border-blue-200 p-4">
							<h4 class="text-lg font-medium text-blue-900 mb-3">📝 개별 포스트 태그</h4>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								{#each tagResults.individual as result}
									<div class="bg-white rounded-lg border border-blue-200 p-3">
										<div class="font-medium text-blue-900 mb-2">포스트 #{result.postId}</div>
										<div class="flex flex-wrap gap-1">
											{#each result.tags as tag}
												<span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{tag}</span>
											{/each}
										</div>
									</div>
								{/each}
							</div>
						</div>
						
						<!-- 배치 쿼리 최적화 정보 -->
						<div class="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
							<h4 class="text-lg font-medium text-yellow-900 mb-2">⚡ 배치 쿼리 최적화</h4>
							<p class="text-sm text-yellow-800">
								🚀 {selectedPosts.length}개의 개별 쿼리가 <strong>1개의 배치 쿼리</strong>로 자동 최적화되었습니다!
							</p>
							<p class="text-xs text-yellow-700 mt-2">
								일반 쿼리: {selectedPosts.length}번의 개별 DB 쿼리 → 
								배치 쿼리: 1번의 최적화된 쿼리
							</p>
						</div>
					</div>
				{/if}
			{/if}
		{:catch error}
			<!-- 에러 처리 -->
			<div class="bg-red-50 p-4 rounded-lg border border-red-200">
				<p class="text-red-800">포스트 로딩 오류: {error.message}</p>
			</div>
		{/await}
	</section>
</div>