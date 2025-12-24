export const manifest = {
	id: 'beta',
	title: 'Beta (No Charts)',
	route: '/beta'
} as const;
export const loadApp = () => import('./App.svelte');
