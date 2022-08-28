import { error } from '@sveltejs/kit';
import User from '../../../../models/User.js';

export async function POST({ request, setHeaders, url }) {
	console.log('hit route');
	const values = await request.formData();

	const username = values.get('username');
	const password = values.get('password');

	const user = await User.findUser(username);

	if (!user) {
		return {
			status: 403,
			errors: {
				username: 'No user with this username',
			},
		};
	}

	if (user.password !== hash(password)) {
		return {
			status: 403,
			errors: {
				password: 'Incorrect password',
			},
		};
	}

	setHeaders({
		'set-cookie': createSessionCookie(user.id),
	});

	return {
		location: url.searchParams.get('redirectTo') ?? '/',
	};
}
