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
const {
    cadastrarProduto,
    listarProdutos,
    editarProduto,
    detalharProduto
} = require('../controllers/produtos')
const { cadastraCliente, detalhaCliente } = require('../controllers/clientes')

rotas.get('/teste', teste)
rotas.get('/categorias', listarCategorias)
rotas.post('/categorias', cadastrarCategoria)
rotas.post('/funcionarios', cadastroDeFuncionario)
rotas.post('/login', login)
//a partir daqui deve ser enviado um token de login
rotas.use(validaLogin)
rotas.get('/funcionario', detalharPerfilFuncionarioLogado)
rotas.put('/funcionario', editarPerfilFuncionario)
rotas.post('/produtos', cadastrarProduto)
rotas.put('/produtos/:id', editarProduto)
rotas.get('/produtos', listarProdutos)
rotas.get('/produtos/:id', detalharProduto)
rotas.post('/clientes', cadastraCliente)
rotas.get('/cliente/:id', detalhaCliente)

module.exports = rotas