<script>
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import { goto } from '$app/navigation';

	let value, formattedValue;
	let isModalOpen = false;

	const options = {
		onChange(selectedDates, dateStr) {
			console.log('flatpickr hook', selectedDates, dateStr);
		},
	};

	function handleChange(event) {
		const [selectedDates, dateStr] = event.detail;
		console.log({ selectedDates, dateStr });
	}

	var handleEnterButton = () => {
		var age = calculateAge(value);
		if (age >= 21) {
			goto('/search');
		} else if (age === null) {
			window.alert('must select a date');
		} else {
			isModalOpen = true;
		}
	};

	function calculateAge(birthday) {
		// birthday is a date
		console.log(birthday);
		if (birthday === null || birthday === '') {
			return null;
		} else {
			var ageDifMs = Date.now() - birthday.getTime();
			var ageDate = new Date(ageDifMs); // miliseconds from epoch
			return Math.abs(ageDate.getUTCFullYear() - 1970);
		}
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row">
		<img
			src="https://placeimg.com/260/400/arch"
			alt="pic"
			class="max-w-sm rounded-lg shadow-2xl"
		/>
		<div>
			<h1 class="text-5xl font-bold">Box Office News!</h1>
			<p class="py-6">
				Welcome to Brewery-Me. An app that allows you to find breweries near you
				and wherever you want.
			</p>
			<Flatpickr
				{options}
				bind:value
				bind:formattedValue
				on:change={handleChange}
				name="date"
				class="text-black"
			/>
			<p>Please enter your Date of Birth</p>
			<button class="btn btn-primary" on:click={handleEnterButton}>Enter</button
			>
		</div>
	</div>
</div>

<input
	type="checkbox"
	id="my-modal"
	class="modal-toggle"
	bind:checked={isModalOpen}
/>
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">
			Sorry you must be 21 or older to use BrewerMe
		</h3>
		<div class="modal-action">
			<label for="my-modal" class="btn">Close</label>
		</div>
	</div>
</div>
