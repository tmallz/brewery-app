<script>
	import { onMount } from 'svelte';
	import MapComponent from '$lib/map/mapComponent.svelte';
	import locationStore from '../../stores/locationStore';
	import markerStore from '../../stores/markerStore';
	import infoWindowStore from '../../stores/infoWindowStore';
	$: markers = $markerStore;
	$: infoWindows = $infoWindowStore;
	let error;
	let ready;
	let myScript;
	let name;
	let fetchedData = [];
	let cityLat;
	let cityLng;

	onMount(() => {
		setMap();
	});

	function setMap() {
		if (typeof window.google === 'undefined') {
			myScript = document.createElement('script');
			myScript.setAttribute(
				'src',
				'https://maps.googleapis.com/maps/api/js?key=&callback=initMap'
			);
			document.body.appendChild(myScript);
		} else {
			ready = true;
		}
		window.initMap = () => {
			ready = true;
		};
	}

	function success(position) {
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		locationStore.set({ lat, lng });
	}

	function errorFn() {
		error = 'Unable to retrieve your location';
	}

	var handleLatLong = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(setCoorinates);
		} else {
			alert('Acces to location denied');
		}
	};

	var setCoorinates = position => {
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		locationStore.set({ lat, lng });
		fetchClosestBreweries(lat, lng);
	};

	var fetchClosestBreweries = async (latitude, longitude) => {
		let lat = latitude;
		let long = longitude;
		await fetch(
			`https://api.openbrewerydb.org/breweries?by_dist=${lat},${long}`
		).then(res => {
			if (res.ok) {
				res.json().then(data => {
					fetchedData = data;
					console.log(fetchedData);
					return fetchedData;
				});
			}
		});
		setMap();
	};

	var handleButtonClick = async () => {
		await fetch(`https://api.openbrewerydb.org/breweries?by_city=${name}`).then(
			res => {
				if (res.ok) {
					res.json().then(data => {
						fetchedData = data;
						markerStore.set([{ lat: 1, lng: 1 }]);
						infoWindowStore.set([{ name: '', address: '', website: '' }]);
						for (let i = 0; i < data.length; i++) {
							let lat = data[i].latitude;
							let lng = data[i].longitude;
							$markerStore = [
								...$markerStore,
								{
									lat,
									lng,
								},
							];
							let name = data[i].name;
							let address =
								data[i].street +
								' ' +
								data[i].city +
								' ' +
								data[i].state +
								' ' +
								data[i].postal_code.split('-')[0];
							let website = data.website_url;
							$infoWindowStore = [
								...$infoWindowStore,
								{
									name,
									address,
									website,
								},
							];
						}
						return fetchedData;
					});
				}
			}
		);
	};

	var getLatLongFromCityName = async () => {
		try {
			await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${name}`, {
				method: 'GET',
				headers: { 'X-Api-Key': '' },
			}).then(res => {
				if (res.ok) {
					res.json().then(data => {
						console.log(data);
						cityLat = data[0].latitude;
						cityLng = data[0].longitude;
						const lat = cityLat;
						const lng = cityLng;
						fetchClosestBreweries(cityLat, cityLng);
						locationStore.set({ lat, lng });
					});
				}
			});
		} catch (error) {
			throw error;
		}
	};
</script>

<div class="flex align-middle items-center w-full flex-col">
	<div
		class="p-4 m-2  border border-gray-200 dark:border-gray-500 rounded shadow bg-white dark:bg-gray-600 flex-1 w-full flex align-middle items-center justify-between"
	>
		<h2
			class="font-bold text-center align-middle text-gray-800 dark:text-gray-200 m-1"
		>
			Google Map
		</h2>
		{#if error}<p class="text-xs text-red-500">{error}</p>{/if}
		<button
			on:click={() => {
				if (!navigator.geolocation) {
					error = 'Geolocation is not supported by your browser';
				} else {
					error = null;
					navigator.geolocation.getCurrentPosition(success, errorFn);
				}
			}}
			class="m-2 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-5 py-3 bg-purple-500 dark:bg-purple-400 text-base font-medium text-white hover:bg-purple-700  dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm capitalize"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
	<button on:click={handleLatLong}>test</button>
	<input type="text" class="text-black" bind:value={name} />
	<button on:click={getLatLongFromCityName}>test2</button>
	<button on:click={handleButtonClick}>test3</button>
	<div class="w-full h-full px-20 py-10">
		{#if ready}
			<MapComponent />
		{/if}
	</div>
</div>
