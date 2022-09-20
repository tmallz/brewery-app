<script>
	import { onMount } from 'svelte';
	import { supabase } from '../../lib/supabaseClient';
	import { user } from '../../lib/sessionStore';

	let userBreweries = '';

	var loadFavorites = async () => {
		console.log('user: ', supabase.auth.user().id);
		try {
			const { data, error } = await supabase
				.from('favorites')
				.select()
				.eq('user_id', supabase.auth.user().id);
			if (error) {
				throw error;
			}
			userBreweries = data;
		} catch (error) {
			console.error(error);
		}
	};

	onMount(loadFavorites);
</script>

{#if !$user}
	<h1>You must be logged in to view favorites page</h1>
{:else if userBreweries == null}
	<h1>No favorites! Go to the <a href="/search">search</a> tab to add some.</h1>
{:else}
	{#each userBreweries as brewery}
		<div class="w-full px-20 pt-5">
			<div class="card w-full bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{brewery.name}</h2>
					<p>
						{brewery.address}
					</p>
					<p>
						<a class="underline" href={brewery.website} target="_blank"
							>{brewery.website}</a
						>
					</p>
				</div>
			</div>
		</div>
	{/each}
{/if}
