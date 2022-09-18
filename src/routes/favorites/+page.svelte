<script>
	import { onMount } from 'svelte';
	import { supabase } from '../../lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { user } from '../../lib/sessionStore';

	let userBreweries = '';

	var loadFavorites = async () => {
		console.log('user: ', user);
		try {
			const { data, error } = await supabase
				.from('favorites')
				.select()
				.eq(('user_id', user));
			console.log(data);
			userBreweries = data;
		} catch (error) {
			console.error(error);
		}
	};

	onMount(loadFavorites);
</script>

{#if !$user}
	<h1>You must be logged in to view favorites page</h1>
{:else}
	{#each userBreweries as brewery}
		<h1>{brewery.name}</h1>
	{/each}
{/if}
