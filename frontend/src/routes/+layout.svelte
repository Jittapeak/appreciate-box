<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import "../app.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<div class="px-8 py-4 h-screen">
	{@render children()}
</div>
