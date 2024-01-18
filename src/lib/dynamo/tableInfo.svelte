<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { TABLE_REGIONS_API } from '$lib/constants.js';

	export let tableName = null;
	export let regionSelected = null;
	export let partValid = false;

	let nameValid = true;

	$: nameValid = tableName !== null && tableName !== '';
	$: partValid = nameValid;

	let regionsAvailable = false;
	let regions = [];
	$: regionsAvailable = regions.length > 0;

	onMount(() => {
		axios
			.get(TABLE_REGIONS_API)
			.then((response) => {
				if (response.status === 200) {
					regions = response.data.services.dynamodb.regions;
					regions.sort();
				} else {
					throw new Error('Error fetching regions');
				}
			})
			.catch((err) => {
				// FIXME: handle error
				console.log(err);
			});
	});
</script>

<div>
	<div class="divider">Table Details</div>
	<form>
		<div class="grid grid-cols-2 gap-8">
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Table Name</span>
					{#if !nameValid}
						<span class="label-text-alt">cannot be empty</span>
					{/if}
				</div>
				<input
					required
					type="text"
					placeholder="Insert your table name"
					class="input input-bordered w-full"
					class:input-error={!nameValid}
					bind:value={tableName}
				/>
				<div class="label"></div>
			</label>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Region</span>
				</div>
				<select
					class="select select-bordered w-full"
					disabled={!regionsAvailable}
					bind:value={regionSelected}
				>
					<option disabled selected value={null}>Select a region</option>
					<option value="">None</option>
					{#each regions as region}
						<option value={region}>{region}</option>
					{/each}
				</select>
			</label>
		</div>
	</form>
</div>
