<script>
	import { FlaskConical } from '@lucide/svelte';
</script>

<div class="container mx-auto max-w-4xl px-6 py-8">
	<div class="mb-8 text-center">
		<div class="mb-4 flex justify-center">
			<FlaskConical class="h-12 w-12 text-slate-600" />
		</div>
		<h1 class="mb-4 text-4xl font-bold text-slate-900">실험실</h1>
		<p class="text-lg text-slate-600">
			실험 기능을 활용한 데모 목록입니다.
		</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<!-- Await -->
		<a href="/experimental/await" class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow block">
			<h3 class="text-xl font-semibold text-slate-900">await</h3>
		</a>
	</div>
</div>