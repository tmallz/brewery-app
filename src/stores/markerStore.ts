import { writable } from 'svelte/store';

export const markers = writable<
	[
		{
			lat: number;
			lng: number;
		}
	]
>([{ lat: 41.8781, lng: -87.6298 }]);

export default {
	subscribe: markers.subscribe,
	set: markers.set,
};
