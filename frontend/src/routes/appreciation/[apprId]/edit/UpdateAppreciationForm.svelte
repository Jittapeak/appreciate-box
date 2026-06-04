<script lang="ts">
	import * as Form from "$lib/components/ui/form/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import {
		updateAppreciateFormSchema,
		type UpdateAppreciateFormSchema,
	} from "../../../schema";
	import {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { Button } from "$lib/components/ui/button";
	import type { Appreciate } from "$lib/gqty";
	import { onMount } from "svelte";
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";
	import {
		searchResults,
		type AppreciateResult,
	} from "$lib/stores/search";

	let {
		form: initialForm,
		apprData = $bindable(),
	}: {
		form: SuperValidated<Infer<UpdateAppreciateFormSchema>>;
		apprData: Appreciate;
	} = $props();

	// svelte-ignore state_referenced_locally
	const form = superForm(initialForm, {
		validators: zod4Client(updateAppreciateFormSchema),
		resetForm: false,
		onResult: ({ result }) => {
			if (result.type === "success" && result.data) {
				toast.success("Update successfully!");
				const updated = result.data
					.updatedAppreciation as Appreciate; // assuming server returns updated item
				// console.log(result.data);
				// console.log(updated);
				searchResults.update((items) =>
					items.map((item) =>
						item.id === updated.id
							? ({
									id: updated.id,
									text: updated.text,
									userId: updated.user_id,
								} as AppreciateResult)
							: item,
					),
				);
			} else if (result.type === "failure") {
				toast.error(
					"Failed to update. Please check your input.",
				);
			} else if (result.type === "error") {
				toast.error(
					"An unexpected server error occurred.",
				);
			}
		},
	});

	onMount(() => {
		$formData.text = apprData.text ?? "";
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action={`?apprId=${apprData.id}`}>
	<Form.Field {form} name="text">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Message</Form.Label>
				<Textarea
					{...props}
					bind:value={$formData.text}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description>Edit the message here</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<section class="flex space-x-4 justify-end">
		<Button
			onclick={() => goto("/")}
			variant="ghost"
			class="w-24 py-4">Back</Button
		>
		<Form.Button class="flex-1 py-4 max-w-[50%]">Submit</Form.Button
		>
	</section>
</form>
