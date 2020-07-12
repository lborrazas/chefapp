'use strict'
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_CONNECTION;

module.exports.get = async function (client, database, collection, filters) {
	try {
		let resultado = client.db(database).collection(collection).find(filters).project(
		).toArray();
		return resultado;
	} catch (err) {
		console.log(err);
	}
}
module.exports.getAllIn = async function (client, database, collection, array) {
	try {
		let resultado = client.db(database).collection(collection).find().project(
			{
				$in: array
			}
		).toArray();
		return resultado;
	} catch (err) {
		console.log(err);
	}
}
module.exports.getOne = async function (client, database, collection, id) {
	try {
		let resultado = client.db(database).collection(collection).find(
			{
				_id: ObjectId(id)
			}
		).project().toArray();
		return resultado;
	} catch (err) {
		console.log(err);
	}
}
module.exports.insertOne = async function (client, database, collection, data) {
	await client.db(database).collection(collection).insertOne(data);
}

module.exports.updateUser = async function (client, database, collection, id, data) {
	try {
		let newValues = null
		if (data.type === 'chef') {
			newValues = {
				$set: {
					nombre: data.nombre,
					imagen: data.imagen,
					bio: data.bio,
					status: data.status,
					ubicacion: data.ubicacion,
				}
			}
		} else if (data.type === 'cliente') {
			newValues = {
				$set: {
					nombre: data.nombre,
					imagen: data.imagen,
					carrito: data.carrito,
					ubicacion: data.ubicacion,
					reviews: data.reviews,
				}
			}
		} else {
			return false;
		}

		client.db(database).collection(collection).updateOne(
			{ _id: ObjectId(id) },
			newValues
		);
		return true;
	} catch (err) {
		console.log(err);
	}
}

module.exports.delete = async function (client, database, collection, id) {
	client.db(database).collection(collection).deleteOne(
		{
			_id: ObjectId(id)
		}
	);
}

module.exports.connect = async function () {
	return MongoClient.connect(url, { useUnifiedTopology: true });
}