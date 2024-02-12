const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './.env' })

const validaLogin = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res
                .status(401)
                .json({
                    status_code: 401,
                    message: "Deve ser Enviado um token!"
                })
        }

        const token = authorization.split(' ')[1]
        const verifToken = await jwt.verify(token, process.env.SENHA_JWT)

        req.funcionario = verifToken

        next()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

module.exports = validaLogin