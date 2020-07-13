const express = require('express');
const db = require('../database');
const router = express.Router();


(async function () {

    let database = 'chefsapp';
    let client = await db.connect();

    router.get('/users', async (req, res) => {
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
    });

    router.get('/mateo', async (req, res) => {
        let collection = 'usuarios';
        let filters = {
            email: req.body.email
        }
        let user = await db.getOneByField(client, database, collection, filters);
        res.end();
    })


    router.get('/users/:id', async (req, res) => {
        let collection = 'usuarios';
        try {
            let data = await db.getOne(client, database, collection, req.params.id);
            res.send(data);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.put('/users/:id', async (req, res) => {
        try {
            let collection = 'usuarios';
            await db.updateUser(client, database, collection, req.params.id, req.body);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.delete('/users/:id', async (req, res) => {
        let collection = 'usuarios';
        try {
            await db.delete(client, database, collection, req.params.id);
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });

    router.get('/platos', async (req, res) => {
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
    });

    router.get('/platos/:id', async (req, res) => {
        let collection = 'usuarios';
        let idPlatos = await db.getPlatosDelChef(client, database, collection, req.params.id);
        collection = 'platos';
        let platos = await db.getAllInById(client, database, collection, idPlatos);
        res.send(platos);
        res.end();
    });
    router.get('/platos/mios', async (req, res) => {
        let collection = 'usuarios';
        let idPlatos = await db.getPlatosDelChef(client, database, collection, req.session.user.id);
        collection = 'platos';
        let platos = await db.getAllInById(client, database, collection, idPlatos);
        res.send(platos);
        res.end();
    });

    router.post('/platos', async (req, res) => {
        try {
            let collection = 'platos';
            await db.insertPlato(client, database, collection, req.body, req.query.id);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });

    router.delete('/platos', async (req, res) => {
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


    router.get('/platos/destacados/', async (req, res) => {
        let collection = 'destacados';
        try {
            let array_destacados = await db.get(client, database, collection, null);
            collection = 'platos';
            let data = await db.getAllInById(client, database, collection, array_destacados);
            if (data == null) {
                res.status(400).end();
            }
            res.send(data);
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }

    });

    router.post('/platos/destacados/', async (req, res) => {
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
    });

    router.delete('/platos/destacados/', async (req, res) => {
        let collection = 'destacados';
        try {
            await db.deleteDestacado(client, database, collection, req.query.id);
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });

    router.post('/pedido', async (req, res) => {
        let collection = 'pedidos';
        try {
            await db.insertOne(client, database, collection, req.body);
            collection = 'platos';
            await db.incrementarNumPedido(client, database, collection, req.query.id);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });

})();
module.exports = router;