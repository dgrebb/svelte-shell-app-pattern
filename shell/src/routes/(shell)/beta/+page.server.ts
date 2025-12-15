import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const enabled = new Set(
		(env.PUBLIC_ENABLED_APPS ?? '')
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean)
	);
	if (!enabled.has('beta')) throw error(404);
	return { appId: 'beta' as const };
};
