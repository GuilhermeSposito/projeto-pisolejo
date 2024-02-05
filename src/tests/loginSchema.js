const yup = require('yup')

const loginSchema = yup.object({
    email: yup.string().required(),
    senha: yup.string().required()
})

module.exports = loginSchema