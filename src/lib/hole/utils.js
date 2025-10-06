/**
 * 랜덤 딜레이 유틸리티 함수들
 */
/**
 * 랜덤 딜레이를 적용
 * @returns {Promise<void>}
 */
export const applyRandomDelay = async () => {
	const delayMs = Math.floor(Math.random() * 2000) + 1000;
	await new Promise((resolve) => setTimeout(resolve, delayMs));
};
