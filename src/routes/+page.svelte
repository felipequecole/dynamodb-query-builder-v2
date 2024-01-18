<script>
	import { fly, fade } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import QueryParts from '../lib/dynamo/queryParts.svelte';
	import TableInfo from '$lib/dynamo/tableInfo.svelte';
	import { onDestroy } from 'svelte';
	import { pageStore } from '$lib/persistedStore.js';
	import buildQuery from '$lib/dynamo/buildQuery.js';

	let tableName = null;
	let regionSelected = null;
	let parts = [];
	let infoValid = false;
	let partsValid = false;
	let formReady = false;
	let result = null;
	let showToast = false;

	$: pageStore.addTableName(tableName);
	$: pageStore.addRegion(regionSelected);
	$: formReady = infoValid && partsValid;

	let pageUnsub = pageStore.subscribe((stored) => {
		tableName = stored.tableName;
		regionSelected = stored.regionSelected;
		parts = stored.parts;
		result = null;
	});

	onDestroy(() => {
		if (pageUnsub) {
			pageUnsub();
		}
	});

	function runBuildQuery() {
		result = buildQuery(tableName, regionSelected, parts);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(result);
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 2000);
	}
</script>

<div class="grid-cols-1 container-sm xs:container xs:mx-auto">
	<TableInfo bind:tableName bind:regionSelected bind:partValid={infoValid} />
	<QueryParts bind:isValid={partsValid}></QueryParts>
	<div class="divider">Actions</div>
	<div class="flex flex-row space-x-3 justify-center">
		<button class="btn btn-primary" on:click={runBuildQuery} disabled={!formReady}
			>Build Query</button
		>
		<button class="btn btn-error" on:click={pageStore.reset}>Reset Query</button>
	</div>
	{#if result}
		<div transition:fade={{ easing: cubicIn, duration: 200 }}>
			<div class="divider">Result</div>
			<div class="select-all">
				<textarea
					readonly
					rows="5"
					on:focus={(event) => event.target.select()}
					class="textarea textarea-bordered w-full select-all">{result}</textarea
				>
			</div>
			<div class="text-center pt-4">
				<button class="btn btn-primary" on:click={copyToClipboard}>Copy to clipboard</button>
			</div>
		</div>
	{/if}
</div>

{#if showToast}
	<div
		transition:fly={{ duration: 400, x: '-200%', easing: cubicIn }}
		class="toast toast-bottom toast-start pb-20"
	>
		<div class="alert alert-success">
			<span>Copied to clipboard!</span>
		</div>
	</div>
{/if}
