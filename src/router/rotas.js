const express = require('express')
const rotas = express()
const { cadastroDeFuncionario } = require('../controllers/funcionarios')
const { listarCategorias } = require('../controllers/categorias')
const teste = require('../controllers/teste')

rotas.get('/teste', teste)
rotas.get('/categorias', listarCategorias)

module.exports = rotas