<script>
	import { THEME_TEXT_COLOR } from './../constants.js';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import FaTrashAlt from 'svelte-icons-pack/fa/FaTrashAlt';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	export let id;
	export let field;
	export let type;
	export let value;
	export let deletable = false;
	export let valid = false;

	let fieldValid = false;
	let typeValid = false;
	let valueValid = false;

	$: fieldValid = field !== null && field !== '';
	$: typeValid = type !== null && type !== '';
	$: valueValid = value !== null && value !== '';
	$: valid = fieldValid && typeValid && valueValid;
	const dispatch = createEventDispatcher();

	function deletePart() {
		dispatch('part-deleted', id);
	}

	function updateParts() {
		dispatch('part-updated', { id, field, type, value });
	}

	const types = [
		{
			name: 'String',
			value: 'S'
		},
		{
			name: 'Number',
			value: 'N'
		},
		{
			name: 'Boolean',
			value: 'BOOL'
		},
		{
			name: 'Byte',
			value: 'B'
		},
		{
			name: 'Date (ISO-8601)',
			value: 'S'
		}
	];
</script>

<div transition:fly={{ duration: 250, y: '200%', easing: cubicIn }}>
	<div class="grid grid-flow-col gap-x-2 auto-cols-max content-center">
		<div>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Field Name</span>
					{#if !fieldValid}
						<span class="label-text-alt">cannot be empty</span>
					{/if}
				</div>
				<input
					type="text"
					placeholder=""
					class="input input-bordered w-full"
					required
					class:input-error={!fieldValid}
					bind:value={field}
					on:change={updateParts}
				/>
			</label>
		</div>
		<div>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Type</span>
					{#if !typeValid}
						<span class="label-text-alt">Select type</span>
					{/if}
				</div>
				<select
					class="select select-bordered w-full"
					bind:value={type}
					on:change={updateParts}
					class:select-error={!typeValid}
				>
					<option disabled selected value={null}>Select a type</option>
					{#each types as type}
						<option value={type.value}>{type.name}</option>
					{/each}
				</select>
			</label>
		</div>
		<div>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Value</span>
					{#if !valueValid}
						<span class="label-text-alt">cannot be empty</span>
					{/if}
				</div>
				<input
					type="text"
					placeholder=""
					class="input input-bordered w-full"
					class:input-error={!valueValid}
					bind:value
					on:change={updateParts}
				/>
			</label>
		</div>
		<div class="self-center col-span-1 pt-9">
			<button class="btn btn-outline" on:click={deletePart} disabled={!deletable}
				><Icon src={FaTrashAlt} color={THEME_TEXT_COLOR} /></button
			>
		</div>
	</div>
</div>
