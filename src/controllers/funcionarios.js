const cadastroDeFuncionario = async (req, res) => {
    try {
        //aqui vai ser escrito o código para cadastrar um funcionario 
    } catch (error) {
        console.log(error)
        return res.status(500).json("Sevidor Error")
    }
}

module.exports = {
    cadastroDeFuncionario
}