<script lang="ts">
	import '$lib/app.css';
	import favicon from '$lib/assets/favicon.svg';
  import { setContext } from 'svelte';
  import { page } from '$app/state';
  import { ShellState } from '@acme/state';
  import Sidebar from '$lib/Sidebar.svelte';
	import { SvelteSet } from 'svelte/reactivity';

  let { data, children } = $props();
  const enabled = $derived(new SvelteSet<string>(data.enabledApps));

  const shell = new ShellState();
  setContext('shell', shell);

  $effect(() => {
    const p = page.url.pathname;
    shell.setActiveApp(
      p.startsWith('/alpha') ? 'alpha'
    : p.startsWith('/beta') ? 'beta'
    : null
    );
  });

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="layout">
  <Sidebar {enabled} {shell} />
{@render children()}

</div>

<style>
  .layout { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
  .main { padding: 18px 20px; }
</style>
