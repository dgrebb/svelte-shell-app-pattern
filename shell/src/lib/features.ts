import type { AppId } from '@acme/state';

export const FEATURES: Record<AppId, { title: string; route: string; load: () => Promise<any> }> = {
	alpha: {
		title: 'Alpha',
		route: '/alpha',
		load: async () => (await import('@acme/feature-alpha')).loadApp()
	},
	beta: {
		title: 'Beta',
		route: '/beta',
		load: async () => (await import('@acme/feature-beta')).loadApp()
	}
};

const cache = new Map<AppId, Promise<any>>();

export function preloadFeature(appId: AppId) {
	if (!cache.has(appId)) cache.set(appId, FEATURES[appId].load());
	return cache.get(appId)!;
}
