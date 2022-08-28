<div class="hero min-h-screen bg-base-200">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label" for = "Email">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="email" class="input input-bordered" bind:value={loginEmail}/>
          </div>
          <div class="form-control">
            <label class="label" for = 'Password'>
              <span class="label-text">Password</span>
            </label>
            <input type="text" placeholder="password" class="input input-bordered" bind:value={loginPassword}/>
            <label class="label" for = "Links">
              <ul>
                <li><a href="#" class="label-text-alt link link-hover">Forgot password?</a></li>
                <li><a href="/sign-up" class="label-text-alt link link-hover">New Here? Sign Up</a></li>
              </ul>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" on:click={loginFormHandler}>Login</button>
          </div>
        </div>
      </div>
</div>

<script>
  let loginEmail;
  let loginPassword;

  const loginFormHandler = async () => {
      const email = loginEmail;
      const password = loginPassword;

      if(email && password) {
          const response = await fetch('api/user', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email,
                  password
              })
          });


          if(response.ok) {
              document.location.replace('/');
          } else {
              alert(response.statusText);
          }
      } else {
          alert('Please enter a valid email and password');
      }

  }
</script>