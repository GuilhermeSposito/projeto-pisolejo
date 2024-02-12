const bcrypt = require('bcrypt')
const loginSchema = require('../tests/loginSchema')
const knex = require('../data/conexaoKnex')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './.env' })

const login = async (req, res) => {
    try {
        await loginSchema.validate(req.body)
        const { email, senha } = req.body

        const usuarioExiste = await knex('funcionarios').where({ email }).first()
        if (!usuarioExiste) {
            return res
                .status(400)
                .json({
                    status_code: 401,
                    message: "Senha ou Email Incorretos!"
                })
        }

        const verifSenha = await bcrypt.compare(senha, usuarioExiste.senha)

        if (!verifSenha) {
            return res.
                status(400)
                .json({
                    status_code: 401,
                    message: "Senha ou Email Incorretos!"
                })
        }

        const token = await jwt.sign({
            id: usuarioExiste.id,
            nome: usuarioExiste.nome,
            email: usuarioExiste.email
        }, process.env.SENHA_JWT, { expiresIn: '1d' })

        return res
            .status(200)
            .json(token)
    } catch (error) {
        return res.status(400).json({ Message: error.message })
    }
}

module.exports = login