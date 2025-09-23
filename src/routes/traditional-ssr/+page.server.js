import { fetchPosts, fetchUserProfile, fetchComments } from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [posts, users] = await Promise.all([
		fetchPosts(),
		Promise.all([1, 2].map(id => fetchUserProfile(id)))
	]);

	const postsWithComments = await Promise.all(
		posts.map(async (post) => ({
			...post,
			comments: await fetchComments(post.id)
		}))
	);

	return {
		posts: postsWithComments,
		users: users.filter(Boolean)
	};
}