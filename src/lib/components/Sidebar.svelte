<script>
	import BarChart3 from '@lucide/svelte/icons/bar-chart-3';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import Palette from '@lucide/svelte/icons/palette';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Settings from '@lucide/svelte/icons/settings';
	import Clock from '@lucide/svelte/icons/clock';
	import Network from '@lucide/svelte/icons/network';
	import {page} from '$app/state';
	import {afterNavigate} from '$app/navigation';

	const currentPath = $derived(page.url.pathname);

	/** @type {HTMLElement | null} */
	let sidebarElement = $state(null);

	afterNavigate(() => {
        sidebarElement?.hidePopover();
	});
</script>

{#snippet sidebarItem(
	/** @type {typeof import('@lucide/svelte').Icon} */ Icon,
	/** @type {string} */ label,
	/** @type {string} */ href = '#'
)}
    <a
        href={href}
        class={`flex h-20 w-full hover:preset-filled-surface-400-600`}
        aria-label={label}
        title={label}
    >
        <div class="w-20 grid place-items-center-safe">
            <Icon />
        </div>
        <span class="flex-1 content-center-safe px-6">{label}</span>
    </a>
{/snippet}

<aside bind:this={sidebarElement} class="group fixed sm:left-0 sm:top-0  w-full sm:w-20 sm:open:w-80 h-screen
             transition-discrete
             starting:open:opacity-0 
             transition-opacity
             sm:[transition-property:width]
             duration-300
             ease-out
             sm:flex flex-col bg-surface-100-900/70 backdrop-blur" id="sidebar"
       popover>
    <div class="flex flex-col w-full h-full sm:w-80 overflow-x-hidden">
        <!-- 헤더: 로고 -->
        <header class="flex w-full h-20">
            <button aria-label="SvelteHole 홈"
                    class="grid place-items-center-safe w-20 h-full "
                    popovertarget="sidebar"
                    title="SvelteHole 홈">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu ">
                    <path d="M4 5h16" class="transition-all duration-300 origin-[12px_5px] group-open:translate-y-[7px] group-open:rotate-45"/>
                    <path d="M4 12h16" class="transition-opacity duration-300 group-open:opacity-0"/>
                    <path d="M4 19h16" class="transition-all duration-300 origin-[12px_19px] group-open:-translate-y-[7px] group-open:-rotate-45"/>
                </svg>
            </button>
            <div class="flex-1 content-center-safe px-6">
                <p class="uppercase">Menu</p>
            </div>
        </header>

        <!-- 바디: 메인 내비게이션 (스크롤 가능) -->
        <nav class="flex-1 flex flex-col w-full overflow-y-auto">
            <!-- Experimental 그룹 -->
            {@render sidebarItem(FlaskConical, 'Experimental', '/experimental')}
            <!-- remote functions -->
            {@render sidebarItem(Network, 'Remote Functions', '/experimental/remote-functions')}
        </nav>

        <!-- 푸터: 설정 아이콘 -->
        <footer class="flex flex-col w-full text-surface-400-600">
            {@render sidebarItem(Settings, 'Settings', '/settings')}
        </footer>
    </div>
</aside>

<button aria-label="SvelteHole 홈"
        class="fixed sm:hidden left-0 top-0 w-20 h-20 grid place-items-center-safe"
        popovertarget="sidebar"
        title="SvelteHole 홈">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu">
        <path d="M4 5h16"/>
        <path d="M4 12h16"/>
        <path d="M4 19h16"/>
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
        @apply pl-20 sm:pl-0;
    }
</style>
