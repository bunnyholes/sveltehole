import { worker } from '@electric-sql/pglite/worker';
import { PGlite } from '@electric-sql/pglite';
import { bootstrapPglite } from '$lib/db/shared/pglite.bootstrap.js';

worker({
	async init() {
		const pg = new PGlite('opfs-ahp://sveltehole-opfs-demo');
		await bootstrapPglite(pg);
		return pg;
	}
});
