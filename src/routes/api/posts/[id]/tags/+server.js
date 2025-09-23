import { error } from '@sveltejs/kit';

// 포스트별 태그 데이터 (posts/+server.js와 동일한 데이터)
const postTags = {
	'1': ['SvelteKit', 'JavaScript', 'Remote Functions', 'TypeScript'],
	'2': ['Architecture', 'Design Patterns', 'CQRS', 'Backend'],
	'3': ['SvelteKit', 'Forms', 'Prerender', 'SSG'],
	'4': ['TypeScript', 'JavaScript', 'Type Safety', 'Generics'],
	'5': ['Performance', 'Optimization', 'Web Vitals', 'Frontend'],
	'6': ['Docker', 'Kubernetes', 'CI/CD', 'DevOps', 'Deployment'],
	'7': ['React', 'Svelte', 'JavaScript', 'Framework', 'Comparison'],
	'8': ['GraphQL', 'API', 'Backend', 'Performance', 'Database'],
	'9': ['CSS', 'Grid', 'Flexbox', 'Layout', 'Responsive'],
	'10': ['Security', 'Authentication', 'JWT', 'OAuth', 'Backend']
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const { id } = params;
	
	// 쿼리 파라미터에서 delay 값 가져오기 (기본값: 500ms)
	const delayParam = url.searchParams.get('delay');
	const delay = delayParam ? parseInt(delayParam) : 500;
	
	// 딜레이 적용
	await new Promise(resolve => setTimeout(resolve, delay));
	
	// 포스트 ID 유효성 검사
	if (!postTags[id]) {
		error(404, `Post with id ${id} not found`);
	}
	
	// 실시간 서버 시간 추가
	const currentDatetime = new Date().toISOString();
	
	const response = {
		postId: parseInt(id),
		tags: postTags[id],
		retrievedAt: currentDatetime
	};
	
	return new Response(JSON.stringify(response));
}