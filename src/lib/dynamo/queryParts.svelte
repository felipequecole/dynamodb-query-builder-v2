<script>
	import QueryPart from '$lib/dynamo/queryDetails.svelte';
	import { onDestroy } from 'svelte';
	import { pageStore } from '$lib/persistedStore.js';

	export let isValid = false;
	let parts = [];
	let valueValid = {};

	$: canRemoveParts = parts.length > 1;
	$: isValid = Object.values(valueValid).every((part) => part);

	let pageUnsub = pageStore.subscribe((stored) => {
		let newParts = stored.parts;
		Object.keys(valueValid).forEach((partId) => {
			if (!(partId in newParts)) {
				delete valueValid[partId];
			}
		});
		parts = stored.parts;
	});

	onDestroy(() => {
		if (pageUnsub) {
			pageUnsub();
		}
	});

	function handlePartRemoved(event) {
		let partId = event.detail;
		pageStore.removeQueryPart(partId);
		if (partId in valueValid) {
			delete valueValid[partId];
			valueValid = { ...valueValid };
		}
	}

	function handlePartUpdated(event) {
		pageStore.updateQueryPart(
			event.detail.id,
			event.detail.field,
			event.detail.type,
			event.detail.value
		);
	}
</script>

<div class="grid-rows-2 space-y-4">
	<div class="divider">Query Parameters</div>
	{#each parts as queryPart (queryPart.id)}
		<QueryPart
			{...queryPart}
			bind:deletable={canRemoveParts}
			bind:valid={valueValid[queryPart.id]}
			on:part-deleted={handlePartRemoved}
			on:part-updated={handlePartUpdated}
		/>
	{/each}
	<div class="flex justify-center">
		<button class="btn btn-primary" on:click={pageStore.newQueryPart}>Add query part</button>
	</div>
</div>
