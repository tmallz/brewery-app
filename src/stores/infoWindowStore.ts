import { writable } from 'svelte/store';

const infoWindows = writable<
	[
		{
			name: string;
			address: string;
			website: string;
		}
	]
>([
	{
		name: '',
		address: '',
		website: '',
	},
]);

export default {
	subscribe: infoWindows.subscribe,
	set: infoWindows.set,
};
