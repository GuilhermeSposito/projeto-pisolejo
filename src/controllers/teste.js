const teste = async (req, res) => {
    try {
        return res.status(201).json("Tudo Funcionando Perfeitamente no controllers testes")
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = teste