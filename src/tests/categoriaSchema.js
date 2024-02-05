const yup = require("yup")

const categoriaSchema = yup.object({
    descricao: yup.string().required()
})

module.exports = categoriaSchema