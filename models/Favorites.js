import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Favorites extends Model {}

Favorites.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.TEXT,
		},
		website: {
			type: DataTypes.TEXT,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'favorites',
	}
);

export default Favorites;
