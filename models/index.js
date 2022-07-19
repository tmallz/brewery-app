const User = require('../.svelte-kit/types/src/routes/signup/models/User');
const Favorites = require('../.svelte-kit/types/src/routes/signup/models/Favorites');

User.hasMany(Favorites, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Favorites.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Favorites };
