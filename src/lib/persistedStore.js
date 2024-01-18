import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';
import { DARK_THEME } from '$lib/constants';

const pageState = persisted('pageState', {
	tableName: null,
	regionSelected: null,
	parts: [
		{
			id: 1,
			field: null,
			type: null,
			value: null
		}
	]
});

const themeState = persisted('themeState', DARK_THEME);

export const themeStore = {
	subscribe: themeState.subscribe,
	get: () => get(themeState),
	set: (theme) => themeState.set(theme)
};

export const pageStore = {
	subscribe: pageState.subscribe,
	reset: () =>
		pageState.set({
			tableName: null,
			regionSelected: null,
			parts: [
				{
					id: 1,
					field: null,
					type: null,
					value: null
				}
			]
		}),
	get: () => get(pageState),
	addTableName: (tableName) => {
		pageState.update((state) => {
			state.tableName = tableName;
			return state;
		});
	},
	addRegion: (region) => {
		pageState.update((state) => {
			state.regionSelected = region;
			return state;
		});
	},
	updateQueryPart: (id, field, type, value) => {
		pageState.update((state) => {
			const index = state.parts.findIndex((part) => part.id === id);
			const updatedQueryPart = { id, field, type, value };
			const updatedQueryParts = [...state.parts];
			updatedQueryParts[index] = updatedQueryPart;
			state.parts = [...updatedQueryParts];
			return state;
		});
	},
	newQueryPart: () => {
		pageState.update((state) => {
			let lastId = state.parts[state.parts.length - 1].id || 0;
			state.parts = [...state.parts, { id: ++lastId, field: null, type: null, value: null }];
			return state;
		});
	},
	removeQueryPart: (id) => {
		pageState.update((state) => {
			state.parts = state.parts.filter((part) => part.id !== id);
			return state;
		});
	}
};
