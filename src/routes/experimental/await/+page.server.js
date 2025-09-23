/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	// SSR용 유저: 딜레이 0으로 빠르게 호출
	const userResponse = await fetch('/api/users/1?delay=0');
	const user = await userResponse.json();

	return {
		// SSR용: 완성된 데이터 (딜레이 0으로 빠름)
		user,
		
		// await 블록용: Promise 그대로 전달 (기본 딜레이 2초)
		promiseUser: fetch('/api/users/2').then(r => r.json())
	};
}