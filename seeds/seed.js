import sequelize from '../config/connection.js';
import Favorites from '../models/Favorites.js';
import User from '../models/User.js';
import userData from './userData.json' assert { type: 'json' };
import breweryData from './breweryData.json' assert { type: 'json' };

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	const user = await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	for (const brewery of breweryData) {
		await Favorites.create({
			...brewery,
			user_id: user[Math.floor(Math.random() * user.length)].id,
		});
	}

	process.exit(0);
};

seedDatabase();
