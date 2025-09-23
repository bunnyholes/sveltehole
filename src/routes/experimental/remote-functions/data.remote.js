import { query, getRequestEvent } from '$app/server';
import * as v from 'valibot';

// Query: /api/posts API를 호출하여 포스트 목록 조회
export const getPosts = query(async () => {
	const event = getRequestEvent();
	const response = await event.fetch('/api/posts');
	return await response.json();
});

// Query Batch: 여러 포스트의 태그를 한 번에 조회
export const getPostTags = query.batch(v.number(), async (postIds) => {
	const event = getRequestEvent();

	// 모든 포스트 ID의 태그를 병렬로 조회 (실제로는 배치 처리됨)
	const tagResponses = await Promise.all(
		postIds.map(async (id) => {
			const response = await event.fetch(`/api/posts/${id}/tags`);
			const data = await response.json();
			return { id, tags: data.tags };
		})
	);
	
	// ID를 키로 하는 맵 생성
	const tagsMap = new Map(tagResponses.map(item => [item.id, item.tags]));
	
	// 각 개별 요청에 대한 결과를 반환하는 함수
	return (postId) => tagsMap.get(postId) || [];
});