<script lang="ts">
	import type { AppId } from '@acme/state';
	import { preloadFeature } from '$lib/features';

	let { appId } = $props<{ appId: AppId }>();

	let Comp = $state<any>(null);
	let loading = $state(true);

	$effect(() => {
		loading = true;
		Comp = null;

		preloadFeature(appId).then((mod) => {
			Comp = mod.default ?? mod;
			loading = false;
		});
	});
</script>

{#if loading}
	<div style="opacity:0.75">Loading {appId}…</div>
{:else}
	<Comp {appId} />
{/if}
