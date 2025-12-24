<script lang="ts">
	import './alpha.css';
	import { getContext } from 'svelte';
	import { formatDistanceToNowStrict } from 'date-fns';
	import TeamStatus from '@acme/ui/TeamStatus';
	import { Button } from '@acme/ui/Button';
	import { Input } from '@acme/ui/Input';
	import { Label } from '@acme/ui/Label';
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

<div class="app-alpha">
	<h1>Alpha</h1>
	<p class="hint">Alpha uses <code>chart.js</code> + <code>date-fns</code>.</p>

	<TeamStatus {shell} />

	<div class="flex flex-col gap-4">
		<form onsubmit={(event) => publish(event)} class="flex w-full max-w-sm items-center space-x-2">
			<Input bind:value={msg} />
			<Button type="submit">Update Team Status</Button>
		</form>

		<div class="meta">
			Last update was {formatDistanceToNowStrict(shell.teamUpdatedAt)} ago.
		</div>
	</div>

	<div class="flex flex-col gap-4">
		<h2>Chart (Alpha only)</h2>
		<canvas bind:this={canvas}></canvas>
	</div>
</div>
