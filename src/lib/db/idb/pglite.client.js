import { PGlite } from '@electric-sql/pglite';
import { bootstrapPglite } from '$lib/db/shared/pglite.bootstrap.js';

/**
 * PGLite client singleton - resolves to the ready PGlite instance
 * Uses IndexedDB for persistent storage
 * HMR-safe: window 전역에 저장하여 모듈 재로드 시에도 재사용
 * @type {Promise<import('@electric-sql/pglite').PGlite | null>}
 */
export const ready = (() => {
	if (import.meta.env.SSR) {
		return Promise.resolve(null);
	}

	// HMR로 인한 재초기화 방지
	const GLOBAL_KEY = '__sveltehole_pglite_ready__';

	if (window[GLOBAL_KEY]) {
		return window[GLOBAL_KEY];
	}

	const db = new PGlite('idb://sveltehole-pglite');
	const readyPromise = db.waitReady.then(async () => {
		await bootstrapPglite(db);
		return db;
	});

	window[GLOBAL_KEY] = readyPromise;
	return readyPromise;
})();
