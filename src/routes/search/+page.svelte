<script>
	import { onMount } from 'svelte';
	import { user } from '../../lib/sessionStore';
	import { supabase } from '../../lib/supabaseClient';

	let name = 'chicago';
	let fetchedData = [];
	let breweryName;
	let breweryAddress;
	let breweryWebsite;

	var handleButtonClick = async () => {
		await fetch(`https://api.openbrewerydb.org/breweries?by_city=${name}`).then(
			res => {
				if (res.ok) {
					res.json().then(data => {
						fetchedData = data;
						console.log(fetchedData);
						return fetchedData;
					});
				}
			}
		);
	};

	var reverseList = () => {
		fetchedData = fetchedData.reverse();
		return fetchedData;
	};

	var handleSaveToFavorites = async index => {
		breweryName = fetchedData[index].name;
		breweryAddress =
			fetchedData[index].street +
			' ' +
			fetchedData[index].city +
			' ' +
			fetchedData[index].state +
			' ' +
			fetchedData[index].postal_code.split('-')[0];
		breweryWebsite = fetchedData[index].website_url;

		if (breweryName && breweryAddress && breweryWebsite) {
			try {
				const { error } = await supabase.from('favorites').insert({
					name: breweryName,
					address: breweryAddress,
					website: breweryWebsite,
					user_id: supabase.auth.user().id,
				});
				if (error) {
					throw error;
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	var handleLatLong = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(setCoorinates);
		} else {
			alert('Acces to location denied');
		}
	};

	var setCoorinates = position => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
		fetchClosestBreweries(lat, long);
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
					return fetchedData;
				});
			}
		});
	};

	var handleEnterPress = async e => {
		return e.keyCode === 13 ? handleButtonClick() : null;
	};
	onMount(handleButtonClick);
</script>

<div class="flex justify-center items-center">
	<div class="tabs">
		<button
			class="tab tab-lg tab-lifted focus:tab-active"
			on:click={reverseList}>Reverse</button
		>
		<button
			class="tab tab-lg tab-lifted focus:tab-active"
			on:click={handleLatLong}>Closest Breweries</button
		>
		<button class="tab tab-lg tab-lifted focus:tab-active">Large</button>
	</div>
	<div class="form-control pl-20">
		<div class="input-group">
			<input
				type="text"
				placeholder="Search…"
				class="input input-bordered"
				on:keydown={handleEnterPress}
				bind:value={name}
			/>
			<button class="btn btn-square" on:click={handleButtonClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				>
			</button>
		</div>
	</div>
</div>

{#key reverseList}
	{#each fetchedData as brewery, index (fetchedData.indexOf(brewery))}
		<div class="w-full px-20 pt-5">
			<div class="card w-full bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{brewery.name}</h2>
					<p>
						{brewery.street}
						{brewery.city}, {#if brewery.state != null}
							{brewery.state} {brewery.postal_code.split('-')[0]}
						{/if}
						{brewery.country}
					</p>
					<a href={brewery.website_url} target="_blank">{brewery.website_url}</a
					>
					{#if $user}
						<div class="card-actions justify-end">
							<button
								class="btn btn-primary"
								on:click={handleSaveToFavorites(index)}>Add to Favorites</button
							>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}
{/key}
