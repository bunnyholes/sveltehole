/**
 * 랜덤 딜레이 유틸리티 함수들
 */

/**
 * 1초~3초 사이 랜덤 딜레이를 반환
 * @returns {number} 1000ms~3000ms 사이의 랜덤한 밀리초
 */
export const getRandomDelay = () => Math.floor(Math.random() * 2000) + 1000;

/**
 * 지정된 시간만큼 딜레이를 적용
 * @param {number} ms 딜레이할 밀리초
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 랜덤 딜레이를 적용하고 로그를 출력
 * @param {string} operationName 작업 이름
 * @param {any} params 작업 파라미터 (로그용)
 * @returns {Promise<void>}
 */
export const applyRandomDelay = async (operationName, params = '') => {
	const delayMs = getRandomDelay();
	console.log(`${operationName}(${params}): ${delayMs}ms 딜레이`);
	await delay(delayMs);
};