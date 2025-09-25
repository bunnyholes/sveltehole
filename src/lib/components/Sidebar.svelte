<script>
	import BarChart3 from '@lucide/svelte/icons/bar-chart-3';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import Palette from '@lucide/svelte/icons/palette';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Settings from '@lucide/svelte/icons/settings';
	import Clock from '@lucide/svelte/icons/clock';
	import Network from '@lucide/svelte/icons/network';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import {page} from '$app/state';

	const currentPath = $derived(page.url.pathname);
</script>

<div style="display: contents">
<aside class="group fixed inset-0 sm:left-0 sm:top-0 sm:inset-auto w-full sm:w-20 sm:open:w-80 h-full sm:h-screen 
             transition-discrete
             starting:open:opacity-0 
             open:opacity-100 
             transition-opacity
             sm:[transition-property:width]
             duration-300
             ease-out
             sm:flex flex-col border-r border-slate-200 bg-white" id="sidebar"
       popover>
    <div class="flex flex-col w-full sm:w-80 overflow-x-hidden divide-y divide-slate-200">
        <!-- 헤더: 로고 -->
        <header class="w-full h-20">
            <div class="flex h-full w-full">
                <button aria-label="SvelteHole 홈"
                        class="grid place-items-center w-20 h-full text-center content-center font-bold text-white transition text-2xl bg-slate-900 hover:bg-slate-600"
                        popovertarget="sidebar"
                        title="SvelteHole 홈">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu ">
                        <path d="M4 5h16" class="transition-all duration-300 origin-[12px_5px] group-open:translate-y-[7px] group-open:rotate-45"/>
                        <path d="M4 12h16" class="transition-opacity duration-300 group-open:opacity-0"/>
                        <path d="M4 19h16" class="transition-all duration-300 origin-[12px_19px] group-open:-translate-y-[7px] group-open:-rotate-45"/>
                    </svg>
                </button>
                <div class="flex-1 content-center-safe px-6 py-4">
                    <h2 class="text-lg font-semibold text-slate-900 uppercase">Menu</h2>
                </div>
            </div>
        </header>

        <!-- 바디: 메인 내비게이션 (스크롤 가능) -->
        <nav class="flex-1 flex flex-col w-full overflow-y-auto">
            <!-- Experimental 그룹 -->
            <details class="w-full" open={currentPath.startsWith('/experimental')}>
                <summary
                        class="flex h-20 w-full cursor-pointer transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 hover:bg-slate-100">
                    <a class="w-full h-full flex" href="/experimental" title="실험적 기능들">
                        <div class="w-20 flex items-center justify-center">
                            <FlaskConical class="w-6 h-6"/>
                        </div>
                        <span class="flex-1 content-center pl-2">Experimental</span>
                    </a>
                </summary>
                <div class="w-full bg-slate-50">
                    <!-- await SSR -->
                    <a aria-label="await SSR"
                       class="flex h-10 w-full cursor-pointer transition-all duration-150 bg-slate-50 hover:bg-slate-100 text-sm {currentPath === '/experimental/await' ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-600'}" 
                       href="/experimental/await"
                       title="Svelte의 await 블록 SSR 데모">
                        <div class="w-20 flex items-center justify-center">
                            <Clock class="w-4 h-4"/>
                        </div>
                        <span class="flex-1 content-center pl-2">Await SSR</span>
                    </a>
                    <!-- remote functions -->
                    <a aria-label="remote functions"
                       class="flex h-10 w-full cursor-pointer transition-all duration-150 bg-slate-50 hover:bg-slate-100 text-sm {currentPath === '/experimental/remote-functions' ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-600'}" 
                       href="/experimental/remote-functions"
                       title="원격 함수 실행 및 배치 처리 데모">
                        <div class="w-20 flex items-center justify-center">
                            <Network class="w-4 h-4"/>
                        </div>
                        <span class="flex-1 content-center pl-2">Remote Functions</span>
                    </a>
                </div>
            </details>

            <!-- 향후 데모들 (비활성화) -->
            <div class="flex flex-col w-full">
                <!-- Runes Demo -->
                <div class="relative flex w-full group opacity-50" title="Svelte 5 Runes 데모 (준비 중)">
                    <div class="flex h-20 w-full cursor-not-allowed text-slate-400">
                        <div class="w-20 flex items-center justify-center">
                            <Rocket class="w-6 h-6"/>
                        </div>
                        <span class="flex-1 content-center pl-2">Runes Demo</span>
                    </div>
                </div>

                <!-- Animation Lab -->
                <div class="relative flex w-full group opacity-50" title="CSS/JS 애니메이션 실험실 (준비 중)">
                    <div class="flex h-20 w-full cursor-not-allowed text-slate-400">
                        <div class="w-20 flex items-center justify-center">
                            <Palette class="w-6 h-6"/>
                        </div>
                        <span class="flex-1 content-center pl-2">Animation Lab</span>
                    </div>
                </div>

                <!-- Performance Test -->
                <div class="relative flex w-full group opacity-50" title="성능 측정 및 최적화 도구 (준비 중)">
                    <div class="flex h-20 w-full cursor-not-allowed text-slate-400">
                        <div class="w-20 flex items-center justify-center">
                            <BarChart3 class="w-6 h-6"/>
                        </div>
                        <span class="flex-1 content-center pl-2">Performance Test</span>
                    </div>
                </div>
            </div>
        </nav>

        <!-- 푸터: 설정 아이콘 -->
        <footer class="flex flex-col w-full text-slate-400">
            <div class="flex h-16 w-full" title="설정 및 환경설정">
                <div class="w-20 flex items-center justify-center">
                    <Settings class="w-5 h-5"/>
                </div>
                <span class="flex-1 content-center pl-2">Settings</span>
            </div>
        </footer>
    </div>
</aside>

<button aria-label="SvelteHole 홈"
        class="fixed sm:hidden left-0 top-0 w-20 h-20 font-bold text-white transition text-2xl bg-slate-900 hover:bg-slate-600 grid place-items-center"
        popovertarget="sidebar"
        title="SvelteHole 홈">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu">
        <path d="M4 5h16"/>
        <path d="M4 12h16"/>
        <path d="M4 19h16"/>
    </svg>
</button>
</div>

<style>
    @reference "../../app.css";

    :global(body) {
        @apply sm:ml-20;
    }

    :global(#main-header) {
        @apply ml-20 sm:ml-0;
    }
</style>
