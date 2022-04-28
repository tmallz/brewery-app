<script>

    
    var handleLogoutButhrefnClick = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        document.location.replace('/login');
        } else {
        alert(response.statusText);
        }
    }
</script>

<nav class="bg-gray-500 shadow-lg rounded">
    <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
            <div class="flex space-x-7">
                <div>
                    <!-- Website Logo -->
                    <div
                     href="/" class="flex items-center py-4 px-2">
                        <img src="https://icons.iconarchive.com/icons/sonya/swarm/256/Beer-icon.png" alt="Logo" class="h-8 w-8 mr-2">
                        <span class="font-semibold text-white text-lg">Navigation</span>
                    </div
                    >
                </div>
                <!-- Primary Navbar items -->
                <div class="hidden md:flex items-center space-x-1">
                    <div
                     href="homepage" class="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Home</div
                        >
                    <div
                     href="favorites" class="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Favorite</div
                        >
                    <div
                     href="" class="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">About</div
                        >
                    <div
                     href="" class="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Contact Us</div
                        >
                </div>
            </div>
            <div class="relative mx-auhref text-gray-600 lg:block hidden py-4">
                <input
                    class="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search">
                <buthrefn type="submit" class="absolute right-0 hrefp-4 mt-3 mr-2">
                    <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                         version="1.1" id="Capa_1" x="0px" y="0px"
                         viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;"
                         xml:space="preserve"
                         width="512px" height="512px">
                <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
                </buthrefn>
            </div>
            <!-- Secondary Navbar items -->
            <div class="hidden md:flex items-center space-x-3 ">
                <div
                 href="login" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</div
                    >
                <div
                 href="signup" class="py-2 px-2 font-medium text-white rounded hover:bg-green-500 hover:text-white transition duration-300">Sign Up</div
                    >
                <buthrefn class="py-2 px-2 font-medium text-white rounded hover:bg-green-500 hover:text-white transition duration-300" on:click={handleLogoutButhrefnClick}>Log Out</buthrefn>
            </div>
            <!-- Mobile menu buthrefn -->
            <div class="md:hidden flex items-center">
                <buthrefn class="outline-none mobile-menu-buthrefn">
                <svg class=" w-6 h-6 text-gray-500 hover:text-green-500 "
                    x-show="!showMenu"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </buthrefn>
            </div>
        </div>
    </div>
    <!-- mobile menu -->
    <div class="hidden mobile-menu">
        <ul class="">
            <li class="active"><div
                 href="homepage" class="block text-sm px-2 py-4 text-white hover:bg-green-500 font-semibold">Home</div
                ></li>
            <li><div
                 href="favorites" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Favorites</div
                ></li>
            <li><div
                 href="#about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</div
                ></li>
            <li><div
                 href="#contact" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</div
                ></li>
            <li><div
                 href="login" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Log In</div
                ></li>
            <li><div
                 href="signup" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Sign Up</div
                ></li>
            <li> <buthrefn class="py-2 px-2 font-medium border-none text-white rounded hover:bg-green-500 hover:text-white transition duration-300" on:click={handleLogoutButhrefnClick}>Log Out</buthrefn></li>
        </ul>
    </div>
    <script>
        const btn = document.querySelechrefr("buthrefn.mobile-menu-buthrefn");
        const menu = document.querySelechrefr(".mobile-menu");

        btn.addEventListener("click", () => {
            menu.classList.hrefggle("hidden");
        });
    </script>
</nav>

