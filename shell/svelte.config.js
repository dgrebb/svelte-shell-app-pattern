import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: { adapter: adapter() },

	vite: {
		ssr: {
			noExternal: ['@acme/state', '@acme/ui', '@acme/feature-alpha', '@acme/feature-beta']
		}
	}
};

export default config;
