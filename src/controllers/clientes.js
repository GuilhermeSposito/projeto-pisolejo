const knex = require('../data/conexaoKnex')
const clientesSchemas = require('../tests/clientesSchemas')
const transport = require('../utils/conexaoNodmailer')
const fs = require('fs/promises')
const handlebars = require('handlebars')

const cadastraCliente = async (req, res) => {
    try {
        await clientesSchemas.validate(req.body)
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

        const verifEmail = await knex('clientes').where({ email }).first()
        if (verifEmail) {
            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "Email já cadastrado no banco de dados!"
                })
        }

        const verifCpf = await knex("clientes").where({ cpf }).first()
        if (verifCpf) {
            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "CPF já cadastrado no banco de dados!"
                })
        }

        const insertCliente = await knex('clientes')
            .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning('*')


        const htmlEmail = await fs.readFile('./src/templates/emailBemVindo.html')
        const htmlCompilado = handlebars.compile(htmlEmail.toString())

        const sendMail = await transport.sendMail({
            from: `"Pisolejo" <${process.env.MAIL_SEND}>`,
            to: `"${email}"`,
            subject: "Bem Vindo a Pisolejo",
            html: htmlCompilado()
        });

        return res.status(201)
            .json({
                status_code: 201,
                message: "Cliente Cadastrado com sucesso!",
                funcionario: req.funcionario,
                cliente: insertCliente
            })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const detalhaCliente = async (req, res) => {
    try {
        const { id } = req.params

        const cliente = await knex('clientes').where({ id }).first()
        if (!cliente) {
            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "Cliente não entrado no banco de dados com esse id enviado!"
                })
        }

        return res
            .status(200)
            .json({
                status_code: 200,
                cliente
            })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = {
    cadastraCliente,
    detalhaCliente
}