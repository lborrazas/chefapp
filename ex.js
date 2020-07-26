const db = require('./mongoose');

// ESTO ES PARA PROBAR LO DE MONGOOSE - SE PUEDE BORRAR

(async function () {
    let user = {
        user: 'Pepe12',
        email: 'Pepe@abc.com',
        password: 1234,
        type: 'chef',
        name: 'Pepe',
        bio: 'Soy Pepe',
        carrito: [],
        pedidos: [],
        reviews: [],
        platos: [],
        suscriptores: 0
    }
    let categoria1 = {
        name: 'Mexicana'
    }    
    let categoria2 = {
        name: 'Sea Food'
    }    
    let categoria3 = {
        name: 'Mexicana'
    }
    // let categorias = [categoria1,categoria2,categoria3];
    // for(l of categorias){
    //     console.log(l);
        
    //     await db.insertCategoria(l);
    // }
    let data = {
        name: 'Elotes',
        precio: 10,
        esDeSemana: true,
        paraCeliacos: false,
        paraVeganos: true,
        paraVegetarianos: false,
        categorias: ['Mexicana'],
        descripcion: 'Es un elote',
        reviews: [],
        cantidad: 1,
        reservados: 0,
        photo: 'Esto es una foto',
    }
    await db.insertUser(user);
    await db.savePlato('Pepe@abc.com', data);
    await db.getPlatos('5f1c88e440305112a01d0f8d');

    // let data2 = {
    //     descripcion: 'Esto esta updateado'
    // }
    // await db.updateUser('5f1bb0dff94a41313c94e4ed', data2)
    // console.log('Fin');
})()
