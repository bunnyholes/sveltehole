import { drizzle } from 'drizzle-orm/better-sqlite3';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import Database from 'better-sqlite3';
import * as schema from './schema';

export function createDb(platform) {
	if (platform?.env?.DB) {
		// Cloudflare D1 환경
		return drizzleD1(platform.env.DB, { schema });
	} else {
		// 로컬 SQLite 환경
		const client = new Database('local.db');
		return drizzle(client, { schema });
	}
}
