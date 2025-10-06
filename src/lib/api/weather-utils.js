import { applyRandomDelay } from '$lib/hole/utils.js';

const SEOUL_WEATHER_URL =
	'https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FSeoul';

/**
 * @param {typeof fetch} fetch
 */
export const fetchWeather = async (fetch) => {
	const response = await fetch(SEOUL_WEATHER_URL);
	return response.json();
};

/**
 * @param {typeof fetch} fetch
 */
export const fetchWeatherWithDelay = async (fetch) => {
	// Kick off the fetch immediately so SvelteKit can track the dependency,
	// then wait before returning to simulate a slow response.
	const weatherPromise = fetchWeather(fetch);
	await applyRandomDelay();
	return weatherPromise;
};
