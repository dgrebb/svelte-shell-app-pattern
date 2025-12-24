import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { playwright } from '@vitest/browser-playwright';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		// Tailwind's Vite plugin typing is currently incompatible across Vite minor versions in this monorepo.
		// Runtime behavior is correct; cast to avoid svelte-check failing on config typing.
		tailwindcss() as any
	],
	resolve: {
		alias: [
			// shadcn-svelte currently generates this import path; alias it to our actual monorepo util module
			{
				find: /^src\/lib\/utils(\.js)?$/,
				replacement: fileURLToPath(new URL('../packages/ui/src/lib/utils/index.ts', import.meta.url))
			}
		],
		extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.svelte']
	},

	test: {
		expect: { requireAssertions: true },

		projects: [
			{
				extends: './vite.config.ts',

				test: {
					name: 'client',

					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},

					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',

				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
