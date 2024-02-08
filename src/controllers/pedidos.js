
const knex = require('../data/conexaoKnex')
const pedidoSchema = require('../tests/pedidosSchema')
const transport = require('../utils/conexaoNodmailer')
const fs = require('fs/promises')
const handlebars = require('handlebars')

const cadastraPedido = async (req, res) => {
    try {
        await pedidoSchema.validate(req.body)
        const { cliente_id, observacao, pedido_produtos } = req.body

        const errors = Array()
        let valorTotal = 0

        const verfClienteExiste = await knex('clientes').where({ id: cliente_id }).first()
        if (!verfClienteExiste) {
            return res
                .status(400)
                .json({
                    status_code: 400,
                    message: "Cliente Não Encontrado no banco de dados!"
                })
        }

        for (objeto of pedido_produtos) {
            const produto = await knex('produtos').where({ id: objeto.produto_id }).first()

            if (!produto) {
                errors.push({ message: `produto de id:${objeto.produto_id} Não encontrado` })
                break
            }

            if (produto.quantidade_estoque < objeto.quantidade_produto) {
                errors.push({ message: `Quantidade solicitada para o produto de id:${objeto.produto_id} não tem em estoque!` })
                break
            }

            if (produto.quantidade_estoque - objeto.quantidade_produto < 0) {
                errors.push({ message: `Quantidade solicitada para o produto de id:${objeto.produto_id} não tem em estoque!` })
                break
            }

            valorTotal = valorTotal + produto.valor * objeto.quantidade_produto
        }

        if (errors.length > 0) {
            return res
                .status(400)
                .json({
                    status_code: 400,
                    errors
                })
        }

        const insertPedido = await knex('pedidos')
            .insert({
                cliente_id,
                observacao,
                valor_total: valorTotal,
                funcionario_id: req.funcionario.id
            })
            .returning('*')

        for (objetoAtual of pedido_produtos) {
            const produto = await knex('produtos').where({ id: objetoAtual.produto_id }).first()

            const insertProdutoPedido = await knex('pedido_produtos')
                .insert({
                    pedido_id: insertPedido[0].id,
                    produto_id: objetoAtual.produto_id,
                    quantidade_produto: objetoAtual.quantidade_produto,
                    valor_produto: produto.valor
                })

            const novaQtdEstoque = produto.quantidade_estoque - objetoAtual.quantidade_produto
            const updateProduto = await knex('produtos')
                .update({
                    quantidade_estoque: novaQtdEstoque
                }).where({ id: produto.id })
        }

        //envio de email confirmando a compra
        const htmlEmail = await fs.readFile('./src/templates/emailComfirmandoCompra.html')
        const htmlCompilado = handlebars.compile(htmlEmail.toString())

        const sendMail = await transport.sendMail({
            from: `"Pisolejo" <${process.env.MAIL_SEND}>`,
            to: `"${verfClienteExiste.email}"`,
            subject: "Pedido Confirmado",
            html: htmlCompilado({ nomecliente: verfClienteExiste.nome, valortotal: `${(valorTotal / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` })
        });

        return res
            .status(201)
            .json({
                status_code: 201,
                message: `Pedido de id: ${insertPedido[0].id} Concluido com sucesso!`
            })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { cadastraPedido }