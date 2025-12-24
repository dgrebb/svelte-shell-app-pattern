<script lang="ts">
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import LockIcon from '@lucide/svelte/icons/lock';
	import * as Card from '@acme/ui/Card';
	import { Button } from '@acme/ui/Button';
</script>

<div class="grid h-full w-full lg:grid-cols-2">
	<div class="flex flex-col gap-4 p-6 md:p-10">
		<div class="flex justify-center gap-2 md:justify-start">
			<a href="##" class="flex items-center gap-2 font-medium">
				<div
					class="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
				>
					<GalleryVerticalEndIcon class="size-4" />
				</div>
				Acme Inc.
			</a>
		</div>
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<Card.Root class="flex flex-col justify-center pt-0 text-center">
					<Card.Header class="flex flex-col items-center border-b border-border bg-primary/10 py-6">
						<Card.Title class="text-xl font-bold">Login to your account</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</Card.Content>
					<Card.Footer class="flex justify-center">
						<Button size="lg" variant="default" href="/dashboard">
							<LockIcon class="size-4" /> Login with SSO
						</Button>
					</Card.Footer>
				</Card.Root>
			</div>
		</div>
	</div>
	<div class="relative hidden bg-muted lg:block">
		<img
			src="/chalk.png"
			alt="placeholder"
			class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
