<script lang="ts">
	import '$lib/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setContext } from 'svelte';
	import { page } from '$app/state';
	import { ShellState } from '@acme/state';
	import { SvelteSet } from 'svelte/reactivity';
	import { ModeWatcher } from 'mode-watcher';

	let { data, children } = $props();
	const enabled = $derived(new SvelteSet<string>(data.enabledApps));

	const shell = new ShellState();
	setContext('shell', shell);

	$effect(() => {
		const p = page.url.pathname;
		shell.setActiveApp(p.startsWith('/alpha') ? 'alpha' : p.startsWith('/beta') ? 'beta' : null);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher />
{@render children()}
