<script lang="ts">
  import type { ShellState } from "@acme/state";
  let { shell } = $props<{ shell: ShellState }>();
</script>

<section class="team">
  <div class="label">Team Status</div>
  <div class="msg">{shell.teamMessage}</div>
  <div class="meta">
    <span>by {shell.teamUpdatedBy}</span>
    <span>•</span>
    <span>{new Date(shell.teamUpdatedAt).toLocaleTimeString()}</span>
  </div>
</section>

<style>
  .team {
    border: 1px solid color-mix(in oklab, currentColor 18%, transparent);
    border-radius: 12px;
    padding: 12px 14px;
  }
  .label {
    opacity: 0.7;
    font-size: 12px;
    margin-bottom: 6px;
  }
  .msg {
    font-size: 16px;
    margin-bottom: 8px;
  }
  .meta {
    opacity: 0.7;
    font-size: 12px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
</style>
