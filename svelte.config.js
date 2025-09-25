import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: { runes: true, experimental: { async: true } },
	kit: {
		adapter: adapter(),
		experimental: { remoteFunctions: true }
	}
};

export default config;
