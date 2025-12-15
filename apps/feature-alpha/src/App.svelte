<script lang="ts">
  import { getContext } from 'svelte';
  import { formatDistanceToNowStrict } from 'date-fns';
  import TeamStatus from '@acme/ui/TeamStatus.svelte';
  import type { ShellState } from '@acme/state';

  const shell = getContext<ShellState>('shell');

  let msg = $state(shell.teamMessage);

  let canvas: HTMLCanvasElement | null = null;
  let chart: any = null;

  $effect(() => {
    if (!canvas) return;

    let disposed = false;

    (async () => {
      const { default: Chart } = await import('chart.js/auto'); // Alpha-only dependency
      if (disposed) return;

      chart = new Chart(canvas!.getContext('2d')!, {
        type: 'line',
        data: {
          labels: ['t-3', 't-2', 't-1', 'now'],
          datasets: [{ label: 'Vibe index', data: [2, 3, 4, 5] }]
        },
        options: { responsive: true, animation: false }
      });
    })();

    return () => {
      disposed = true;
      chart?.destroy?.();
      chart = null;
    };
  });

  function publish() {
    shell.updateTeamStatus({ message: msg, updatedBy: 'Alpha' });
  }
</script>

<h1>Alpha</h1>
<p class="hint">Alpha uses <code>chart.js</code> + <code>date-fns</code>.</p>

<TeamStatus {shell} />

<div class="box">
  <label>
    Update team status:
    <input value={msg} oninput={(e) => (msg = (e.target as HTMLInputElement).value)} />
  </label>
  <button onclick={publish}>Publish from Alpha</button>

  <div class="meta">
    Last update was {formatDistanceToNowStrict(shell.teamUpdatedAt)} ago.
  </div>
</div>

<div class="box">
  <h2>Chart (Alpha only)</h2>
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .hint { opacity: 0.75; }
  .box { margin-top: 16px; padding: 12px; border: 1px solid color-mix(in oklab, currentColor 18%, transparent); border-radius: 12px; }
  input { width: min(520px, 100%); display: block; margin-top: 6px; padding: 8px; }
  button { margin-top: 10px; padding: 8px 12px; border-radius: 10px; }
  .meta { margin-top: 10px; opacity: 0.75; font-size: 13px; }
</style>
