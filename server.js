'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./database');

const app = express();

(async function () {

	dotenv.config();

	let httpPort = process.env.APP_PORT;
	let database = 'chefsapp';

	app.use(express.static(path.join(__dirname, 'www')))
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, 'www/index.html'))
	})

	let client = await db.connect();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use((req, res, next) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
		next();
	});

	app.get('/hola', async (req, res) => {
		let database = 'cheffapp';
		let collection = 'chefs';
		let data = await db.get(client, database, collection, null);
		console.log('hola');
		console.log(req.query.h);
		res.send(data);
		res.end('hello there');
	})

	app.route('/api/users').get(async (req, res) => {
		let collection = 'usuarios';
		let filters = null;
		if (req.query.type != null) {
			filters = {
				type: req.query.type
			};
		}
		let data = await db.get(client, database, collection, filters);
		res.send(data);
		res.end();
	}).post(async (req, res) => {
		let collection = 'usuarios';
		try {
			await db.insertOne(client, database, collection, req.body);
			res.status(200).end();
		} catch (err) {
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
			res.status(400).end();
		}
	}).put(async (req, res) => {
		let collection = 'usuarios';
		let result = await db.updateUser(client, database, collection, req.params.id, req.body);

		if (result) {
			res.status(200).end();
		}
		res.status(400).end();

	}).delete(async (req, res) => {
		let collection = 'usuarios';
		await db.delete(client, database, collection, req.params.id);
		res.end();
	});

	app.route('/platos').get(async (req, res) => {
		let collection = 'platos';
		let resultado = await db.get(client,database,collection,null);
		res.send(resultado);
		res.end();
	}).post(async (req, res) => {
		let collection = 'platos';
		await db.insertOne(client,database,collection,req.body);
		res.status(200).end();
	}).delete(async (req, res) => {
		let collection = 'platos';
		await db.delete(client, database, collection, req.params.id);
		res.end();
	});


	app.route('/api/platos/destacados/').get(async (req, res) => {
		let collection = 'destacados';
		let array_destacados = await db.get(client, database, collection, null);
		collection = '';
		let data = await db.getAllIn(client, database, collection, array_destacados);
	})

	app.listen(httpPort, function () {
		console.log(`Listening on port ${httpPort}!`)
	})
})();
