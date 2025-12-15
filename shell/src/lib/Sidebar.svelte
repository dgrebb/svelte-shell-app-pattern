<script lang="ts">
  import { FEATURES, preloadFeature } from '$lib/features';
  import type { ShellState, AppId } from '@acme/state';

  let { enabled, shell } = $props<{ enabled: Set<string>; shell: ShellState }>();

  const items = (Object.keys(FEATURES) as AppId[]).filter((id) => enabled.has(id));
</script>

<aside class="sidebar">
  <div class="title"><a href="/">Acme Shell</a></div>

  <nav class="nav">
    {#each items as id}
      <a
        class="link"
        class:active={shell.activeAppId === id}
        href={FEATURES[id].route}
        onmouseenter={() => preloadFeature(id)}
      >
        {FEATURES[id].title}
      </a>
    {/each}
  </nav>

  <div class="foot">enabled: {items.join(', ')}</div>
</aside>

<style>
  .sidebar { padding: 16px; border-right: 1px solid color-mix(in oklab, currentColor 18%, transparent); }
  .title { font-weight: 650; margin-bottom: 12px; }
  .nav { display: flex; flex-direction: column; gap: 8px; }
  .link { padding: 10px 12px; border-radius: 12px; text-decoration: none; color: inherit; }
  .link:hover { background: color-mix(in oklab, currentColor 10%, transparent); }
  .active { background: color-mix(in oklab, currentColor 16%, transparent); }
  .foot { margin-top: 18px; opacity: 0.7; font-size: 12px; }
</style>
