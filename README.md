# Projeto API rest Pisolejo.

**Ferramentas que foram usadas neste projeto:**

![javaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![postgree](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**link do deploy:**
```javascript
https://kind-jade-sturgeon-gear.cyclic.app/
```

**RESTful API que permite:**

- Cadastrar funcionário 
- Fazer Login do funcionário 
- Detalhar Perfil do funcionário Logado 
- Editar Perfil do funcionário Logado 
- Cadastrar Categorias 
- Listar categorias 
- Cadastrar Produto 
- Editar Produtos 
- Listar Produtos 
- Detalhar produto pelo id
- Deletar produto por id 
- Cadastrar Cliente 
- Detalhar perfil do cliente pelo id 
- Editar Cliente 
- Cadastrar pedido
- Deletar Pedido (enviando email avisando o cliente) 
- Listar pedidos
- Detalhar pedido pelo id 


Abaixo, listamos os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
```

# **Banco de Dados:** 

**Temos as Seguintes tabelas no nosso banco de dados:**



-   Funcinarios
    -   id
    -   nome
    -   email 
    -   senha
-   categorias
    -   id
    -   descricao
-   produtos
    -   id
    -   descricao
    -   quantidade_estoque
    -   valor
    -   categoria_id
-   clientes
    -   id
    -   nome
    -   email 
    -   cpf 
    -   cep 
    -   rua
    -   numero
    -   bairro
    -   cidade
    -   estado
-   pedidos
    - id
    - data
    - cliente_id
    - observacao
    - valor_total
-   pedido_produtos
    -   id
    -   pedido_id
    -   produto_id
    -   quantidade_produto
    -   valor_produto

 # Endpoints

#### `GET` `/categoria`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/categoria
```

Essa é a rota que será chamada quando o funcionario cadastrado quiser listar todas as categorias cadastradas.

---------------------------

#### `POST` `/categorias`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/categoria
```

Essa é a rota que será utilizada para cadastrar uma nova categoria no sistema.

Critérios de aceite:

    - Campos obrigatórios: 
        - descricao

#### **Exemplo de requisição**
```javascript
{
    "descricao": "Exemplo"
}
```
--------------------------------------------------

#### `POST` `/funcionarios`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/funcionarios
```

Essa é a rota que será utilizada para cadastrar um novo funcionário no sistema.

Critérios de aceite:

    - Campos obrigatórios: 
        - nome
        - email
        - senha

#### **Exemplo de requisição**
```javascript
{
    "nome": "exemploNome",
    "email": "emailExemplo@gmail.com",
    "senha": "exemploSenha"
}
```
------------------------------------------------------

#### `POST` `/login`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/login
```

Essa é a rota que permite o funcionário cadastrado realizar o login no sistema.

#### **Exemplo de requisição**
```javascript
{
    "email": "emailExemplo@gmail.com",
     "senha": "exemploSenha"
}
```
------------------------------------------------------- 
## A partir do ENDPOINT de login devera ser enviado um Bearer Token no authorization da requisição!   

#### `GET` `/funcionario`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/funcionario
```

Essa é a rota que permite o Funcionário logado a visualizar os dados do seu próprio perfil, de acordo com a validação do token de autenticação.

-------------------------------------------------------

#### `PUT` `/funcionario`

Essa é a rota que permite o funcionário logado atualizar informações de seu próprio cadastro, de acordo com a validação do token de autenticação.

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/funcionario
```

Critérios de aceite:

    - Campos obrigatórios: 
        - nome
        - email
        - senha

#### **Exemplo de requisição**
```javascript
{
    "nome": "exemploNome",
    "email": "emailExemplo@gmail.com",
    "senha": "exemploSenha"
}
```
-------------------------------------------------------

#### `POST` `/produto`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/produto
```
Essa é a rota que permite o funcionário logado cadastrar um novo produto no sistema.

Critérios de aceite:

    -   Campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id

```javascript
{
     "descricao": "Argamassa Porcelanato Interno Cinza 20kg - Quartzolit",
    "quantidade_estoque": 10,
    "valor": 2716,
    "categoria_id": 3
}
```
****lembrando que o valor enviado deve ser eniado em centavos***
--------------------------------------------------------

#### `PUT` `/produto/id`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/produto/1
```

Essa é a rota que permite o funcionário logado a atualizar as informações de um produto cadastrado.

Critérios de aceite:

    -   Campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir.

```javascript
{
     "descricao": "Argamassa Porcelanato Interno Cinza 20kg - Quartzolit",
    "quantidade_estoque": 10,
    "valor": 2716,
    "categoria_id": 3
}
```
--------------------------------------------------------


#### `GET` `/produtos`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/produtos
```

Essa é a rota que será chamada quando o funcionário logado quiser listar todos os produtos cadastrados.

Neste endpoint é possivel usar um parâmetro do tipo query **categoria_id** para que seja possível consultar produtos por categorias, de modo, que serão filtrados de acordo com o id de uma categoria.

**Exemplo da URl:**
```javascript
https://kind-jade-sturgeon-gear.cyclic.app/produtos?categoria_id=1
```

Retorno:

    - Caso não seja informado o parâmetro do tipo query **categoria_id** todos os produtos cadastrados vão ser retornados.
--------------------------------------------------------

#### `GET` `/produto/id`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/produtos/1
```

Essa é a rota que permite o funcionário logado obter um dos produtos cadastrados.  

--------------------------------------------------------

#### `DELETE` `/produto/id`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/produtos/1
```

Essa é a rota que será chamada quando o funcionário logado quiser excluir um de seus produtos cadastrados.  

Critérios de aceite:

    -   Caso o produto exista dentro de um pedido ele não pode ser excluido!.
--------------------------------------------------------

#### `POST` `/cliente`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/cliente
```
Essa é a rota que permite o funcionário logado cadastrar um novo cliente no sistema.

Critérios de aceite:

    -   Campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados é único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail.
    -   O campo cpf no banco de dados é ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf.

```javascript
{
  "nome": "ExemploNome",
  "email": "ExemploEmail@email.com",
  "cpf": "11Numeros",
  "cep": "", (opcional)
  "rua": "", (opcional)
  "numero": "", (opcional)
  "bairro": "", (opcional)
  "cidade": "", (opcional)
  "estado": "" (opcional)
}
```
------------------------------------


#### `PUT` `/cliente/:id`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/cliente/1
```

Essa é a rota que permite o funcionário realizar atualização de um cliente cadastrado.

Critérios de aceite:

    -   Cliente para o id enviado como parâmetro na rota.
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
   
   ```javascript
{
  "nome": "ExemploNome",
  "email": "ExemploEmail@email.com",
  "cpf": "11Numeros",
  "cep": "", (opcional)
  "rua": "", (opcional)
  "numero": "", (opcional)
  "bairro": "", (opcional)
  "cidade": "", (opcional)
  "estado": "" (opcional)
}
```
--------------------------------------------------------

#### `GET` `/cliente/:id`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/cliente/1
```

Essa é a rota que será chamada quando o funcionario logado quiser obter um de seus clientes cadastrados.  


--------------------------------------------------------

#### `POST` `/pedido`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/pedido
```

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.

**Lembre-se:** Cada pedido deverá conter ao menos um produto vinculado.

**Atenção:** As propriedades produto_id e quantidade_produto devem ser informadas dentro de um array e para cada produto será criado um objeto neste array, como ilustrado no objeto de requisição abaixo.


```javascript
// Corpo da requisição para cadastro de pedido (body)
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}

```

**obs: Após o pedido ser cadastrado será enviado um email para o cliente informando que o pedido foi cadastrado e o valor total!**
--------------------------------------------------------

#### `GET` `/pedido`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/pedido
```


Neste endpoint é possivel usar um parâmetro do tipo query **cliente_id** para que seja possível consultar pedidos por cliente, de modo, que serão filtrados de acordo com o id de um cliente.

**Exemplo da URl:**
```javascript
https://kind-jade-sturgeon-gear.cyclic.app/pedido?cliente_id=1
```

Retorno:

    - Caso não seja informado o parâmetro do tipo query **cliente_id** todos os pedidos cadastrados vão ser retornados.

```javascript
// Resposta para listagem de pedido (body)
[
    {
        "pedido": {
            "id": 1,
            "valor_total": 230010,
            "observacao": null,
            "cliente_id": 1
        },
        "pedido_produtos": [
            {
                "id": 1,
                "quantidade_produto": 1,
                "valor_produto": 10,
                "pedido_id": 1,
                "produto_id": 1
            },
            {
                "id": 2,
                "quantidade_produto": 2,
                "valor_produto": 230000,
                "pedido_id": 1,
                "produto_id": 2
            }
        ]
    }
]
```
--------------------------------------------------------

#### `DELETE` `/pedido/id`

```javascript
https://kind-jade-sturgeon-gear.cyclic.app/produtos/1
```

Essa é a rota que será chamada quando o funcionário logado quiser excluir um pedido cadastrados.  

**obs: Após o pedido for exluido será enviado um email para o cliente do pedido avisando sobre!**
--------------------------------------------------------


