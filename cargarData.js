const db = require('./database');


(async function () {

    let database = 'chefsapp';
    let client = await db.connect();
    let collection = 'usuarios'
    chef = {
        email: 'chef1@abc.com',
        password: '12345',
        nombre: 'Juan',
        type: 'chef',
        bio: 'Este es el primer chef',
        ubicacion: "Union, Montevideo",
        platos: []
    }
    console.log('hola');
    
    db.insertOne(client, database, collection, chef);
    cliente = {
        email: 'cliente1@abc.com',
        password: '12345',
        nombre: 'Juan',
        type: 'cliente',
        bio: 'Este es el primer cliente',
        ubicacion: "Union, Montevideo",
        carrito: []
    }
    db.insertOne(client, database, collection, cliente);
})()