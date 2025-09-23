import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	// 쿼리 파라미터에서 딜레이 가져오기 (기본값 2000ms)
	const delay = parseInt(url.searchParams.get('delay') ?? '2000');
	
	// 딜레이 적용
	await new Promise(resolve => setTimeout(resolve, delay));
	
	const users = {
		'1': { id: 1, name: "김개발" },
		'2': { id: 2, name: "박코딩" }
	};
	
	const user = users[params.id];
	
	if (!user) {
		return json({ error: 'User not found' }, { status: 404 });
	}
	
	return json(user);
}