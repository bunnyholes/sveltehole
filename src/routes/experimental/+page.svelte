<script>
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
</script>

<div class="space-y-8">
	<div class="text-center space-y-4">
		<div class="flex justify-center">
			<FlaskConical class="h-12 w-12 text-slate-600" />
		</div>
		<h1 class="text-4xl font-bold text-slate-900">실험실</h1>
		<p class="text-lg text-slate-600">실험 기능을 활용한 데모 목록입니다.</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<a href="/experimental/await" class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow block">
			<h3 class="text-xl font-semibold text-slate-900">await</h3>
			<p class="text-slate-600 mt-2">SSR과 await 방식 비교</p>
		</a>
		<a href="/experimental/remote-functions" class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow block">
			<h3 class="text-xl font-semibold text-slate-900">remote functions</h3>
			<p class="text-slate-600 mt-2">타입 안전한 서버-클라이언트 통신</p>
		</a>
	</div>

	<div class="space-y-2">
		<a href="/experimental/remote-functions/query" class="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:border-blue-200 hover:bg-blue-50 transition-colors">
			<span>Remote Functions · Query</span>
			<span>→</span>
		</a>
		<a href="/experimental/remote-functions/query-batch" class="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
			<span>Remote Functions · Query Batch</span>
			<span>→</span>
		</a>
		<a href="/experimental/remote-functions/form" class="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:border-purple-200 hover:bg-purple-50 transition-colors">
			<span>Remote Functions · Form</span>
			<span>→</span>
		</a>
	</div>
</div>
