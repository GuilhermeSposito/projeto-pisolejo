const knex = require('../data/conexaoKnex')

const listarCategorias = async (req, res) => {
    try {
        const selectCategorias = await knex('categorias')

        return res.status(200).json(selectCategorias)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Servidor Error')
    }
}

module.exports = {
    listarCategorias
}