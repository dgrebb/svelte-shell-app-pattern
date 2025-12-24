<script lang="ts">
	import './beta.css';
	import { getContext } from 'svelte';
	import pluralize from 'pluralize';
	import TeamStatus from '@acme/ui/TeamStatus';
	import { Button } from '@acme/ui/Button';
	import { Input } from '@acme/ui/Input';
	import { Label } from '@acme/ui/Label';
	import type { ShellState } from '@acme/state';

	const shell = getContext<ShellState>('shell');
	let msg = $state(shell.teamMessage);
	let count = $derived(shell.teamUpdateCount);

	function publish(event: SubmitEvent) {
		event.preventDefault();
		shell.updateTeamStatus({ message: msg, updatedBy: 'Beta' });
	}
</script>

<div class="app-beta">
	<h1 class="bg-primary text-primary-foreground">Beta</h1>
	<p class="hint">
		Beta uses <code>pluralize</code> and has no charting dependency.
	</p>

	<TeamStatus {shell} />

	<div class="flex flex-col gap-4">
		<form onsubmit={(event) => publish(event)} class="flex w-full max-w-sm items-center space-x-2">
			<Input bind:value={msg} />
			<Button type="submit">Update Team Status</Button>
		</form>

		<div class="meta">
			That’s {pluralize('update', count, true)} worth of power.
		</div>
	</div>
</div>
