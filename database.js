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
		resultado = await client.db(database).collection(collection).find(filters).project().toArray();
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
		resultado = await client.db(database).collection(collection).find(
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
module.exports.getbyIdChef = async function (client, database, collection, idchef) {
	let resultado = null;
	try {
		resultado = await client.db(database).collection(collection).find({"chef":""+idchef}).project().toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getbyIdPlato = async function (client, database, collection, idplato) {
	let resultado = null;
	try {
		resultado = await client.db(database).collection(collection).find({"_id":ObjectId(idplato)}).project().toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getSemanales = async function (client, database, collection) {
	let resultado = null;
	try {
		resultado = await client.db(database).collection(collection).find({"esDeSemanal":true},{"name":1,"photo":1,"paraCeliacos":1,"paraVeganos":1,"paraVegetarianos":1}).project().toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getuserByID = async function (client, database, collection,id) {
	let resultado = null;
	try {
		resultado = await client.db(database).collection(collection).find(
			{"_id":ObjectId(id)},{"user":1}).project().toArray();  // TODO tira error aca
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.isSubscribed = async function (client, database, collection,idchef,iduser) {
	let resultado = null;
	console.log(iduser)
	console.log(idchef)
	try {
		resultado = await client.db(database).collection(collection).find(
			{"iduser":idchef, "idchef":iduser},{id:1}).project().toArray();

	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getAllReviewsByIDperfil = async function (client, database, collection,id) {
	let resultado = null;
	try {
		resultado = client.db(database).collection(collection).find(
			{"idperfil":id}).project().toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getAllReviewsByIDplato = async function (client, database, collection,id) {
	let resultado = null;
	try {
		resultado = client.db(database).collection(collection).find(
			{"idplato":id}).project().toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getOneById = async function (client, database, collection,id) {
	let resultado = null;
	try {
		resultado = client.db(database).collection(collection).find(
			{"_id":ObjectId(id)}).project().toArray();
	} catch (err) {
		console.log(err);
	}
	return resultado;
}
module.exports.getPlatosDelChef = async function (client, database, collection, id) { // uso otro
	let resultado = null;
	let platos = [];
	try {
		resultado = await client.db(database).collection(collection).findOne(
			{
			//	_id: ObjectId(id) TODO
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
module.exports.incrementarPedido = async function (client, database, collection, filteres) {
	let auxfilter=[]
	for(let i=0;i<filteres.length;i++){
		auxfilter.push(
			ObjectId(filteres[i][1])
		)
	}
	console.log(auxfilter)
	await client.db(database).collection(collection).updateMany(
		{ _id:{$in:auxfilter }},
		{ $inc: { reserved: 1} },
	);
}

module.exports.getOne = async function (client, database, collection, id) {
	let resultado = null;
	try {
		resultado = await client.db(database).collection(collection).find(
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
module.exports.insertMany = async function (client, database, collection, data) {
	await client.db(database).collection(collection).insertMany(data);
}


module.exports.insertPlato = async function (client, database, collection, data,mail) {
	await client.db(database).collection(collection).insertOne(data,
		function (err, doc) {
			let id_plato = doc.insertedId;
			client.db(database).collection('usuarios').updateOne(
				{ email:mail},
				{
					$push: {
						platos:id_plato
					}
				}
			);
		});
}
module.exports.insertSubscripcion = async function (client, database, collection, data,id) {
	console.log(id)
	await client.db(database).collection(collection).insertOne(data)
	collection='usuarios'
	await client.db(database).collection(collection).updateMany({_id:ObjectId(id)},{$inc:{subscriptores:1}},)

}
module.exports.delateSubscripcion = async function (client, database, collection, data,id) {

	await client.db(database).collection(collection).remove(data)
	collection='usuarios'
	await client.db(database).collection(collection).update({_id:ObjectId(id)},{$inc:{subscriptores:-1}},)
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
	await client.db(database).collection(collection).updateOne(
		{ _id: ObjectId(id) },
		newValues
	);
}
module.exports.updatePlato = async function (client, database, collection, id, data) {
	await client.db(database).collection(collection).updateOne(
		{ _id:ObjectId(id)},
		{$set:data}

	);
}
module.exports.updateUserSem = async function (client, database, collection, id) {
	await client.db(database).collection(collection).updateOne(
		{ _id:ObjectId(id)},
		{$set:{"subioSemanal":true}}

	);
}


module.exports.delete = async function (client, database, collection, id) {
	await client.db(database).collection(collection).deleteOne(
		{
			_id: ObjectId(id)
		}
	);
}
module.exports.deleteDestacado = async function (client, database, collection, id) {
	await client.db(database).collection(collection).deleteOne(
		{
			id: id
		}
	);
}

module.exports.connect = async function () {
	return MongoClient.connect(url, { useUnifiedTopology: true });
}
