<script lang="ts">
	import * as Collapsible from '@acme/ui/Collapsible';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import type { Component } from 'svelte';

	let {
		items
	}: {
		items: {
			title: string;
			route: string;
			icon?: Component;
			items?: { title: string; route: string; icon?: Component }[];
			isActive?: boolean;
		}[];
	} = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Applications</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			{#if item.items && item.items.length > 0}
				<Collapsible.Root open={item.isActive} class="group/collapsible">
					{#snippet child({ props }: { props: any })}
						<Sidebar.MenuItem {...props}>
							<Collapsible.Trigger>
								{#snippet child({ props }: { props: any })}
									<Sidebar.MenuButton {...props} tooltipContent={item.title}>
										<a href={item.route} {...props} class="w-full cursor-pointer">
											{#if item.icon}
												<item.icon class="size-4" />
											{/if}
											<span>{item.title}</span>
										</a>
									</Sidebar.MenuButton>
								{/snippet}
							</Collapsible.Trigger>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{#each item.items ?? [] as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												{#snippet child({ props }: { props: any })}
													<a href={subItem.route} {...props}>
														{#if subItem.icon}
															<subItem.icon class="size-4" />
														{/if}
														<span>{subItem.title}</span>
													</a>
												{/snippet}
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							</Collapsible.Content>
						</Sidebar.MenuItem>
					{/snippet}
				</Collapsible.Root>
			{:else}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent={item.title}>
						{#snippet child({ props })}
							<a href={item.route} class="flex w-full cursor-pointer items-center gap-2" {...props}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/if}
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
