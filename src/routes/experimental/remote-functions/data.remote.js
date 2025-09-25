import {getRequestEvent, query, form} from '$app/server';
import {guestbook} from '$lib/server/db/schema';
import {eq, inArray, desc} from 'drizzle-orm';
import * as v from 'valibot';
import { guestbookFormSchema } from '$lib/validation/guestbookFormSchema.js';
import { applyRandomDelay } from '$lib/server/utils.js';

// 개별 방명록 아이템 조회 (ID로 조회하되 각각 의도적 딜레이)
export const getGuestbookItem = query(v.string(), async (id) => {
	const event = getRequestEvent();
	const db = event.locals.db;
	
	await applyRandomDelay('getGuestbookItem', id);

	return await db
			.select()
			.from(guestbook)
			.where(eq(guestbook.id, id))
			.get() || null;
});

// 방명록 배치 조회 - 여러 ID를 한 번에 조회하여 n+1 문제 해결
export const getGuestbookItems = query.batch(v.string(), async (ids) => {
	const event = getRequestEvent();
	const db = event.locals.db;
	
	await applyRandomDelay('getGuestbookItems', `[${ids.join(',')}]`);
	
	// 모든 ID를 한 번의 쿼리로 조회
	const results = await db
		.select()
		.from(guestbook)
		.where(inArray(guestbook.id, ids))
		.all();
	
	// ID를 키로 하는 맵 생성
	const itemsMap = new Map(results.map(item => [item.id, item]));
	
	// 각 개별 요청에 대한 결과를 반환하는 함수
	return (id) => itemsMap.get(id) || null;
});

// 방명록 작성 (Form용)
export const addGuestbookEntry = form(
	guestbookFormSchema,
	async ({ id, name, message }) => {
		const event = getRequestEvent();
		const db = event.locals.db;
		
		try {
			if (Math.random() < 0.3) {
				throw new Error('저장에 실패했습니다. (확률 30%)');
			}

			await db.insert(guestbook).values({
				id,
				name: String(name).trim(),
				message: String(message).trim()
			});

			await getGuestbookEntries().refresh();

			return { success: true };
		} catch (error) {
			console.error('addGuestbookEntry failed', error);
			return {
				success: false,
				message: error?.message ?? '저장에 실패했습니다.'
			};
		}
	}
);

// 전체 방명록 항목 조회 (Form용)
export const getGuestbookEntries = query(async () => {
	const event = getRequestEvent();
	const db = event.locals.db;
	
	await applyRandomDelay('getGuestbookEntries');

	return await db
		.select()
		.from(guestbook)
		.orderBy(desc(guestbook.createdAt));
});
