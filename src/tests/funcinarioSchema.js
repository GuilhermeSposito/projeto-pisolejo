const yup = require('yup')


const funcionarioSchema = yup.object({
    nome: yup.string().required(),
    email: yup.string().required(),
    senha: yup.string().required()
})

module.exports = funcionarioSchema