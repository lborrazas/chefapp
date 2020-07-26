const express = require('express');
const db = require('../mongoose');
const router = express.Router();

router.use(function timeLog(req, res, next) {
    if (req.session.user == undefined) {
        res.status(400)
        res.end('CUAL HACE')
    }
    next();
});



(async function () {

    router.get('/users', async (req, res) => {
        let data = await db.getUsers(req.query.type);
        if (data === null) {
            res.status(400).end();
        }
        res.send(data);
        res.end();
    });
    router.get('/users/:id', async (req, res) => {
        try {
            let data = await db.getUser(req.params.id, null);
            res.send(data);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.put('/users/:id', async (req, res) => {
        try {
            await db.updateUser(req.params.id, req.body);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.delete('/users/:id', async (req, res) => {
        try {
            await db.deleteUser(req.params.id);
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });

    router.get('/platos/2', async (req, res) => {
        let arrCat = [];
        let categorias = await db.getCategorias();
        for(cat of categorias) {
            let obj = {
                name: cat.name,
                dishes: await db.getPlatosByCategory({categorias: cat.name})
            }
            arrCat.push(obj);
        }
        let others = {
            name: 'Para Vegetarianos',
            dishes: await db.getPlatosByCategory({paraVegetarianos: true})
        }
        arrCat.push(others);
        others = {
            name: 'Para Veganos',
            dishes: await db.getPlatosByCategory({paraVeganos: true})
        }
        arrCat.push(others);
        
        others = {
            name: 'Para Celiacos',
            dishes: await db.getPlatosByCategory({paraCeliacos: true})
        }
        arrCat.push(others);
        //console.log(arrCat);
        
        res.send(arrCat);
        res.end();
    });

    router.get('/platos/chef/:id', async (req, res) => {

        let platos = await db.getPlatos(req.params.id, null);
        res.send(platos);
        res.end();
    });
    // router.get('/platos/mios/:id', async (req, res) => { //TODO nunca la uso
    //     let collection = 'usuarios';
    //     let idPlatos = await db.getPlatosDelChef(client, database, collection, req.session.user.id);
    //     collection = 'platos';
    //     let platos = await db.getAllInById(client, database, collection, idPlatos);
    //     res.send(platos);
    //     res.end();
    // });
    // router.get('/platosporidchef/:id', async (req, res) => {
    //     let collection = 'platos';
    //     let platos = await db.getbyIdChef(client, database, collection, req.params.id);
    //     res.send(platos);
    //     res.end();
    // });
    router.get('/platos/:id', async (req, res) => {
        let collection = 'platos';

        let platos = await db.getPlato(req.params.id);
        res.send(platos);
        res.end();
    });
    router.get('/platos/semanal', async (req, res) => {
        let platos = await db.getSemanales(client, database, collection);

        res.send(platos);
        res.end();
    });
    router.post('/platos/semanal/:id', async (req, res) => {
        try {
            let updateInfo = {
                "esDeSemana": true,
                "cantidad": req.body.cantidad
            }
            await db.updatePlato(req.body.id, updateInfo)
            // await db.updateUserSem(client, database, collection, req.params.id)
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.post('/review/chef/:id', async (req, res) => {
        try {
            await db.insertReviewChef(req.params.id, req.body)
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.post('/review/plato/:id', async (req, res) => {
        try {
            await db.insertReviewPlato(req.params.id, req.body)
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.get('/usuarios/name/:id', async (req, res) => {
        try {
            let collection = 'usuarios';
            let nombre = await db.getuserByID(client, database, collection, req.params.id);
            res.send(nombre)
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(420).end();
        }
    })
    router.get('/issubscibed/:idchef/:iduser', async (req, res) => {
        let varbool = false;
        try {
            let collection = 'subscipciones';
            let retorno = await db.isSubscribed(client, database, collection, req.params.idchef, req.params.iduser);
            console.log()
            if (!retorno[0]) {
                varbool = false;
            } else {
                varbool = true;
            }
            console.log(varbool)
            res.send(varbool)
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(420).end();
        }
    })
    router.get('/profile/:id', async (req, res) => {
        try {
            let collection = 'usuarios';
            let nombre = await db.getuserByID(client, database, collection, req.params.id);
            res.send(nombre)
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(420).end();
        }
    })
    router.get('/profile/review/:id', async (req, res) => {
        try {
            let collection = 'chef-review';
            let nombre = await db.getAllReviewsByIDperfil(client, database, collection, req.params.id);
            res.send(nombre)
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(420).end();
        }
    })
    router.get('/plato/review/:id', async (req, res) => {
        try {
            let collection = 'platos-review';
            let nombre = await db.getAllReviewsByIDplato(client, database, collection, req.params.id);
            res.send(nombre)
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(420).end();
        }
    })


    router.post('/platos', async (req, res) => {
        try {
            let collection = 'platos';
            await db.insertPlato(client, database, collection, req.body, req.session.key);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.post('/subscribe/:id', async (req, res) => {
        try {
            let collection = 'subscipciones';
            await db.insertSubscripcion(client, database, collection, req.body, req.params.id);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });

    router.post('/unsubscribe/:id', async (req, res) => {
        try {
            console.log(req)
            let collection = 'subscipciones';
            await db.delateSubscripcion(client, database, collection, req.body, req.params.id);
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

    router.post('/pedido/:id', async (req, res) => {
        try {
            let collection = 'platos';
            let arrayaux = []
            let arrayauxid = []
            for (let i = 0; i < req.body.length; i++) {
                arrayaux.push({
                    "platoName": req.body[i][0],
                    "idplato": req.body[i][1],
                    "precio": req.body[i][2],
                    "iduser": req.params.id
                })
            }

            await db.incrementarPedido(client, database, collection, req.body);
            collection = 'pedidos';

            await db.insertMany(client, database, collection, arrayaux);
            res.status(200).end();

        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });

})();
module.exports = router;