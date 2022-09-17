<script>
	import { goto } from '$app/navigation';
	import { supabase } from '../../lib/supabaseClient';

	let email;
	let password;
	let confirmPassword;

	function passwordMatch() {
		if (confirmPassword === password) {
			return true;
		}
		return false;
	}

	async function signInWithEmail() {
		if (!passwordMatch()) {
			return;
		}
		try {
			const { user, sesion, error } = await supabase.auth.signUp({
				email: email,
				password: password,
			});
			goto('/search');
		} catch {
			console.error(error);
		}
	}

	var handleEnterPress = async e => {
		if (e.keyCode === 13) {
			signInWithEmail();
		}
	};
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Login now!</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
				excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
				id nisi.
			</p>
		</div>
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
					bind:value={password}
				/>
				<label class="label" for="Password">
					<span class="label-text">Confirm Password</span>
				</label>
				<input
					type="password"
					placeholder="confirm password"
					class="input input-bordered"
					on:keydown={handleEnterPress}
					bind:value={confirmPassword}
				/>
				<label class="label" for="Links">
					<ul>
						<li>
							<a href="/login" class="label-text-alt link link-hover"
								>Have an account already? Log In</a
							>
						</li>
					</ul>
				</label>
			</div>
			<div class="form-control mt-6">
				<button class="btn btn-primary" on:click={signInWithEmail}
					>Sign Up</button
				>
			</div>
		</div>
	</div>
</div>
