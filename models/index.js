import Favorites from './Favorites.js';
import User from './User.js';

User.hasMany(Favorites, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Favorites.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

export default { Favorites, User };
