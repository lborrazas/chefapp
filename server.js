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
		let database = 'cheffapp'
		let collection = 'chefs'
		let data = await db.get(client, database, collection, null);
		console.log('hola');
		console.log(req.query.h);
		res.end('hello there')
	})

	// app.route('/api/users').get(async (req, res) => {
	// let database = 'cheffapp'
	// let collection = ''
	// 	let filters = null
	// 	if (req.query.type != null) {
	// 		filters = {
	// 			type: req.query.type
	// 		};
	// 	}
	// 	let data = await db.get(client,database,collection,filters);
	// 	res.send(data);
	// 	res.end();
	// }).post(async (req, res) => {

	// })

	app.listen(httpPort, function () {
		console.log(`Listening on port ${httpPort}!`)
	})
})();
