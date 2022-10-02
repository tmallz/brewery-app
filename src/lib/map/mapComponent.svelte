<script>
	import locationStore from '../../stores/locationStore';
	import markerStore from '../../stores/markerStore';
	import infoWindowStore from '../../stores/infoWindowStore';
	import { onMount } from 'svelte';

	let container;
	let map;
	let zoom = 12;
	let center;
	$: center = $locationStore;
	$: markers = $markerStore;
	$: infoWindows = $infoWindowStore;

	onMount(async () => {
		map = new google.maps.Map(container, {
			zoom,
			center,
		});
		const infowindow = new google.maps.InfoWindow({
			content: 'test',
		});
		const marker = new google.maps.Marker({
			position: center,
			map: map,
		});
		marker.addListener('click', () => {
			infowindow.open({
				anchor: marker,
				map,
				shouldFocus: false,
			});
		});
	});

	$: if (center && map) {
		map.setCenter(center);
		console.log('markers:', markers);
		console.log('infowindow: ', infoWindows);
	}
</script>

<div class="flex h-96 w-full text-black" bind:this={container} />
