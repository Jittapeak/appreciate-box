<script lang="ts">
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import type { PageData } from "./$types";
	import UpdateAppreciationForm from "./UpdateAppreciationForm.svelte";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Edit | Appreciate box</title>
</svelte:head>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>Edit</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
<h1 class="text-xl py-4">
	<span class="font-light text-neutral-400">Appreciation for</span>
	{data.appr.user_id}
</h1>
<div class="px-32 mx-auto">
	<UpdateAppreciationForm bind:apprData={data.appr} form={data.form} />
</div>
