const express = require('express')
const rotas = express()
const {
    cadastroDeFuncionario,
    detalharPerfilFuncionarioLogado,
    editarPerfilFuncionario
} = require('../controllers/funcionarios')

const {
    listarCategorias,
    cadastrarCategoria
} = require('../controllers/categorias')

const teste = require('../controllers/teste')

const login = require('../controllers/login')

const validaLogin = require('../middlewares/middlewareDeLogin')

rotas.get('/teste', teste)
rotas.get('/categorias', listarCategorias)
rotas.post('/categorias', cadastrarCategoria)
rotas.post('/funcionarios', cadastroDeFuncionario)
rotas.post('/login', login)
//a partir daqui deve ser enviado um token de login
rotas.use(validaLogin)
rotas.get('/funcionario', detalharPerfilFuncionarioLogado)
rotas.put('/funcionario', editarPerfilFuncionario)

module.exports = rotas