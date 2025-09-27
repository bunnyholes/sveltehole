/**
 * 랜덤 딜레이 유틸리티 함수들
 */
/**
 * 랜덤 딜레이를 적용하고 로그를 출력
 * @param {string} operationName 작업 이름
 * @param {any} params 작업 파라미터 (로그용)
 * @returns {Promise<void>}
 */
export const applyRandomDelay = async () => {
	const delayMs = Math.floor(Math.random() * 2000) + 1000;
	await new Promise(resolve => setTimeout(resolve, delayMs));
};