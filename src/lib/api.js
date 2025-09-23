/**
 * 가짜 API 함수들 - 원격 데이터 시뮬레이션
 */

export async function fetchPosts(delay = 2000) {
	// 딜레이 설정 (기본값 2초)
	await new Promise(resolve => setTimeout(resolve, delay));
	
	return [
		{
			id: 1,
			title: "첫 번째 게시물",
			author: "김개발"
		},
		{
			id: 2,
			title: "두 번째 게시물",
			author: "박코딩"
		}
	];
}

export async function fetchUserProfile(userId, delay = 2000) {
	// 딜레이 설정 (기본값 2초)
	await new Promise(resolve => setTimeout(resolve, delay));
	
	const users = {
		1: { id: 1, name: "김개발" },
		2: { id: 2, name: "박코딩" }
	};
	
	return users[userId] || null;
}

export async function fetchComments(postId, delay = 2000) {
	// 딜레이 설정 (기본값 2초)
	await new Promise(resolve => setTimeout(resolve, delay));
	
	const comments = {
		1: [{ id: 1, author: "코딩장인", content: "좋은 글이네요!" }],
		2: [{ id: 2, author: "스벨트신도", content: "잘 작동하네요!" }]
	};
	
	return comments[postId] || [];
}