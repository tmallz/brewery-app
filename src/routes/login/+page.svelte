<script>
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';

	var handleLogin = async () => {
		try {
			const { user, error } = await supabase.auth.signIn({
				email: email,
				password: password,
			});
			if (error) {
				throw error;
			}
			goto('/search');
		} catch (error) {
			console.error(error);
		}
	};

	var handleEnterPress = async e => {
		return e.keyCode === 13 ? handleButtonClick() : null;
	};
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<div class="card-body">
			<div class="form-control">
				<label class="label" for="Email">
					<span class="label-text">Email</span>
				</label>
				<input
					type="text"
					placeholder="email"
					class="input input-bordered"
					bind:value={email}
				/>
			</div>
			<div class="form-control">
				<label class="label" for="Password">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					placeholder="password"
					class="input input-bordered"
					on:keydown={handleEnterPress}
					bind:value={password}
				/>
				<label class="label" for="Links">
					<ul>
						<li>
							<a href="/password-reset" class="label-text-alt link link-hover"
								>Forgot password?</a
							>
						</li>
						<li>
							<a href="/sign-up" class="label-text-alt link link-hover"
								>New Here? Sign Up</a
							>
						</li>
					</ul>
				</label>
			</div>
			<div class="form-control mt-6">
				<button class="btn btn-primary" on:click={handleLogin}>Login</button>
			</div>
		</div>
	</div>
</div>
