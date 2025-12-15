import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const raw = env.PUBLIC_ENABLED_APPS ?? '';
	const enabledApps = raw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
	return { enabledApps };
};
