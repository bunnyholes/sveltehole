import { getRequestEvent, query, form } from '$app/server';
import { guestbook } from '$lib/server/db/schema.js';
import { eq, inArray, desc } from 'drizzle-orm';
import * as v from 'valibot';
import { guestbookFormSchema } from '$lib/validation/guestbookFormSchema.js';
import { applyRandomDelay } from '$lib/hole/utils.js';

/**
 * ❌ N+1 문제가 발생하는 개별 쿼리 패턴
 *
 * 각 ID마다 별도의 DB 쿼리가 실행되어 N+1 문제 발생:
 * - 예시: 10개 아이템 조회 시 → 10번의 DB 쿼리 실행
 * - 각 쿼리마다 네트워크 왕복 시간 발생 (latency × N)
 * - DB 커넥션 풀에 부하 증가
 *
 * 실제 사용 사례에서의 문제:
 * - 댓글 목록에서 각 작성자 정보 조회 시
 * - 장바구니 아이템의 상품 정보 조회 시
 * - 팔로워 목록의 사용자 프로필 조회 시
 */
export const getGuestbookItem = query(v.string(), async (id) => {
	const event = getRequestEvent();
	const db = event.locals.db;

	await applyRandomDelay();

	// 개별 SELECT 쿼리 실행 - 각 호출마다 별도의 DB 쿼리
	return (await db.select().from(guestbook).where(eq(guestbook.id, id)).get()) || null;
});

/**
 * ✅ query.batch를 사용한 N+1 문제 해결
 *
 * SvelteKit 공식 문서: "query.batch는 query와 동일하게 작동하지만,
 * 동일한 매크로태스크 내에서 발생하는 요청들을 배치 처리합니다."
 *
 * 핵심 개념:
 * - 개발자는 단일 키 조회처럼 사용: getGuestbookItems(id)
 * - 프레임워크가 백그라운드에서 자동으로 요청들을 수집하여 배치 처리
 * - 동일한 매크로태스크(렌더링 사이클) 내의 모든 호출이 하나로 그룹화
 *
 * 내부 동작 과정:
 * 1. 첫 번째 getGuestbookItems(id) 호출 시 매크로태스크 시작
 * 2. 동일 매크로태스크 내의 모든 호출들을 수집 (자동 대기)
 * 3. 수집된 모든 ID를 배열로 묶어 단일 배치 함수에 전달
 * 4. 데이터베이스에서 WHERE id IN (...) 쿼리 한 번만 실행
 * 5. 결과를 Map으로 변환하여 O(1) 조회 성능 보장
 * 6. 각 개별 호출자에게 해당하는 데이터만 반환
 *
 * 성능 개선:
 * - N개 쿼리 → 1개 쿼리 (최대 N배 개선)
 * - HTTP 요청: N회 → 1회
 * - 데이터베이스 커넥션: N개 → 1개
 *
 * 개발자 경험:
 * - 사용법은 일반 query와 100% 동일
 * - 타입 안전성 완벽 유지
 * - 별도의 배치 로직 구현 불필요
 */
export const getGuestbookItems = query.batch(v.string(), async (ids) => {
	const event = getRequestEvent();
	const db = event.locals.db;

	await applyRandomDelay();

	// 모든 ID를 한 번의 쿼리로 조회 - WHERE id IN (id1, id2, id3, ...)
	const results = await db.select().from(guestbook).where(inArray(guestbook.id, ids)).all();

	// ID를 키로 하는 맵 생성 - O(1) 조회를 위한 최적화
	const itemsMap = new Map(results.map((/** @type {any} */ item) => [item.id, item]));

	// 각 개별 요청에 대한 결과를 반환하는 함수
	// 프레임워크가 이 함수를 사용해 각 호출자에게 맞는 데이터 전달
	return (id) => itemsMap.get(id) || null;
});

// 방명록 작성 (Form용)
export const addGuestbookEntry = form(guestbookFormSchema, async ({ id, name, message }) => {
	const event = getRequestEvent();
	const db = event.locals.db;

	await db.insert(guestbook).values({
		id,
		name: String(name).trim(),
		message: String(message).trim()
	});

	return { success: true };
});

// 전체 방명록 항목 조회 (Form용)
export const getGuestbookEntries = query(async () => {
	const event = getRequestEvent();
	const db = event.locals.db;

	await applyRandomDelay();

	return await db.select().from(guestbook).orderBy(desc(guestbook.createdAt));
});
