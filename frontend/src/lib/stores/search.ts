import { writable } from 'svelte/store';

export const searchQuery = writable('');
export const searchResults = writable<AppreciateResult[]>([]);

export type AppreciateResult = {
	id: string;
	userId: string;
	text: string;
};

