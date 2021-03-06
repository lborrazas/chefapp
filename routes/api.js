const express = require('express');
const db = require('../mongoose');
const router = express.Router();

router.use(function timeLog(req, res, next) {
    if (req.session.user == undefined) {
        res.status(400);
        res.end('CUAL HACE');
    }
    next();
});



(async function () {

    router.get('/users', async (req, res) => {
        try {
            let data = await db.getUsers(req.query.type);
            if (data === null) {
                res.status(400).end();
            }
            res.send({ data: data });
            res.end();

        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });
    router.put('/resena/chef/:idchef', async (req, res) => { /// -------------------------------- aca estuvo junaito
        try {
            let review = {
                userId: req.session.user._id,
                resena: req.body.rese,
                nombre: req.session.user.user,
            }
            await db.insertReviewChef(req.params.idchef, review)
            res.send(review)
            res.status(200).end();
        } catch (e) {

            res.status(400).end();
        }
    });
    router.put('/resena/plato/:idplato', async (req, res) => { /// -------------------------------- aca estuvo junaito
        try {
            let review = {
                userId: req.session.user._id,
                resena: req.body.rese,
                nombre: req.session.user.user,
            }
            await db.insertReviewPlato(req.params.idplato, review)
            res.send(review)
            res.status(200).end();
        } catch (e) {

            res.status(400).end();
        }
    });
    router.get('/user/semanalesbool', async (req, res) => { // --------------- juan estuvo aca tambien
        try {
            let varbool = false

            let user = await db.getUserWithPlatos(req.session.user._id);


            if (user.platos.length > 0) {
                varbool = true
            }
            res.send({ data: varbool })
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    })

    router.get('/users/:id', async (req, res) => { //para el prfile de otro
        try {
            let data = await db.getUserWithPlatos(req.params.id);
            res.send({ data: data });
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }

    });
    router.get('/profile', async (req, res) => {
        try {
            let data = await db.getUserWithPlatos(req.session.user._id);
            res.send({ data: data });
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.put('/users/:id', async (req, res) => {
        try {
            await db.updateUser(req.params.id, req.body);
            res.status(200).json({ message: 'Usuario actualizado' });
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });
    router.delete('/users/:id', async (req, res) => {
        try {
            await db.deleteUser(req.params.id);
            res.status(200).json({ message: 'Usuario eliminado' });
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    });

    router.get('/platos/main/call', async (req, res) => {
        try {
            let arrCat = [];
            let others = {
                name: 'Platos Destacados',
                dishes: await db.getDestacados()
            }
            arrCat.push(others);
            let categorias = await db.getCategorias();
            for (cat of categorias) {
                let obj = {
                    name: cat.name,
                    dishes: await db.getPlatosByCategory({ categorias: cat.name })
                }
                arrCat.push(obj);
            }
            others = {
                name: 'Vegetariana',
                dishes: await db.getPlatosByCategory({ paraVegetarianos: true })
            }
            arrCat.push(others);
            others = {
                name: 'Vegana',
                dishes: await db.getPlatosByCategory({ paraVeganos: true })
            }
            arrCat.push(others);
            others = {
                name: 'Libre de Gluten',
                dishes: await db.getPlatosByCategory({ paraCeliacos: true })
            }
            arrCat.push(others);


            res.send({ data: arrCat });
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });

    router.get('/platos/chef/:id', async (req, res) => {  // juan aca otra vez le saque el id y se lo cambie por el res
        try {
            let platos = await db.getPlatos(req.params.id, null);
            res.send({ data: platos });
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });
    router.get('/platos/mios', async (req, res) => {  // juan aca otra vez le saque el id y se lo cambie por el res
        try {
            let platos = await db.getPlatos(req.session.user._id, null);
            res.send({ data: platos });
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
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
        try {
            let plato = await db.getPlato(req.params.id);
            let recomendados = await db.getRecomendados(plato);
            res.send({ data: { dish: plato, recommended: recomendados } });
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });
    router.get('/platos/semanal', async (req, res) => {

        try {
            let platos = await db.getSemanales(client, database, collection);
            res.send({ data: platos });
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });
    router.post('/platos/semanal/:id', async (req, res) => {
        try {
            let platosNuevos = req.body.keys;

            await db.updatePlatosSemanales(req.session.user._id, platosNuevos); // aca estuvo juaniot //Aca estuvo Mendi
            res.status(200).json({ message: 'Platos semanales confirmados' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });
    router.post('/review/chef/:id', async (req, res) => {
        try {
            await db.insertReviewChef(req.params.id, req.body)
            res.status(200).json({ message: 'Reseña agregada' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });
    router.post('/review/plato/:id', async (req, res) => {
        try {
            await db.insertReviewPlato(req.params.id, req.body)
            res.status(200).json({ message: 'Reseña agregada' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });
    //TODO - Revisar
    router.get('/usuarios/name/:id', async (req, res) => {
        try {
            let collection = 'usuarios';
            let nombre = await db.getuserByID(client, database, collection, req.params.id);
            res.send({ data: nombre })
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    })
    //TODO - Revisar
    router.get('/issubscibed/:idchef/:iduser', async (req, res) => {
        let varbool = false;
        try {
            let collection = 'subscipciones';
            let retorno = await db.isSubscribed(client, database, collection, req.params.idchef, req.params.iduser);
            if (!retorno[0]) {
                varbool = false;
            } else {
                varbool = true;
            }
            res.send({ data: varbool })
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    })
    //TODO - Revisar
    router.get('/profile/:id', async (req, res) => {
        try {
            let collection = 'usuarios';
            let nombre = await db.getuserByID(client, database, collection, req.params.id);
            res.send({ data: nombre });
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    })
    // router.get('/profile/review/:id', async (req, res) => {
    //     try {
    //         let collection = 'chef-review';
    //         let nombre = await db.getAllReviewsByIDperfil(client, database, collection, req.params.id);
    //         res.send(nombre)
    //         res.status(200).end();
    //     } catch (err) {
    //         console.log(err);
    //         res.status(400).json({message:'Error del servidor'})
    //     }
    // })
    // router.get('/plato/review/:id', async (req, res) => {
    //     try {
    //         let collection = 'platos-review';
    //         let nombre = await db.getAllReviewsByIDplato(client, database, collection, req.params.id);
    //         res.send(nombre)
    //         res.status(200).end();
    //     } catch (err) {
    //         console.log(err);
    //         res.status(400).json({message:'Error del servidor'})
    //     }
    // })


    router.post('/platos', async (req, res) => {
        try {
            await db.savePlato(req.session.key, req.body);
            res.status(200).json({ message: 'Plato agregado' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });
    //TODO - Reviasr
    // router.post('/subscribe/:id', async (req, res) => {
    //     try {
    //         let collection = 'subscipciones';
    //         await db.insertSubscripcion(client, database, collection, req.body, req.params.id);
    //         res.status(200).end();
    //     } catch (err) {
    //         console.log(err);
    //         res.status(400).json({ message: 'Error del servidor' })
    //     }
    // });
    // //TODO - Reviasr
    // router.post('/unsubscribe/:id', async (req, res) => {
    //     try {
    //         console.log(req)
    //         let collection = 'subscipciones';
    //         await db.delateSubscripcion(client, database, collection, req.body, req.params.id);
    //         res.status(200).end();
    //     } catch (err) {
    //         console.log(err);
    //         res.status(400).json({ message: 'Error del servidor' })
    //     }
    // });

    router.delete('/platos/:id', async (req, res) => {
        let collection = 'platos';
        let updateInfo = {
            isDeleted: true
        };
        try {
            // await db.updatePlato(client, database, collection, req.query.id, updateInfo);
            await db.deletePlato(req.params.id)
            res.status(200).json({ message: 'Plato eliminado' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });


    router.get('/platos/destacados/', async (req, res) => {
        let collection = 'destacados';
        try {
            let destacados = await db.getDestacados();
            if (destacados == null) {
                res.status(400).json({ message: 'No se han encontrado platos' })
            }
            res.send({ data: destacados });
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }

    });

    router.post('/platos/destacados/', async (req, res) => {
        try {
            let id = {
                id: req.body.id
            };
            await db.insertDestacado(req.body.id);
            res.status(200).json({ message: 'Plato destacado agregado' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });
    //TODO - Revisar
    router.delete('/platos/destacados/:id', async (req, res) => {
        try {
            await db.deleteDestacado(req.params.id);
            res.status(200).json({ message: 'Plato destacado eliminado' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });
    //TODO - Corregir ????
    router.post('/pedido', async (req, res) => {
        try {
            let user = req.session.user;
            let pedido = req.body;
            pedido.user = {
                id: user._id,
                name: user.name
            }
            await db.insertPedido(pedido)
            res.status(200).json({ message: 'Pedido completado' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });

    router.get('/pedido', async (req, res) => {
        try {
            let user = req.session.user._id;

            let pedidos = await db.getPedidos(user);
            res.send({ data: pedidos });
            res.status(200).end();

        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });

    router.get('/pedido/chef', async (req, res) => {
        try {
            let user = req.session.user._id;

            let pedidos = await db.getPedidosParaChef(user);
            res.send({ data: pedidos});
            res.status(200).end();

        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });

    router.post('/categoria', async (req, res) => {
        try {
            let cat = req.body;
            await db.insertCategoria(cat);
            res.status(200).json({ message: 'Categoria agregada' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });
    router.delete('/categoria', async (req, res) => {
        try {
            let id = req.query.id;
            await db.deleteCategoria(id);
            res.status(200).json({ message: 'Categoria eliminada' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });
    router.get('/categoria', async (req, res) => {
        try {
            let data = await db.getCategorias();
            res.send({ data: data });
            res.end();
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' })
        }
    });


    router.post('/favs', async (req, res) => {
        try {
            await db.addFav(req.session._id, req.body.id);
            res.status(200).json({ message: 'Plato marcado como favorito' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });

    router.delete('/favs/:id', async (req, res) => {
        try {
            await db.deleteFav(req.session._id, req.params.id);
            res.status(200).json({ message: 'Plato desmarcado como favorito' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error del servidor' });
        }
    });

})();
module.exports = router;