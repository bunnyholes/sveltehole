import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const guestbook = sqliteTable('guestbook', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	message: text('message').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});
