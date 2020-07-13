'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
const db = require('./database');

const app = express();

(async function () {

	dotenv.config();

	let httpPort = process.env.APP_PORT;
	let database = 'chefsapp';

	// redisClient.on('error', (err) => {
	// 	console.log('Redis error: ', err);
	// });

	app.use(express.static(path.join(__dirname, 'www')))
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, 'www/index.html'))
	});

	// app.use(session({
	// 	secret: 'ThisIsHowYouUseRedisSessionStorage',
	// 	name: '_redisPractice',
	// 	resave: false,
	// 	saveUninitialized: true,
	// 	cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
	// 	store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
	// }));

	let client = await db.connect();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use((req, res, next) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
		next();
	});

	// app.post('/login', bodyParser.json(), function (req, res) {
	// 	// when user login set the key to redis.
	// 	console.log(req.body.email)
	// 	req.session.key = req.body.email;
	// 	res.end('done');
	// });

	// app.get('/logout', function (req, res) {
	// 	req.session.destroy(function (err) {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			res.redirect('/');
	// 		}
	// 	});
	// });


	app.route('/api/users').get(async (req, res) => {
		let collection = 'usuarios';
		let filters = null;
		if (req.query.type != null) {
			filters = {
				type: req.query.type
			};
		}
		let data = await db.get(client, database, collection, filters);
		if (data === null) {
			res.status(400).end();
		}
		res.send(data);
		res.end();
	}).post(async (req, res) => {
		let collection = 'usuarios';
		try {
			await db.insertOne(client, database, collection, req.body);
			res.status(200).end();
		} catch (err) {
			console.log(err);
			res.status(400).end();
		}
	})

	app.route('/users/:id').get(async (req, res) => {
		let collection = 'usuarios';
		try {
			let data = await db.getOne(client, database, collection, req.params.id);
			res.send(data);
			res.status(200).end();
		} catch (err) {
			console.log(err);
			res.status(400).end();
		}
	}).put(async (req, res) => {
		let collection = 'usuarios';
		await db.updateUser(client, database, collection, req.params.id, req.body);

		if (result) {
			res.status(200).end();
		}
		res.status(400).end();

	}).delete(async (req, res) => {
		let collection = 'usuarios';
		try {
			await db.delete(client, database, collection, req.params.id);
			res.end();
		} catch (err) {
			console.log(err);
			res.status(400).end();
		}
	});

	app.route('/platos').get(async (req, res) => {
		let queryParams = req.query;

		let collection = 'platos';
		let filters = {};

		if (queryParams.paraCeliacos) {
			filters.paraCeliacos = queryParams.paraCeliacos;
		}
		if (queryParams.paraVeganos) {
			filters.paraVeganos = queryParams.paraVeganos;
		}
		if (queryParams.paraVegetarianos) {
			filters.paraVegetarianos = queryParams.paraVegetarianos;
		}

		filters.isDeleted = false;
		filters.esDeSemana = true;

		let resultado = await db.get(client, database, collection, filters);
		res.send(resultado);
		res.end();
	}).post(async (req, res) => {
		let collection = 'platos';
		await db.insertOne(client, database, collection, req.body);
		res.status(200).end();
	}).delete(async (req, res) => {
		let collection = 'platos';
		let updateInfo = {
			isDeleted: true
		};
		try {
			await db.updatePlato(client, database, collection, req.query.id, updateInfo);
			res.end();
		} catch (err) {
			console.log(err);
			res.status(400).end();
		}
	});


	app.route('/api/platos/destacados/').get(async (req, res) => {
		let collection = 'destacados';
		try {
			let array_destacados = await db.get(client, database, collection, null);
			collection = 'platos';
			let data = await db.getAllDestacados(client, database, collection, array_destacados);
			if (data == null) {
				res.status(400).end();
			}
			res.send(data);
			res.end();
		} catch (err) {
			console.log(err);
			res.status(400).end();
		}

	}).post(async (req, res) => {
		try {
			let id = {
				id: req.body.id
			};
			let collection = 'destacados';
			await db.insertOne(client, database, collection, id)
			res.end();
		} catch (err) {
			console.log(err);
			res.status(400).end();
		}
	}).delete(async (req, res) => {
		try {
			await db.deleteDestacado(client, database, collection, req.query.id);
			res.end();
		} catch (err) {
			console.log(err);
			res.status(400).end();
		}
	});

	app.listen(httpPort, function () {
		console.log(`Listening on port ${httpPort}!`);
	})
})();

// Start a session; we use Redis for the session store.
// "secret" will be used to create the session ID hash (the cookie id and the redis key value)
// "name" will show up as your cookie name in the browser
// "cookie" is provided by default; you can add it to add additional personalized options
// The "store" ttl is the expiration time for each Redis session ID, in seconds