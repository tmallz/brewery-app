<div class = "flex justify-center items-center">
    <div class="form-control">
        <div class="input-group">
          <input type="text" placeholder="Search…" class="input input-bordered" on:keydown={handleEnterPress} bind:value={name}/>
          <button class="btn btn-square" on:click={handleButtonClick}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
    </div>
</div>

{#each fetchedData as brewery}
<div class="w-full px-20 pt-5">
    <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{brewery.name}</h2>
            <p>{brewery.street} {brewery.city}, {#if brewery.state != null}
                {brewery.state} {brewery.postal_code.split('-')[0]} 
            {/if} {brewery.country}</p>
            <a href={brewery.website_url} target = '_blank'>{brewery.website_url}</a>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Add to Favorites</button>
            </div>
        </div>
    </div>
</div> 
{/each}


<script>
import { onMount } from "svelte";

let name = 'chicago';
let fetchedData = [];

var handleButtonClick = async () => {
    await fetch(`https://api.openbrewerydb.org/breweries?by_city=${name}`)
    .then((res) => { 
        if (res.ok) {
                res.json().then((data) => {
                    fetchedData = data;
                    return fetchedData;
            })
        }
    });
}

var handleEnterPress = async (e) => {
    if(e.keyCode === 13)
    {
        handleButtonClick();
    }
}

var handleSaveToFavorites = async (index) => {

breweryName = fetchedData[index].name;
breweryAddress = fetchedData[index].street + ' ' + fetchedData[index].city + ' ' + fetchedData[index].state + ' ' + fetchedData[index].postal_code.split('-')[0];
breweryWebsite = fetchedData[index].website_url;

if(breweryName && breweryAddress && breweryWebsite) {
    const response = await fetch('/api/favorites/add', {
        method: 'POST',
        body: JSON.stringify({
            name: breweryName,
            address: breweryAddress,
            website: breweryWebsite
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        console.log('saved to favorites');
    }else{
        alert(response.statusText);
    }
}else{
    alert('Something has gone horribly wrong');
}
}

onMount(handleButtonClick)
</script>