<script>
	import { getUsers } from './data.remote.js';
</script>

<div>
	<h2 class="text-2xl font-semibold text-slate-900 mb-4">👥 getUsers() Query</h2>
	<p class="text-sm text-slate-600 mb-6">/api/users API를 호출하여 사용자 목록을 가져옵니다</p>
	
	{#await getUsers()}
		<!-- 로딩 중 -->
		<div class="animate-pulse">
			<div class="h-8 bg-slate-300 rounded mb-3"></div>
			{#each Array(3) as _}
				<div class="h-10 bg-slate-200 rounded mb-2"></div>
			{/each}
		</div>
	{:then users}
		<!-- 데이터 로딩 완료 -->
		{#if users && Array.isArray(users)}
			<table class="w-full border-collapse border border-slate-300">
				<thead class="bg-slate-100">
					<tr>
						<th class="border border-slate-300 px-4 py-2 text-left text-sm font-semibold w-16">ID</th>
						<th class="border border-slate-300 px-4 py-2 text-left text-sm font-semibold">이름</th>
						<th class="border border-slate-300 px-4 py-2 text-left text-sm font-semibold">역할</th>
					</tr>
				</thead>
				<tbody>
					{#each users as user}
						<tr class="hover:bg-slate-50">
							<td class="border border-slate-300 px-4 py-2 text-sm text-center">{user.id}</td>
							<td class="border border-slate-300 px-4 py-2 text-sm font-medium">{user.name}</td>
							<td class="border border-slate-300 px-4 py-2 text-sm text-slate-600">{user.role}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			
			<p class="text-xs text-slate-600 mt-4">총 {users.length}명의 사용자</p>
		{:else}
			<div class="bg-slate-50 p-4 rounded border">
				<p class="text-slate-600">응답: {JSON.stringify(users, null, 2)}</p>
			</div>
		{/if}
	{:catch error}
		<!-- 에러 처리 -->
		<div class="bg-red-50 p-4 rounded border border-red-200">
			<p class="text-red-800">오류: {error.message}</p>
		</div>
	{/await}
</div>