import router from 'express';
import User from '../../../models/index.js';

router.Router();

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			return res.status(404).json({ message: 'Invalid Credentials' });
		}

		await req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: 'You are now logged in' });
		});
	} catch (err) {
		res.status(400).json(err);
	}

	console.log(req.session);
	console.log(req.session.logged_in, req.session.user_id);
});
