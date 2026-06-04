<script lang="ts">
	import type { PageData } from "./$types";
	import CreateAppreciatationForm from "./CreateAppreciatationForm.svelte";
	import QueryAppreciatationPanel from "./QueryAppreciatationPanel.svelte";
	let { data }: { data: PageData } = $props();
</script>

<div class="flex space-x-4 max-h-screen">
	<section class="max-w-1/2 w-full p-4">
		<h2 class="text-xl py-4 font-bold">Add your apprecication!</h2>
		<CreateAppreciatationForm form={data.form} />
	</section>

	<section class="flex flex-col w-full p-4">
		<QueryAppreciatationPanel />
	</section>
</div>
