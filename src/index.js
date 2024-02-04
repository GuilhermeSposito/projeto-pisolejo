const express = require('express')
const app = express()
const rotas = require('./router/rotas')

app.use(express.json())
app.use(rotas)

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000')
})