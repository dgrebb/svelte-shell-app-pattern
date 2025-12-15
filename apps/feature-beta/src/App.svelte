<script lang="ts">
  import { getContext } from 'svelte';
  import pluralize from 'pluralize';
  import TeamStatus from '@acme/ui/TeamStatus.svelte';
  import type { ShellState } from '@acme/state';

  const shell = getContext<ShellState>('shell');
  let msg = $state(shell.teamMessage);

  function publish() {
    shell.updateTeamStatus({ message: msg, updatedBy: 'Beta' });
  }
</script>

<h1>Beta</h1>
<p class="hint">Beta uses <code>pluralize</code> and has no charting dependency.</p>

<TeamStatus {shell} />

<div class="box">
  <label>
    Update team status:
    <input value={msg} oninput={(e) => (msg = (e.target as HTMLInputElement).value)} />
  </label>
  <button onclick={publish}>Publish from Beta</button>

  <div class="meta">
    That’s {pluralize('update', 1, true)} worth of power.
  </div>
</div>

<style>
  .hint { opacity: 0.75; }
  .box { margin-top: 16px; padding: 12px; border: 1px solid color-mix(in oklab, currentColor 18%, transparent); border-radius: 12px; }
  input { width: min(520px, 100%); display: block; margin-top: 6px; padding: 8px; }
  button { margin-top: 10px; padding: 8px 12px; border-radius: 10px; }
  .meta { margin-top: 10px; opacity: 0.75; font-size: 13px; }
</style>
