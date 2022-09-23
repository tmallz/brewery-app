<script>
	import { supabase } from '../../lib/supabaseClient';

	let userEmail;

	var handlePasswordReset = async () => {
		const { data, error } = await supabase.auth.api.resetPasswordForEmail({
			userEmail,
		});
	};
</script>

<h1>password reset here</h1>
<label for="email">Email</label>
<input bind:value={userEmail} class="text-black" />
<button on:click={handlePasswordReset}>reset password</button>
