<section class="mx-auto max-w-6xl px-6 py-20">
			<div class="flex flex-col gap-12">
				<div class="max-w-4xl mx-auto">
					<span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm font-medium uppercase tracking-widest text-slate-600">
						🕳️ sveltehole v1.0.0
					</span>
					<h1 class="mt-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
						Svelte 데모<br class="hidden sm:block"/>학습 저장소
					</h1>
					<p class="mt-6 text-lg text-slate-600 leading-relaxed">
						Svelte와 SvelteKit의 다양한 기능들을 실험하고 비교할 수 있는 데모 코드 모음입니다.
					</p>
					<div class="mt-10 flex flex-wrap gap-4">
						<a href="/await"
						   class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800">
							데모 둘러보기
							<svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4" fill="none"
								 stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
								 stroke-width="1.75">
								<path d="M5 12h14"/>
								<path d="M13 6l6 6-6 6"/>
							</svg>
						</a>
						<a href="https://github.com/bunnyholes/sveltehole"
						   class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
							GitHub 리포지토리
						</a>
					</div>

					<!-- 기술 스택 아이콘 그리드 -->
					<div class="mt-16 space-y-12">
						<h3 class="text-center text-sm font-semibold uppercase tracking-widest text-slate-500 mb-8">
							Tech Stack</h3>

						<!-- Core Frontend -->
						<div class="space-y-4">
							<h4 class="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center">
								⚡ Core Frontend
							</h4>
							<div class="grid grid-cols-2 gap-3 justify-items-center max-w-xs mx-auto">
								<!-- Svelte -->
								<div class="w-20 h-20 rounded-xl border border-slate-200 bg-white p-3 shadow-sm flex flex-col items-center justify-center">
									<div class="text-2xl mb-1">🧡</div>
									<div class="text-xs font-semibold text-center text-slate-600">Svelte 5</div>
								</div>

								<!-- SvelteKit -->
								<div class="w-20 h-20 rounded-xl border border-slate-200 bg-white p-3 shadow-sm flex flex-col items-center justify-center">
									<div class="text-2xl mb-1">⚡</div>
									<div class="text-xs font-semibold text-center text-slate-600">SvelteKit</div>
								</div>
							</div>
						</div>

						<!-- Styling -->
						<div class="space-y-4">
							<h4 class="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center">
								🎨 Styling
							</h4>
							<div class="grid grid-cols-2 gap-3 justify-items-center max-w-xs mx-auto">
								<!-- Tailwind CSS -->
								<div class="w-20 h-20 rounded-xl border border-slate-200 bg-white p-3 shadow-sm flex flex-col items-center justify-center">
									<div class="text-2xl mb-1">💨</div>
									<div class="text-xs font-semibold text-center text-slate-600">Tailwind</div>
								</div>

								<!-- Vite -->
								<div class="w-20 h-20 rounded-xl border border-slate-200 bg-white p-3 shadow-sm flex flex-col items-center justify-center">
									<div class="text-2xl mb-1">⚡</div>
									<div class="text-xs font-semibold text-center text-slate-600">Vite</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="mx-auto flex w-full max-w-4xl flex-col gap-6">
					<div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
						<div>
							<span class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">데모 목록</span>
							<p class="mt-4 text-lg font-semibold text-slate-900">현재 구현된 데모</p>
							<div class="mt-6 grid gap-6 sm:grid-cols-1">
								<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
									<div class="flex items-center mb-4">
										<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
											<span class="text-2xl">⚡</span>
										</div>
										<div>
											<h3 class="text-lg font-semibold text-slate-900">Await SSR 비교</h3>
											<p class="text-sm text-slate-500">비동기 서버 렌더링</p>
										</div>
									</div>
									<p class="text-slate-600 mb-4">
										Svelte 5의 await 블록과 전통적인 SSR 방식을 비교합니다.
										스켈레톤 UI와 점진적 로딩의 차이를 확인할 수 있습니다.
									</p>
									<div class="flex gap-2">
										<a href="/traditional-ssr" class="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors">
											Non-Await SSR
										</a>
										<a href="/await" class="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
											Await SSR
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="mx-auto max-w-6xl px-6 py-20">
			<div class="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
				<div class="space-y-8">
					<div>
						<span class="inline-flex items-center gap-2 rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold text-slate-700">
							프로젝트 개요
						</span>
						<h2 class="mt-4 text-3xl font-bold text-slate-900">Svelte 5 학습을 위한 구성</h2>
						<p class="mt-3 text-base text-slate-500">
							Svelte 5의 새로운 기능들과 SvelteKit의 다양한 렌더링 패턴을 
							실제 코드로 비교하고 학습할 수 있는 데모 모음입니다.
						</p>
					</div>
					<div class="grid gap-6 sm:grid-cols-2">
						<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
							<h3 class="text-lg font-semibold text-slate-900">SSR 비교</h3>
							<p class="mt-2 text-sm text-slate-500">Non-Await SSR과 Await SSR의 성능과 사용자 경험 비교</p>
						</div>
						<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-50">
							<h3 class="text-lg font-semibold text-slate-400">Svelte 5 Runes</h3>
							<p class="mt-2 text-sm text-slate-400">새로운 반응성 시스템 $state, $derived, $effect</p>
						</div>
						<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-50">
							<h3 class="text-lg font-semibold text-slate-400">애니메이션</h3>
							<p class="mt-2 text-sm text-slate-400">Svelte의 transition과 motion API 활용</p>
						</div>
						<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-50">
							<h3 class="text-lg font-semibold text-slate-400">성능 측정</h3>
							<p class="mt-2 text-sm text-slate-400">번들 크기, 렌더링 속도, 메모리 사용량 비교</p>
						</div>
					</div>
				</div>
				<div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-md">
					<h3 class="text-2xl font-semibold text-slate-900">주요 특징</h3>
					<ul class="mt-6 space-y-5 text-sm">
						<li class="flex items-start gap-3">
							<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-slate-400"></span>
							<div>
								<p class="font-medium text-slate-900">실시간 비교</p>
								<p class="mt-1 text-slate-600">같은 데이터로 다른 렌더링 방식을 직접 비교</p>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-slate-400"></span>
							<div>
								<p class="font-medium text-slate-900">소스 코드 공개</p>
								<p class="mt-1 text-slate-600">모든 구현 방식의 코드를 확인하고 학습</p>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-slate-400"></span>
							<div>
								<p class="font-medium text-slate-900">최신 기술</p>
								<p class="mt-1 text-slate-600">Svelte 5, Tailwind CSS v4, Vite 등 최신 스택</p>
							</div>
						</li>
					</ul>
					<a href="https://github.com/gimtaehui/sveltehole" target="_blank" rel="noreferrer noopener"
					   class="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800">
						깃허브 리포지토리 살펴보기
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
							 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
							 class="h-4 w-4">
							<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
							<path d="M9 18c-4.51 2-5-2-7-2"/>
						</svg>
					</a>
				</div>
			</div>
