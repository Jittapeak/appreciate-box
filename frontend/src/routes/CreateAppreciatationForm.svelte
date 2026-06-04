<script lang="ts">
	import * as Form from "$lib/components/ui/form/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	// import Tiptap from '$lib/components/Tiptap.svelte'
	import { Input } from "$lib/components/ui/input/index.js";
	import {
		appreciateFormSchema,
		type AppreciateFormSchema,
	} from "./schema";
	import {
		type SuperValidated,
		type Infer,
		superForm,
	} from "sveltekit-superforms";
	import { zod4Client } from "sveltekit-superforms/adapters";
	import { Button } from "$lib/components/ui/button";

	let {
		form: initialForm,
	}: { form: SuperValidated<Infer<AppreciateFormSchema>> } = $props();

	// svelte-ignore state_referenced_locally
	const form = superForm(initialForm, {
		validators: zod4Client(appreciateFormSchema),
	});

	const { form: formData, enhance, reset } = form;
</script>

<form method="POST" use:enhance class="space-y-2">
	<Form.Field {form} name="user_id">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input
					{...props}
					bind:value={$formData.user_id}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description
			>Name of the person you want to send</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>

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
		<Form.Description
			>Tell them your appreicatation!</Form.Description
		>
		<Form.FieldErrors />
	</Form.Field>

	<section class="flex justify-end-safe items-center space-x-4 py-2">
		<Button
			variant="destructive"
			class="flex py-4 px-8 w-fit"
			onclick={() => reset()}>Clear</Button
		>
		<Form.Button class="mx-auto py-4 items-center flex-1"
			>Submit</Form.Button
		>
	</section>
</form>
