import { writable } from 'svelte/store';

const location = writable<{
	lat: number;
	lng: number;
}>({ lat: 41.8781, lng: -87.6298 });

export default {
	subscribe: location.subscribe,
	set: location.set,
};
