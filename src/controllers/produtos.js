const produtoSchema = require("../tests/produtoSchemas")
const knex = require('../data/conexaoKnex')
const { number } = require("yup")

const cadastrarProduto = async (req, res) => {
    try {
        //aqui vai ser escrito o código para cadastrar um produto
        await produtoSchema.validate(req.body)
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body

        const produtos = await knex('produtos')
        const verifDuplicidade = produtos.some(objAtual => {
            return objAtual.descricao === descricao
        })

        if (verifDuplicidade) {

            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "Produto já existente no banco de dados!"
                })

        }

        const categorias = await knex('categorias')
        const verifCategoriaExiste = categorias.some(objAtual => {
            return objAtual.id === categoria_id
        })

        if (!verifCategoriaExiste) {

            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "Categoria inexistente!"
                })

        }

        const insertProduto = await knex('produtos')
            .insert({ descricao, quantidade_estoque, valor, categoria_id })
            .returning('*')

        return res
            .status(201)
            .json({
                status_code: 201,
                message: "Produto inserido com sucesso!"
            })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const listarProdutos = async (req, res) => {
    try {
        const { categoria_id } = req.query

        if (categoria_id) {
            const produto = await knex('produtos')
                .where({ categoria_id })
                .select('produtos.id', 'produtos.descricao', 'produtos.quantidade_estoque', 'produtos.valor', 'categorias.descricao as descricao_categoria', 'produtos.categoria_id')
                .join('categorias', 'produtos.categoria_id', '=', 'categorias.id')

            return res
                .status(200)
                .json({
                    status_code: 200,
                    produto
                })
        }

        const produtos = await knex('produtos')
            .select('produtos.id', 'produtos.descricao', 'produtos.quantidade_estoque', 'produtos.valor', 'categorias.descricao as descricao_categoria', 'produtos.categoria_id')
            .join('categorias', 'produtos.categoria_id', '=', 'categorias.id')

        return res.status(200).json(produtos)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const editarProduto = async (req, res) => {
    try {
        await produtoSchema.validate(req.body)
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body
        const { id } = req.params

        const verifExistencia = await knex('produtos').where({ id }).first()
        if (!verifExistencia) {

            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "Id passado como parâmetro de rota não existe no Banco de dados!"
                })

        }

        const verfDuplicidade = await knex('produtos').where({ descricao }).first()
        if (verfDuplicidade && verfDuplicidade.id != id) {

            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "Produto já existente no banco de dados!"
                })

        }

        const update = await knex('produtos')
            .update({ descricao, quantidade_estoque, valor, categoria_id })
            .where({ id })
            .returning('*')

        return res
            .status(201)
            .json({
                status_code: 200,
                message: 'Produto modificado com sucesso!',
                produto: update,
                funcionario: req.funcionario
            })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const detalharProduto = async (req, res) => {
    try {
        const { id } = req.params


        const verfProduto = await knex('produtos').where({ id }).first()
        if (!verfProduto) {

            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "Id passado como parâmetro de rota não existe no Banco de dados!"
                })

        }

        return res
            .status(200)
            .json({
                status_code: 200,
                produto: verfProduto
            })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const deletarProduto = async (req, res) => {
    try {
        const { id } = req.params

        const produto = await knex('produtos').where({ id }).first()
        if (!produto) {
            return res.status(400)
                .json({
                    status_code: 400,
                    message: "Produto com id enviado não encontrado no banco de dados!"
                })
        }

        const deletProduto = await knex('produtos').where({ id }).delete()

        return res.status(203).json()
    } catch (error) {
        if (error.code == '23503') {
            return res.status(400).json({
                status_code: 400,
                message: "Não é possivel excluir um produto que se encontra em um pedido!"
            })
        }

        return res.status(400).json({ message: error.message })
    }
}

module.exports = {
    cadastrarProduto,
    listarProdutos,
    editarProduto,
    detalharProduto,
    deletarProduto
}