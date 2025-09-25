// 간단한 사용자 목록 더미 데이터
const users = [
	{ id: 1, name: "김개발", role: "Frontend Developer" },
	{ id: 2, name: "박코딩", role: "Backend Developer" },
	{ id: 3, name: "이프론트", role: "UI/UX Designer" },
	{ id: 4, name: "최백엔드", role: "DevOps Engineer" },
	{ id: 5, name: "정풀스택", role: "Full Stack Developer" },
	{ id: 6, name: "한데이터", role: "Data Scientist" },
	{ id: 7, name: "송모바일", role: "Mobile Developer" },
	{ id: 8, name: "임보안", role: "Security Engineer" }
];

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    // 쿼리 파라미터에서 delay 값 가져오기 (기본값: 300ms)
    const delayParam = url.searchParams.get('delay');
    const delay = delayParam ? parseInt(delayParam) : 300;
    
    // 딜레이 적용
    await new Promise(resolve => setTimeout(resolve, delay));

    return new Response(JSON.stringify(users));
}