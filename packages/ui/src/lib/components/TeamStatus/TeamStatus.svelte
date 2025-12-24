<script lang="ts">
	import type { ShellState } from '@acme/state';
	let { shell } = $props<{ shell: ShellState }>();
	import * as Card from '@acme/ui/Card';
</script>

<Card.Root class="my-4 w-full max-w-sm">
	<Card.Header>
		<Card.Title>Team Status</Card.Title>
	</Card.Header>
	<Card.Content>
		<p>{shell.teamMessage}</p>
	</Card.Content>
	<Card.Footer>
		<Card.Description>
			Last updated
			<span>by {shell.teamUpdatedBy}</span>
			<span>•</span>
			<span>{new Date(shell.teamUpdatedAt).toLocaleTimeString()}</span>
		</Card.Description>
	</Card.Footer>
</Card.Root>