</section>

<section class="mx-auto max-w-6xl px-6 py-20">
	<div class="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
		<div class="space-y-8">
			<div>
				<span class="inline-flex items-center gap-2 rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold text-slate-700">
					프로젝트 개요
				</span>
				<h2 class="mt-4 text-3xl font-bold text-slate-900">Svelte 5 학습을 위한 구성</h2>
				<p class="mt-3 text-base text-slate-500">
					Svelte 5의 새로운 기능들과 SvelteKit의 다양한 렌더링 패턴을 
					실제 코드로 비교하고 학습할 수 있는 데모 모음입니다.
				</p>
			</div>
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<h3 class="text-lg font-semibold text-slate-900">SSR 비교</h3>
					<p class="mt-2 text-sm text-slate-500">Non-Await SSR과 Await SSR의 성능과 사용자 경험 비교</p>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-50">
					<h3 class="text-lg font-semibold text-slate-400">Svelte 5 Runes</h3>
					<p class="mt-2 text-sm text-slate-400">새로운 반응성 시스템 $state, $derived, $effect</p>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-50">
					<h3 class="text-lg font-semibold text-slate-400">애니메이션</h3>
					<p class="mt-2 text-sm text-slate-400">Svelte의 transition과 motion API 활용</p>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-50">
					<h3 class="text-lg font-semibold text-slate-400">성능 측정</h3>
					<p class="mt-2 text-sm text-slate-400">번들 크기, 렌더링 속도, 메모리 사용량 비교</p>
				</div>
			</div>
		</div>
		<div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-md">
			<h3 class="text-2xl font-semibold text-slate-900">주요 특징</h3>
			<ul class="mt-6 space-y-5 text-sm">
				<li class="flex items-start gap-3">
					<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-slate-400"></span>
					<div>
						<p class="font-medium text-slate-900">실시간 비교</p>
						<p class="mt-1 text-slate-600">같은 데이터로 다른 렌더링 방식을 직접 비교</p>
					</div>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-slate-400"></span>
					<div>
						<p class="font-medium text-slate-900">소스 코드 공개</p>
						<p class="mt-1 text-slate-600">모든 구현 방식의 코드를 확인하고 학습</p>
					</div>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-slate-400"></span>
					<div>
						<p class="font-medium text-slate-900">최신 기술</p>
						<p class="mt-1 text-slate-600">Svelte 5, Tailwind CSS v4, Vite 등 최신 스택</p>
					</div>
				</li>
			</ul>
			<a href="https://github.com/bunnyholes/sveltehole" target="_blank" rel="noreferrer noopener"
			   class="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800">
				깃허브 리포지토리 살펴보기
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
					 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					 class="h-4 w-4">
					<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
					<path d="M9 18c-4.51 2-5-2-7-2"/>
				</svg>
			</a>
		</div>
	</div>
</section>