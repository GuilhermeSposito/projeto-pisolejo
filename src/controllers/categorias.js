const knex = require('../data/conexaoKnex')
const categoriaSchema = require('../tests/categoriaSchema')

const listarCategorias = async (req, res) => {
    try {
        const selectCategorias = await knex('categorias')

        return res.status(200).json(selectCategorias)
    } catch (error) {
        return res.status(500).json('Servidor Error')
    }
}

const cadastrarCategoria = async (req, res) => {
    try {
        await categoriaSchema.validate(req.body)
        const { descricao } = req.body

        const selectCategorias = await knex('categorias')
        const categoriaRepetida = selectCategorias.some(objAtual => {
            return objAtual.descricao === descricao
        })

        if (categoriaRepetida) {
            return res.status(400).json({ Message: "Categoria já existe no banco de dados!" })
        }

        const insertCategoria = await knex('categorias').insert({ descricao: descricao }).returning('*')

        return res.status(201).json(insertCategoria)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = {
    listarCategorias,
    cadastrarCategoria
}