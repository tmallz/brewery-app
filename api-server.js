import express from 'express';
import cors from 'cors';
import sequelize from './config/connection.js';
import session from 'express-session';
import path from 'path';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;
const hostname = 'localhost';
app.use(cors());

const sess = {
	secret: 'Super secret secret',
	resave: false,
	saveUninitialized: true,
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () =>
		console.log(`Now listening on port: ${hostname}:${PORT}`)
	);
});
