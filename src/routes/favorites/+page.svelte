<script>
	import { onMount } from 'svelte';
	import { supabase } from '../../lib/supabaseClient';
	let userBreweries = '';

	var loadFavorites = async () => {
		const { data, error } = await supabase.from('favorites').select();
		console.log(data);
		userBreweries = data;
	};

	onMount(loadFavorites);
</script>

{#each userBreweries as brewery}
	<h1>test</h1>
{/each}
