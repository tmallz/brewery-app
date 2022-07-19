<script>
	export let ready;
	let name;
	import Map from "$lib/Map.svelte";
  </script>
  
  <svelte:head>
	  <script defer async
		  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlt9YjQT7UuAysEzbVD3k0UAaT3AfNWn0&callback=initMap">
	</script>
  </svelte:head>

	
	<main>
		
		<div class="flex items-center justify-center ">
		  <div class="flex border-2 border-gray-200 rounded">
			  <input type="text" class="px-4 py-2 w-80" placeholder="Search city for brewery" bind:value={name}>
			  <button class="px-4 text-white bg-gray-600 border-l ">
				  Search
			  </button>
		  </div>
		</div>
		{ #if ready }
		<div class="content-center"><Map></Map></div>
		{ /if }
  
	</main>
	
  
  <style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	:global(body) {
	  padding: 0;
  }
  </style>