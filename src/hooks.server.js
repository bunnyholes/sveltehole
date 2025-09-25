import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { createDb } from '$lib/server/db';

// DB 핸들러
const handleDb = async ({ event, resolve }) => {
	event.locals.db = createDb(event.platform);
	return resolve(event);
};

// Paraglide 핸들러
const handleParaglide = ({ event, resolve }) => {
	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};

// 시퀀스로 조합
export const handle = sequence(handleDb, handleParaglide);
