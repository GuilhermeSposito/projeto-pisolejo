const yup = require('yup')

const produtoSchema = yup.object({
    descricao: yup.string().required(),
    quantidade_estoque: yup.number().min(0).required(),
    valor: yup.number().min(0).required(),
    categoria_id: yup.number().min(0).required()
})

module.exports = produtoSchema