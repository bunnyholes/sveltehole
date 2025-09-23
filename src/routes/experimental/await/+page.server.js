import { fetchPosts, fetchUserProfile, fetchComments } from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// 첫 번째 게시물 1개와 첫 번째 사용자 1개만 가져오기
	const [posts, user] = await Promise.all([
		fetchPosts(0), // 딜레이 없음
		fetchUserProfile(1, 0) // 딜레이 없음
	]);

	// 첫 번째 게시물의 댓글만 가져오기
	const firstPost = posts[0];
	if (firstPost) {
		firstPost.comments = await fetchComments(firstPost.id, 0); // 딜레이 없음
	}

	return {
		posts: firstPost ? [firstPost] : [],
		users: user ? [user] : []
	};
}