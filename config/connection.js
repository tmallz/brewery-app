import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

let sequelize;

console.log(process.env.DB_NAME);

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PW,
		{
			host: 'localhost',
			dialect: 'mysql',
			port: 3306,
		}
	);
}

export default sequelize;
