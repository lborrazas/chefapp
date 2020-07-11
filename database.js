'use strict'
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_CONNECTION;

module.exports.get = async function(client, database, collection, filters) {
	try {
		let resultado = client.db(database).collection(collection).find().project(
			filters
		).toArray();
		return resultado;
	} catch(err) {
		console.log(err);
	}
}
module.exports.insertOne = async function (client, database, collection, data) {
	await client.db(database).collection(collection).insertOne(data);
}

module.exports.updateOne = async function (client, database, collection, data) {
	try {

		client.db(database).collection(collection).updateOne(
			{ _id: ObjectId(data._id) },
			{
				$set: {
					nombre: data.nombre,
					apellido: data.apellido,
					edad: data.edad
				}
			}
		);
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

module.exports.connect = async function() {
	return MongoClient.connect(url, { useUnifiedTopology:true } );
}