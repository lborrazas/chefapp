'use strict'
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_CONNECTION;
var id;

module.exports.get = async function (client, database, collection, filters) {
	let resultado = null;
	try {
		resultado = client.db(database).collection(collection).find(filters).project().toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getAllInById = async function (client, database, collection, array) {
	let resultado = null;
	try {
		array.forEach(function (element, index, array) {
			array[index] = ObjectId(element);
		});
		resultado = client.db(database).collection(collection).find(
			{
				_id: {
					$in: array
				}
			}
		).project().toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getPlatosDelChef = async function (client, database, collection, id) {
	let resultado = null;
	let platos = [];
	try {
		resultado = client.db(database).collection(collection).find(
			{
				_id: ObjectId(id)
			}
		);
		if (resultado !== null) {
			platos = resultado.platos;
		}

	} catch (err) {
		console.log(err);
	}
	return platos;
}
module.exports.incrementarNumPedido = async function (client, database, collection, id) {
	await client.db(database).collection(collection).updateOne(
		{ _id: ObjectId(id) },
		{ $inc: { reservas: 1 } }
	);
}

module.exports.getOne = async function (client, database, collection, id) {
	let resultado = null;
	try {
		resultado = client.db(database).collection(collection).find(
			{
				_id: ObjectId(id)
			}
		).project(
			{
				password: 0
			}
		).toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}

module.exports.getOneByField = async function (client, database, collection, filters) {
	let resultado = null;
	try {
		resultado = await client.db(database).collection(collection).find(
			filters
		).toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.insertOne = async function (client, database, collection, data) {
	await client.db(database).collection(collection).insertOne(data);
}

module.exports.insertPlato = async function (client, database, collection, data, id_chef) {
	await client.db(database).collection(collection).insertOne(data,
		function (err, doc) {
			let id_plato = doc.insertedId;
			client.db(database).collection('usuarios').updateOne(
				{ _id: ObjectId(id_chef) },
				{
					$push: {
						platos:id_plato
					}
				}
			);
		});
}

module.exports.updateUser = async function (client, database, collection, id, data) {

	let newValues = null;
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
	}
	client.db(database).collection(collection).updateOne(
		{ _id: ObjectId(id) },
		newValues
	);
}
module.exports.updatePlato = async function (client, database, collection, id, data) {
	client.db(database).collection(collection).updateOne(
		{ _id: ObjectId(id) },
		data
	);
}


module.exports.delete = async function (client, database, collection, id) {
	client.db(database).collection(collection).deleteOne(
		{
			_id: ObjectId(id)
		}
	);
}
module.exports.deleteDestacado = async function (client, database, collection, id) {
	client.db(database).collection(collection).deleteOne(
		{
			id: id
		}
	);
}

module.exports.connect = async function () {
	return MongoClient.connect(url, { useUnifiedTopology: true });
}
