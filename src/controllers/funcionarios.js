const bcrypt = require('bcrypt')
const funcionarioSchema = require('../tests/funcinarioSchema')
const knex = require('../data/conexaoKnex')

const cadastroDeFuncionario = async (req, res) => {
    try {
        //aqui vai ser escrito o código para cadastrar um funcionario 
        await funcionarioSchema.validate(req.body)
        const { nome, email, senha } = req.body

        const funcionarioJaExiste = await knex('funcionarios').where({ email }).first()
        if (funcionarioJaExiste) {
            return res.status(400).json({ mensagem: "Funcionário já encontrado no banco de dados!" })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const insertFuncionario = await knex('funcionarios')
            .insert({
                nome, email,
                senha: senhaCriptografada
            })
            .returning(["id", "nome", "email"])

        return res
            .status(201)
            .json(insertFuncionario)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const detalharPerfilFuncionarioLogado = async (req, res) => {
    try {
        //aqui vai ser escrito o código que vai detalhar o usuario logado 
        const { id, nome, email } = req.funcionario

        return res
            .status(200)
            .json({
                id,
                nome,
                email
            })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const editarPerfilFuncionario = async (req, res) => {
    try {
        //aqui vai ser escrito o código para fazer a edição do funcionario logado
        await funcionarioSchema.validate(req.body)
        const { id } = req.funcionario
        const { nome: novoNome, email: novoEmail, senha: novaSenha } = req.body

        const verifEmailRepetido = await knex('funcionarios').where({ email: novoEmail }).first()
        if (verifEmailRepetido && verifEmailRepetido.id != id) {
            return res
                .status(400)
                .json({
                    status_code: 400,
                    Message: 'Email Já encontrado no nosso banco de dados!'
                })
        }

        const senhaCrypt = await bcrypt.hash(novaSenha, 10)

        const updateFuncionario = await knex('funcionarios')
            .update({
                nome: novoNome,
                email: novoEmail,
                senha: senhaCrypt
            })
            .where({ id })
            .returning(["id", "nome", "email"])

        return res.
            status(201)
            .json(updateFuncionario)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = {
    cadastroDeFuncionario,
    detalharPerfilFuncionarioLogado,
    editarPerfilFuncionario
}