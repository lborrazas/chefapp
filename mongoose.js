'use strict'

const mongoose = require('mongoose');
const database = 'chefsappv2';
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_CONNECTION + '/' + database;

mongoose.Promise = global.Promise;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Schema = mongoose.Schema;

const PlatoSchema = new Schema({
    name: String,
    price: Number,
    esDeSemana: Boolean,
    paraCeliacos: { type: Boolean, default: false },
    paraVeganos: { type: Boolean, default: false },
    paraVegetarianos: { type: Boolean, default: false },
    categorias: Array,
    descripcion: String,
    reviews: Array,
    cantidad: Number,
    reservados: { type: Number, default: 0 },
    photo: String,
    favs: Number
}, {
    versionKey: false
});

const UsuarioSchema = new Schema({
    user: String,
    email: String,
    password: String,
    type: {
        type: String,
        enum: ['cliente', 'chef']
    },
    name: String,
    bio: String,
    photo: String,
    carrito: Array,
    pedidos: Array,
    reviews: Array,
    platos: [String],
    suscriptores: Number,
    status: String,
    favs: Array

}, {
    versionKey: false
});

const PedidoSchema = new Schema({
    user: {
        id: String,
        name: String
    },
    fecha:String,
    platos: Array
}, {
    versionKey: false
});

const DestacadoSchema = new Schema({
    id: String
}, {
    versionKey: false
});
const CategoriaSchema = new Schema({
    name: String
}, {
    versionKey: false
});

const Plato = mongoose.model('Plato', PlatoSchema);
const Usuario = mongoose.model('Usuario', UsuarioSchema);
const Pedido = mongoose.model('Pedido', PedidoSchema);
const Destacado = mongoose.model('Destacado', DestacadoSchema);
const Categoria = mongoose.model('Categoria', CategoriaSchema);

