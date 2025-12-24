import type { AppId } from '@acme/state';
import type { Component } from 'svelte';
import SquareLibraryIcon from '@lucide/svelte/icons/square-library';
import SquareKanbanIcon from '@lucide/svelte/icons/square-kanban';

export const FEATURES: Record<
	AppId,
	{
		title: string;
		route: string;
		// Icon component (e.g. from @lucide/svelte). Kept loose because Sidebar menu button props
		// don't expose a stable `icon` prop type.
		icon?: Component;
		items?: { title: string; route: string; icon?: Component }[];
		load: () => Promise<unknown>;
	}
> = {
	alpha: {
		title: 'Alpha',
		route: '/alpha',
		icon: SquareLibraryIcon,
		load: async () => (await import('@acme/feature-alpha')).loadApp()
	},
	beta: {
		title: 'Beta',
		route: '/beta',
		icon: SquareKanbanIcon,
		load: async () => (await import('@acme/feature-beta')).loadApp()
	}
};

const cache = new Map<AppId, Promise<any>>();

export function preloadFeature(appId: AppId) {
	if (!cache.has(appId)) cache.set(appId, FEATURES[appId].load());
	return cache.get(appId)!;
}
