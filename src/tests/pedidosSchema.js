const yup = require('yup')

const pedidoSchema = yup.object({
    cliente_id: yup.number().min(1).required(),
    observacao: yup.string().default(""),
    pedido_produtos: yup.array(yup.object({
        produto_id: yup.number().min(1).required(),
        quantidade_produto: yup.number().min(1).required()
    })).required()
})

module.exports = pedidoSchema