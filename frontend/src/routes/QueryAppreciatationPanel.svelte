<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { toast } from "svelte-sonner";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import * as Card from "$lib/components/ui/card/index.js";
	import { EllipsisVertical, Pencil } from "@lucide/svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import { Spinner } from "$lib/components/ui/spinner/index.js";
	import { goto } from "$app/navigation";
	import {
		searchQuery,
		searchResults,
		type AppreciateResult,
	} from "$lib/stores/search";

	let loading = $state(false);
</script>

<h2 class="text-xl py-4 font-bold">View appreications</h2>
<div class="flex items-end space-x-4">
	<div class="flex flex-col space-y-1 w-full">
		<Label for="userId">Name</Label>
		<Input bind:value={$searchQuery} name="userId" />
	</div>
	<Button
		class="px-4"
		onclick={async () => {
			const q = $searchQuery.trim();
			if (!q) {
				const all = await fetch("/api/appreciate");
				loading = true;
				searchResults.set(await all.json());
				console.log("all");
			} else {
				const byId = await fetch(
					`/api/appreciate/user/${q}`,
				);
				loading = true;
				console.log("user");
				searchResults.set(await byId.json());
			}

			loading = false;
		}}
	>
		{#if loading === true}
			<Spinner />
		{/if}
		<span>Search</span>
	</Button>
</div>

<div class="py-4 flex flex-col h-full min-h-0">
	<div class="flex-1 min-h-0 overflow-y-auto space-y-4 pr-8">
		{#each $searchResults as appr}
			{@render ApprCard(appr)}
		{/each}
	</div>
</div>

{#snippet ApprCard(appr: AppreciateResult)}
	<Card.Root>
		<Card.Header>
			<Card.Title class="flex justify-between">
				<div>
					<span>To</span>
					{appr.userId}
				</div>
				{@render ApprCardMenu(appr.id)}
			</Card.Title>
		</Card.Header>
		<Card.Content class="line-clamp-3">
			<p>{appr.text}</p>
		</Card.Content>
	</Card.Root>
{/snippet}

{#snippet ApprCardMenu(appr_id: string)}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			><EllipsisVertical
				size={16}
				class="text-black hover:text-primary"
			/></DropdownMenu.Trigger
		>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Actions</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					class="flex justify-between"
					onSelect={async () => {
						await goto(
							`/appreciation/${appr_id}/edit`,
						);
					}}
				>
					Edit
					<Pencil class="text-neutral-400" />
				</DropdownMenu.Item>
				<DropdownMenu.Item
					onSelect={async () => {
						const deleteAppr = await fetch(
							`/api/appreciate/${appr_id}`,
							{
								method: "DELETE",
							},
						);
						if (deleteAppr.ok) {
							searchResults.update(
								(items) =>
									items.filter(
										(
											appr,
										) =>
											appr.id !==
											appr_id,
									),
							);

							toast.success(
								"Delete a appreciation :(",
							);
						}
					}}
					class="text-red-500 focus:text-red-700"
					>Delete</DropdownMenu.Item
				>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}
