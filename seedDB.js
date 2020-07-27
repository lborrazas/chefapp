const db = require('./mongoose');



(async function () {

    let cats = ['Mexicana', 'Del Mar', 'China', 'Koreana', 'Thai', 'Italiana', 'Criolla', 'Árabe'];

    for (let cat of cats) {
        let category = {
            name: cat
        }
        await db.insertCategoria(category);
    }
    return null;
})()