// Platos
module.exports.savePlato = async function (email, data) {
    try {
        let plato = new Plato(data);

        await plato.save(async function (err, data) {
            if (err) console.log(err);
            else {

                await Usuario.updateOne(
                    { email: email },
                    {
                        $addToSet: {
                            platos: plato._id
                        }
                    }, function (err, res) {
                        console.log(err);
                    }
                );
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.getPlatos = async function (id, filters) {
    let result = null;
    if (!id) {
        result = await Plato.find(filters);
    } else {
        if (!filters) filters = {};
        filters._id = id;
        let id_platos = await Usuario.findOne(filters, 'platos');
        result = await Plato.find({
            _id: {
                $in: id_platos.platos
            }
        });
    }
    return result;
};
module.exports.getPlatosByCategory = async function (filters) {
    filters.esDeSemana = true;
    let platos = await Plato.find(filters, 'photo').limit(10);
    platos = await platos.map(async plato => {
        plato = plato.toObject();
        let chef = await Usuario.findOne({ type: 'chef', platos: plato._id }, 'name photo');

        plato.chef = {
            id: chef._id,
            name: chef.name,
            photo: chef.photo
        };
        return plato;
    });
    platos = await Promise.all(platos);
    return platos;
}
module.exports.getPlatosLimit = async function (filters, limit) {
    let platos = Plato.find(filters).limit(limit);
}

module.exports.getPlato = async function (id) {
    let result = await Plato.findById(id);
    return result;
};

module.exports.updatePlato = async function f(id, data) { // te habia faltado esta -- Your fiendly neitgboor Spider-man
    let result = await Plato.updateOne({ _id: id }, data);
    return result;
}

module.exports.updatePlatosSemanales = async function (id_chef, platos) {
    let chef = await Usuario.find({ _id: id_chef }, 'platos');
    await Plato.updateMany({ _id: { $in: chef.platos }, esDeSemana: true }, { $set: { esDeSemana: false } });
    for (let plato of platos) {

        await Plato.updateOne({
            _id: plato._id
        }, {
            $set: {
                esDeSemana: true,
                cantidad: plato.cantidad
            }
        });
    }
}

module.exports.getRecomendados = async function (plato) {
    let cat_fuertes = {
        esDeSemana: true,
        paraCeliacos: plato.paraCeliacos,
        paraVeganos: plato.paraVeganos,
        paraVegetarianos: plato.paraVegetarianos
    }
    let categorias = plato.categorias;
    cat_fuertes.categorias = {
        $in: categorias
    }

    let recomendados = await Plato.find(cat_fuertes, '_id photo').sort({ favs: -1 }).limit(5);

    recomendados = await recomendados.map(async plato => {

        plato = plato.toObject();
        let chef = await Usuario.findOne({ type: 'chef', platos: plato._id }, 'name photo');
        plato.chef = {
            id: chef._id,
            name: chef.name,
            photo: chef.photo
        };
        return plato;
    });
    recomendados = await Promise.all(recomendados);
    return recomendados;
}



module.exports.deletePlato = async function (id) {
    await Plato.deleteOne({ _id: id });
}

// Usuarios

module.exports.insertUser = async function (user) {
    let mail = user.email;
    let alreadyExists = await Usuario.findOne({ email: mail });

    if (!alreadyExists) {
        let newUser = new Usuario(user);
        let docInserted = await newUser.save();
    } else {
        console.log('User already registered');
    }

}

module.exports.getUsers = async function (type) {
    let result = await Usuario.find({ type: type }, '-password');
    return result;
};

module.exports.getUser = async function (id, filters) {
    let result = null;
    if (id) {
        result = await Usuario.findById(id, '-password');
    } else {
        result = await Usuario.findOne(filters);
    }
    return result;
};

module.exports.getUserWithPlatos = async function (id) {
    let user = await Usuario.findById(id);
    let id_platos = user.platos;

    let platos = await Plato.find({
        _id: {
            $in: id_platos
        }
    });
    user = user.toObject();
    user.platos = platos;
    return user;
}

module.exports.updateUser = async function (id, data) {
    let result = await Usuario.updateOne({ _id: id }, data);
    return result;
};

module.exports.deleteUser = async function (id) {
    await Usuario.deleteOne({ _id: id });
};

//Reseñas

module.exports.insertReviewChef = async function (id, review) {
    let result = await Usuario.updateOne(
        { _id: id },
        {
            $push: {
                reviews: review
            }
        }
    );
    return result;
};
module.exports.insertReviewPlato = async function (id, review) {
    let result = await Plato.updateOne(
        { _id: id },
        {
            $push: {
                reviews: review
            }
        }
    );
    return result;
};
module.exports.getReviewsChef = async function (id) {
    let result = await Usuario.findOne({ _id: id }, 'reviews');
    if (result) return result.reviews;
    return null;
}

module.exports.getReviewsPlato = async function (id) {
    let result = await Plato.findOne({ _id: id }, 'reviews');
    if (result) return result.reviews;
    return null;
}

//Pedidos

module.exports.insertPedido = async function (data) {
    let id_user = data.user.id;
    let pedido = new Pedido(data);
    await pedido.save();
    await Usuario.updateOne({ _id: id_user }, {
        $addToSet: {
            pedidos: pedido._id
        }
    });

    let platos = data.platos;

    for (let plato of platos) {
        await Plato.updateOne({ _id: plato._id },
            {
                $inc: {
                    reservados: 1
                }
            })
    }
}
module.exports.getPedidos = async function (id) {
    let id_pedidos = await Usuario.findOne({ _id: id }, 'pedidos');
    let pedidos = await Pedido.find({
        _id: {
            $in: id_pedidos.pedidos
        }
    });
    return pedidos;
}

module.exports.getPedidosParaChef = async function (id) {
    let id_platos = await Usuario.findOne({ _id: id }, 'platos');
    let platos_semana = await Plato.find({
        _id: {
            $in: id_platos.platos
        },
        esDeSemana: true
    }, '_id name photo');

    let allPedidos = await Pedido.find()
    let arrazy=[]
    console.log(allPedidos)
    console.log("---------------------------------------")
    console.log(platos_semana)
    console.log(allPedidos.length)

    for(let i =0;i<allPedidos.length;i++){
        console.log("i:"+i)
        console.log(platos_semana.length)
        for(let j=0;j<platos_semana.length;j++){
            console.log(allPedidos[i].platos.length)
            console.log("j:"+j)
            for(let k=0;k<allPedidos[i].platos.length;k++){
                console.log("k:"+k)
                console.log(allPedidos[i].platos[k]._id +"----"+platos_semana[j]._id)
                if(allPedidos[i].platos[k]._id==platos_semana[j]._id){
                        arrazy.push({
                            nombreplato:platos_semana[j].name,
                            idplato:platos_semana[j]._id,
                            username:allPedidos[i].user.name,
                            descripcion:allPedidos[i].platos[k].descripcion,
                            precioplato:allPedidos[i].platos[k].price,
                            photoplato:platos_semana[j].photo,
                            fecha:allPedidos[i].fecha
                        })
                }
            }
        }
    }
    console.log(arrazy)

   /* platos_semana = await platos_semana.map(async plato => {
        plato = plato.toObject();
        console.log()

        let pedidos = await Pedido.find({
            "platos._id":plato._id
        }, '_id user');
        console.log(pedidos)

        plato.pedidos = pedidos;
        return plato;
    });
    platos_semana = await Promise.all(platos_semana);
    return platos_semana;



    let pedidos = Pedido.find({
        _id: {
            $in: id_pedidos.pedidos
        }
    });*/

    return arrazy;
}
module.exports.deletePedido = async function (id, id_user) {
    await Pedido.deleteOne({ _id: id });
    await Usuario.updateOne(
        { _id: id_user },
        {
            $pull: {
                pedidos: id
            }
        });
}

//Destacados

module.exports.insertDestacado = async function (id) {
    let destacado = new Destacado({ id: id });
    await destacado.save();
}
module.exports.getDestacados = async function () {
    let id_destacados = await Destacado.find();

    let arr = []
    for (e of id_destacados) {
        arr.push(e.id);
    }

    let platos = await Plato.find({
        _id: {
            $in: arr
        }
    }, 'photo');
    platos = await platos.map(async plato => {

        plato = plato.toObject();
        let chef = await Usuario.findOne({ type: 'chef', platos: plato._id }, 'name photo');

        plato.chef = {
            id: chef._id,
            name: chef.name,
            photo: chef.photo
        };
        return plato;
    });
    platos = await Promise.all(platos);
    return platos;

}
module.exports.deleteDestacado = async function (id) {
    await Destacado.deleteOne({ _id: id });
}

//Categorias

module.exports.insertCategoria = async function (data) {
    let categoria = new Categoria(data);
    await categoria.save();
}
module.exports.getCategorias = async function () {
    return Categoria.find();
}
module.exports.deleteCategoria = async function (id) {
    await Categoria.deleteOne({ _id: id });
}


// Favs

module.exports.addFav = async function (userId, dishId) {
    await Usuario.updateOne({ _id: userId },
        {
            $addToSet: {
                favs: dishId
            }
        });
    await Plato.findOneAndUpdate({ _id: dishId },
        {
            $inc: {
                favs: 1
            }
        });
}
module.exports.deleteFav = async function (userId, dishId) {
    await Usuario.updateOne({ _id: userId },
        {
            $pull: {
                favs: dishId
            }
        });
    await Plato.findOneAndUpdate({ _id: dishId },
        {
            $inc: {
                favs: -1
            }
        });
}