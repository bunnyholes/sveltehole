<script>
	import { getPosts } from './data.remote.js';
</script>

<div class="space-y-8">
	<!-- 포스트 목록 섹션 - 테이블 디자인 -->
	<section class="bg-white rounded-lg border border-slate-200 p-6">
		<h2 class="text-2xl font-semibold text-slate-900 mb-6">📋 getPosts() Query - 테이블 뷰</h2>
		<p class="text-sm text-slate-600 mb-4">/api/posts API를 호출하여 데이터를 가져옵니다 (기본 500ms 딜레이).</p>
		
		{#await getPosts()}
			<!-- 로딩 중 -->
			<div class="animate-pulse">
				<div class="h-10 bg-slate-300 rounded mb-4"></div>
				{#each Array(5) as _}
					<div class="h-16 bg-slate-200 rounded mb-2"></div>
				{/each}
			</div>
		{:then posts}
			<!-- 데이터 로딩 완료 -->
			{#if posts && Array.isArray(posts)}
				<div class="overflow-x-auto">
					<table class="w-full border-collapse border border-slate-300">
						<thead class="bg-slate-100">
							<tr>
								<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">ID</th>
								<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">제목</th>
								<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">작성자</th>
								<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">카테고리</th>
								<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">조회수</th>
								<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">태그</th>
								<th class="border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-900">서버 시간</th>
							</tr>
						</thead>
						<tbody>
							{#each posts as post}
								<tr class="hover:bg-slate-50">
									<td class="border border-slate-300 px-4 py-3 text-sm text-slate-900">{post.id}</td>
									<td class="border border-slate-300 px-4 py-3 text-sm">
										<div class="font-medium text-slate-900">{post.title}</div>
										<div class="text-xs text-slate-600 mt-1">{post.content.substring(0, 80)}...</div>
									</td>
									<td class="border border-slate-300 px-4 py-3 text-sm text-slate-700">{post.author}</td>
									<td class="border border-slate-300 px-4 py-3 text-sm">
										<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{post.category}</span>
									</td>
									<td class="border border-slate-300 px-4 py-3 text-sm text-slate-600">{post.views}</td>
									<td class="border border-slate-300 px-4 py-3 text-sm">
										<div class="flex flex-wrap gap-1">
											{#each post.tags.slice(0, 3) as tag}
												<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{tag}</span>
											{/each}
											{#if post.tags.length > 3}
												<span class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">+{post.tags.length - 3}</span>
											{/if}
										</div>
									</td>
									<td class="border border-slate-300 px-4 py-3 text-xs text-slate-500">{post.datetime}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				
				<div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
					<p class="text-xs text-blue-600">
						📊 총 {posts.length}개 포스트 로드됨 | Remote Function을 통해 서버에서 실시간 데이터 조회
					</p>
				</div>
			{:else}
				<div class="bg-slate-50 p-4 rounded-lg border">
					<p class="text-slate-600">응답 데이터: {JSON.stringify(posts, null, 2)}</p>
				</div>
			{/if}
		{:catch error}
			<!-- 에러 처리 -->
			<div class="bg-red-50 p-4 rounded-lg border border-red-200">
				<p class="text-red-800">포스트 로딩 오류: {error.message}</p>
				<p class="text-red-600 text-sm mt-1">API 엔드포인트를 확인해주세요: /api/posts</p>
			</div>
		{/await}
	</section>

</div>