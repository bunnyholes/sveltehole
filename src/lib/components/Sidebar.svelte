<script>
	import { Zap, Construction, Rocket, Palette, BarChart3, Settings, FlaskConical } from '@lucide/svelte';
	import { page } from '$app/stores';
	
	const currentPath = $derived($page.url.pathname);
</script>

<aside class="fixed left-0 top-0 flex h-screen w-20 flex-col border-r border-slate-200 bg-white divide-y divide-slate-200">
	<!-- 헤더: 로고 -->
	<header class="w-full h-20 bg-white/80">
		<a class="w-full h-full block text-center content-center font-bold text-white transition text-2xl {currentPath === '/' ? 'bg-slate-900' : 'bg-slate-700 hover:bg-slate-800'}"
		   href="/" aria-label="SvelteHole 홈">
			SH
		</a>
	</header>

	<!-- 바디: 메인 네비게이션 (스크롤 가능) -->
	<nav class="flex-1 flex flex-col w-full overflow-y-auto">
		<!-- Experimental 그룹 -->
		<details class="w-full" open={currentPath.startsWith('/experimental')}>
			<summary class="flex h-20 w-full items-center justify-center cursor-pointer transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 hover:bg-slate-100">
				<a href="/experimental" class="w-full h-full flex items-center justify-center">
					<FlaskConical class="w-6 h-6" />
				</a>
			</summary>
			<div class="w-full bg-slate-50">
				<!-- await SSR -->
				<a class="flex h-10 w-full items-center justify-center cursor-pointer transition-all duration-150 bg-slate-50 hover:bg-slate-100 text-sm {currentPath === '/experimental/await' ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-600'}"
				   href="/experimental/await" aria-label="await SSR">
					await
				</a>
				<!-- remote functions -->
				<a class="flex h-10 w-full items-center justify-center cursor-pointer transition-all duration-150 bg-slate-50 hover:bg-slate-100 text-sm {currentPath === '/experimental/remote-functions' ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-600'}"
				   href="/experimental/remote-functions" aria-label="remote functions">
					remote
				</a>
			</div>
		</details>

		<!-- 향후 데모들 (비활성화) -->
		<div class="flex flex-col w-full">
			<!-- Runes Demo -->
			<div class="relative flex w-full group opacity-50">
				<div class="flex h-20 w-full items-center justify-center cursor-not-allowed text-slate-400">
					<Rocket class="w-6 h-6" />
				</div>
			</div>

			<!-- Animation Lab -->
			<div class="relative flex w-full group opacity-50">
				<div class="flex h-20 w-full items-center justify-center cursor-not-allowed text-slate-400">
					<Palette class="w-6 h-6" />
				</div>
			</div>

			<!-- Performance Test -->
			<div class="relative flex w-full group opacity-50">
				<div class="flex h-20 w-full items-center justify-center cursor-not-allowed text-slate-400">
					<BarChart3 class="w-6 h-6" />
				</div>
			</div>
		</div>
	</nav>

	<!-- 푸터: 설정 아이콘 -->
	<footer class="flex flex-col w-full text-slate-400">
		<div class="flex h-16 w-full items-center justify-center">
			<Settings class="w-5 h-5" />
		</div>
	</footer>
</aside>