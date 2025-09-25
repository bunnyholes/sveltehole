const SEOUL_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FSeoul';

const fetchWeather = async (fetch) => {
	const response = await fetch(SEOUL_WEATHER_URL);
	return response.json();
};

// 화면에 스켈레톤 디자인이 보이도록 의도적 3초 지연
const fetchWeatherWithDelay = async (fetch, delay = 3000) => {
	console.log(`Delaying weather fetch by ${delay}ms...`);
	await new Promise(resolve => setTimeout(resolve, delay));
	return fetchWeather(fetch);
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	return {
		// SSR용: 완성된 날씨 데이터
		weather: await fetchWeather(fetch),
		
		// await 블록용: 3초 딜레이 + 스트림 렌더링
		promiseWeather: fetchWeatherWithDelay(fetch)
	};
}