const yup = require('yup')

const clientesSchemas = yup.object({
    nome: yup.string().required(),
    email: yup.string().required().email('Deve ser um email valido!'),
    cpf: yup.string().required(),
    cep: yup.string().default('null'),
    rua: yup.string().default('null'),
    numero: yup.string().default('null'),
    bairro: yup.string().default('null'),
    cidade: yup.string().default('null'),
    estado: yup.string().default('null')
})

module.exports = clientesSchemas