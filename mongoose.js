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
    precio: Number,
    esDeSemana: Boolean,
    paraCeliacos: { type: Boolean, default: false },
    paraVeganos: { type: Boolean, default: false },
    paraVegetarianos: { type: Boolean, default: false },
    categorias: Array,
    descripcion: String,
    reviews: Array,
    cantidad: Number,
    reservados: Number,
    photo: String,
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
    status: String

}, {
    versionKey: false
});

const PedidoSchema = new Schema({
    usuario: {
        id: String,
        name: String
    },
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
                        console.log(res);

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
        console.log(id_platos);

        result = await Plato.find({
            _id: {
                $in: id_platos.platos
            }
        });
        console.log(result);
    }
    return result;
};
module.exports.getPlatosByCategory = async function (filters) {
    let platos = Plato.find(filters,'photo').limit(10);
    for(plato in platos) {
        let chef = Usuario.findOne({type:'chef', platos: plato._id},'photo');
        plato['id_chef'] = chef._id;
        plato['photo_chef'] = chef.photo;
    }
    return platos;
}
module.exports.getPlatosLimit = async function (filters, limit) {
    let platos = Plato.find(filters).limit(limit);
}

module.exports.getPlato = async function (id) {
    let result = await Plato.findById(id);
    return result;
};

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
    let result = await Usuario.find({ type: type });
    return result;
};

module.exports.getUser = async function (id, filters) {
    let result = null;
    if (id) {
        result = await Usuario.findById(id);
    } else {
        result = await Usuario.findOne(filters);
    }
    return result;
};

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
    let id_user = data.usuario.id;
    let pedido = new Pedido(data);
    await pedido.save();
    await Usuario.updateOne({ _id: id_user }, {
        $addToSet: {
            pedidos: pedido._id
        }
    });
}
module.exports.getPedidos = async function (id) {
    let id_pedidos = Usuario.findOne({ _id: id }, 'pedidos');
    let pedidos = Pedido.find({
        _id: {
            $in: id_pedidos.pedidos
        }
    });
    return pedidos;
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
    return null;
}
module.exports.getDestacados = async function () {
    return Destacado.find();
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