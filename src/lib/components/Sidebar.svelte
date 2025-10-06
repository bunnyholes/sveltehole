<script>
	import BarChart3 from '@lucide/svelte/icons/bar-chart-3';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import Palette from '@lucide/svelte/icons/palette';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Settings from '@lucide/svelte/icons/settings';
	import Clock from '@lucide/svelte/icons/clock';
	import Network from '@lucide/svelte/icons/network';
	import { page } from '$app/state';

	const currentPath = $derived(page.url.pathname);
</script>

<!--
  @param {any} Icon - Lucide icon component
  @param {string} label - Label text for the sidebar item
  @param {string} href - URL href for the link
-->
{#snippet sidebarItem(Icon, label, href = '#')}
	<a
		{href}
		class="flex h-20 w-full hover:preset-filled-surface-400-600"
		aria-label={label}
		title={label}
	>
		<div class="grid w-20 place-items-center-safe">
			<Icon />
		</div>
		<span class="flex-1 content-center-safe px-6">{label}</span>
	</a>
{/snippet}

<aside
	class="group fixed h-screen w-full flex-col bg-surface-100-900/70 backdrop-blur transition-opacity
             transition-discrete
             duration-300
             ease-out
             sm:top-0
             sm:left-0
             sm:flex
             sm:w-20 sm:[transition-property:width] sm:open:w-80 starting:open:opacity-0"
	id="sidebar"
	popover
>
	<div class="flex h-full w-full flex-col overflow-x-hidden sm:w-80">
		<!-- 헤더: 로고 -->
		<header class="flex h-20 w-full">
			<button
				aria-label="SvelteHole 홈"
				class="grid h-full w-20 place-items-center-safe"
				popovertarget="sidebar"
				title="SvelteHole 홈"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-menu-icon lucide-menu"
				>
					<path
						d="M4 5h16"
						class="origin-[12px_5px] transition-all duration-300 group-open:translate-y-[7px] group-open:rotate-45"
					/>
					<path d="M4 12h16" class="transition-opacity duration-300 group-open:opacity-0" />
					<path
						d="M4 19h16"
						class="origin-[12px_19px] transition-all duration-300 group-open:-translate-y-[7px] group-open:-rotate-45"
					/>
				</svg>
			</button>
			<div class="flex-1 content-center-safe px-6">
				<p class="preset-typo-title uppercase">Menu</p>
			</div>
		</header>

		<!-- 바디: 메인 내비게이션 (스크롤 가능) -->
		<nav class="flex w-full flex-1 flex-col overflow-y-auto">
			<!-- Experimental 그룹 -->
			{@render sidebarItem(FlaskConical, 'Experimental', '/experimental')}
			<!-- remote functions -->
			{@render sidebarItem(Network, 'Remote Functions', '/experimental/remote-functions')}
		</nav>

		<!-- 푸터: 설정 아이콘 -->
		<footer class="flex w-full flex-col text-surface-400-600">
			{@render sidebarItem(Settings, 'Settings')}
		</footer>
	</div>
</aside>

<button
	aria-label="SvelteHole 홈"
	class="fixed top-0 left-0 grid h-20 w-20 place-items-center-safe sm:hidden"
	popovertarget="sidebar"
	title="SvelteHole 홈"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-menu-icon lucide-menu"
	>
		<path d="M4 5h16" />
		<path d="M4 12h16" />
		<path d="M4 19h16" />
	</svg>
</button>

<style>
	@reference "../../app.css";

	:global(body) {
		@apply sm:ml-20;
	}

	/* 루트에 존재하는 헤더 제어
     사이드바는 모바일 퍼스트에서는 없고 버튼이 존재해야하는데 그 공간을 만들기 위한 여백
     */
	:global(#main-header) {
		@apply ml-20 sm:ml-0;
	}
</style>
