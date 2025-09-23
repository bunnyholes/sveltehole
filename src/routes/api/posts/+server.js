// 더미 데이터 (날짜 제외)
const posts = [
	{ 
		id: 1, 
		title: 'SvelteKit Remote Functions 가이드', 
		content: 'Remote Functions를 사용하여 타입 안전한 클라이언트-서버 통신을 구현하는 방법을 알아봅시다.', 
		author: '김개발', 
		views: 142,
		category: 'Frontend',
		tags: ['SvelteKit', 'JavaScript', 'Remote Functions', 'TypeScript']
	},
	{ 
		id: 2, 
		title: 'Query와 Command 패턴 비교', 
		content: 'Query는 데이터를 읽어오고, Command는 데이터를 변경합니다. 각각의 사용 사례를 살펴보겠습니다.', 
		author: '이프론트', 
		views: 89,
		category: 'Architecture',
		tags: ['Architecture', 'Design Patterns', 'CQRS', 'Backend']
	},
	{ 
		id: 3, 
		title: 'Form과 Prerender 활용법', 
		content: 'Form을 통한 데이터 제출과 Prerender를 활용한 정적 데이터 생성 방법을 다룹니다.', 
		author: '박백엔드', 
		views: 67,
		category: 'Backend',
		tags: ['SvelteKit', 'Forms', 'Prerender', 'SSG']
	},
	{ 
		id: 4, 
		title: 'TypeScript 타입 시스템 완전 정복', 
		content: 'TypeScript의 고급 타입 시스템과 제네릭을 활용한 안전한 코드 작성법을 알아봅시다.', 
		author: '최타입', 
		views: 203,
		category: 'Frontend',
		tags: ['TypeScript', 'JavaScript', 'Type Safety', 'Generics']
	},
	{ 
		id: 5, 
		title: '웹 성능 최적화 실무 가이드', 
		content: '실제 프로덕션 환경에서 사용할 수 있는 웹 성능 최적화 기법들을 소개합니다.', 
		author: '정성능', 
		views: 156,
		category: 'Performance',
		tags: ['Performance', 'Optimization', 'Web Vitals', 'Frontend']
	},
	{ 
		id: 6, 
		title: 'Docker와 Kubernetes로 배포 자동화', 
		content: '컨테이너 기술을 활용한 효율적인 배포 파이프라인 구축 방법을 다룹니다.', 
		author: '한데브옵스', 
		views: 134,
		category: 'DevOps',
		tags: ['Docker', 'Kubernetes', 'CI/CD', 'DevOps', 'Deployment']
	},
	{ 
		id: 7, 
		title: 'React vs Svelte 심층 비교 분석', 
		content: '두 프레임워크의 철학, 성능, 개발 경험을 다각도로 비교해봅니다.', 
		author: '김비교', 
		views: 278,
		category: 'Frontend',
		tags: ['React', 'Svelte', 'JavaScript', 'Framework', 'Comparison']
	},
	{ 
		id: 8, 
		title: 'GraphQL API 설계와 최적화', 
		content: 'GraphQL의 장점을 최대한 활용하는 API 설계 원칙과 성능 최적화 기법을 소개합니다.', 
		author: '이그래프', 
		views: 95,
		category: 'Backend',
		tags: ['GraphQL', 'API', 'Backend', 'Performance', 'Database']
	},
	{ 
		id: 9, 
		title: '모던 CSS: Grid와 Flexbox 마스터하기', 
		content: 'CSS Grid와 Flexbox를 활용한 현대적인 레이아웃 설계 방법을 학습합니다.', 
		author: '박레이아웃', 
		views: 187,
		category: 'Frontend',
		tags: ['CSS', 'Grid', 'Flexbox', 'Layout', 'Responsive']
	},
	{ 
		id: 10, 
		title: '보안 강화를 위한 인증/인가 시스템 구축', 
		content: 'JWT, OAuth, 그리고 최신 보안 표준을 적용한 인증 시스템 구현 가이드입니다.', 
		author: '강보안', 
		views: 219,
		category: 'Security',
		tags: ['Security', 'Authentication', 'JWT', 'OAuth', 'Backend']
	}
];

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    // 쿼리 파라미터에서 delay 값 가져오기 (기본값: 500ms)
    const delayParam = url.searchParams.get('delay');
    const delay = delayParam ? parseInt(delayParam) : 500;
    
    // 딜레이 적용
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // 실시간 서버 시간으로 날짜 추가
    const currentDatetime = new Date().toISOString();
    const postsWithDatetime = posts.map(post => ({
        ...post,
        datetime: currentDatetime
    }));

		console.log(`1`);

    return new Response(JSON.stringify(postsWithDatetime));
}

