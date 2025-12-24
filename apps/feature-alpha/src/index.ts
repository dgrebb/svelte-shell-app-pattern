export const manifest = {
	id: 'alpha',
	title: 'Alpha (Charts)',
	route: '/alpha'
} as const;
export const loadApp = () => import('./App.svelte');
