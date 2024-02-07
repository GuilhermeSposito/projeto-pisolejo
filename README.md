# Projeto API rest Pisolejo.

**Ferramentas que serão usadas neste projeto:**

![javaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![postgree](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**link do deploy:**
```javascript
https://kind-jade-sturgeon-gear.cyclic.app/
```

Deveremos criar uma RESTful API que permitira:

- Cadastrar funcionário ✅
- Fazer Login do funcionário ✅
- Detalhar Perfil do funcionário Logado ✅
- Editar Perfil do funcionário Logado ✅
- Cadastrar Categorias ✅
- Listar categorias ✅ -- 1ª Sprint até aqui!
- Cadastrar Produto ✅
- Editar Produtos
- Listar Produtos ✅
- Detalhar Produto
- Deletar produto por id
- Cadastrar Cliente -- 2ª Sprint até aqui
- Editar Cliente
- Detalhar perfil do cliente pelo id 
- Cadastrar pedido
- Listar pedidos -- 3ª Sprint até aqui 


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

- Aqui seguiremos as regras para nosso banco de dados. Quais tabelas teremos e quais colunas teremos dentro das respectivas tabelas

Criaremos as seguintes tabelas e colunas abaixo: 

-   Funcinarios
    -   id
    -   nome
    -   email (campo único)
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
    -   email (campo único)
    -   cpf (campo único) 
    -   cep 
    -   rua
    -   numero
    -   bairro
    -   cidade
    -   estado
    -   pedidos
    -   id
    -   cliente_id
    -   observacao
    -   valor_total
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

# **Endpoints 1ª Sprint**

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuário quiser listar todas as categorias cadastradas.

As categorias a seguir precisam ser previamente cadastradas para que sejam listadas no endpoint de listagem das categorias.

## **Categorias**

-   Cimento
-   Tijolo
-   Argamassas
-   Pisos e revestimentos
-   Areia
-   Materiais hidráulicos
-   Materiais elétricos
-   Ferramentas em gera
-   Madeiras
-   Impermeabilizantes
-   Paineis e pias 

#### `POST` `/categorias`

Essa é a rota que será utilizada para cadastrar uma nova categoria no sistema.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - descricao
--------------------------------------------------

#### `POST` `/funcionarios`

Essa é a rota que será utilizada para cadastrar um novo funcionário no sistema.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.
------------------------------------------------------

#### `POST` `/login`

Essa é a rota que permite o funcionário cadastrado realizar o login no sistema.

Critérios de aceite:

    - Validar se o e-mail e a senha estão corretos para o usuário em questão.
    - Gerar um token de autenticação para o usuário.
-------------------------------------------------------    

#### `GET` `/funcionario`

Essa é a rota que permite o Funcionário logado a visualizar os dados do seu próprio perfil, de acordo com a validação do token de autenticação.

-------------------------------------------------------    


#### `PUT` `/funcionario`

Essa é a rota que permite o funcioário logado atualizar informações de seu próprio cadastro, de acordo com a validação do token de autenticação.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.
-------------------------------------------------------    


```javascript
Após a conclusão dos endpoint realizar o deploy
```

# **Endpoints 2ª Sprint**

#### `POST` `/produto`

Essa é a rota que permite o funcinário logado cadastrar um novo produto no sistema.

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir.
--------------------------------------------------------

#### `PUT` `/produto/:id`

Essa é a rota que permite o funcionário logado a atualizar as informações de um produto cadastrado.

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.
    -   Validar os campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir.
--------------------------------------------------------


#### `GET` `/produto`

Essa é a rota que será chamada quando o funcionário logado quiser listar todos os produtos cadastrados.

Deveremos incluir um parâmetro do tipo query **categoria_id** para que seja possível consultar produtos por categorias, de modo, que serão filtrados de acordo com o id de uma categoria.

Critérios de aceite:

    - Caso seja enviado o parâmetro do tipo query **categoria_id**, filtrar os produtos de acordo com a categoria, caso o id de categoria informada exista.
    - Caso não seja informado o parâmetro do tipo query **categoria_id** todos os produtos cadastrados deverão ser retornados.
--------------------------------------------------------

#### `GET` `/produto/:id`

Essa é a rota que permite o funcionário logado obter um dos produtos cadastrados.  

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.
--------------------------------------------------------

#### `DELETE` `/produto/:id`

Essa é a rota que será chamada quando o funcionário logado quiser excluir um de seus produtos cadastrados.  

Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.
--------------------------------------------------------

#### `POST` `/cliente`

Essa é a rota que permite o funcionário logado cadastrar um novo cliente no sistema.

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail.
    -   O campo cpf no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf.

# **Endpoints 3ª Sprint**

#### `PUT` `/cliente/:id`

Essa é a rota que permite o funcionário realizar atualização de um cliente cadastrado.

Critérios de aceite:

    -   Validar se existe cliente para o id enviado como parâmetro na rota.
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail.
    -   O campo cpf no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf.
--------------------------------------------------------

#### `GET` `/cliente/:id`

Essa é a rota que será chamada quando o funcionario logado quiser obter um de seus clientes cadastrados.  

Critérios de aceite:

    -   Validar se existe cliente para o id enviado como parâmetro na rota.
--------------------------------------------------------

#### `POST` `/pedido`

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.

**Lembre-se:** Cada pedido deverá conter ao menos um produto vinculado.

**Atenção:** As propriedades produto_id e quantidade_produto devem ser informadas dentro de um array e para cada produto deverá ser criado um objeto neste array, como ilustrado no objeto de requisição abaixo.
Só deverá ser cadastrado o pedido caso todos produtos vinculados ao pedido realmente existão no banco de dados.

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

Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   cliente_id
        -   pedido_produtos
            -   produto_id
            -   quantidade_produto
    -   Validar se existe cliente para o id enviado no corpo (body) da requisição.
    -   Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.
    -   Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.
    -   O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados. 
    -   Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso. 
--------------------------------------------------------

#### `GET` `/pedido`

Essa é a rota que será chamada quando o funcionário logado quiser listar todos os pedidos cadastrados.

Deveremos incluir um parâmetro do tipo query **cliente_id** para que seja possível consultar pedidos por clientes, de modo, que serão filtrados de acordo com o id de um cliente.

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

Critérios de aceite:

    - Caso seja enviado o parâmetro do tipo query **cliente_id**, filtrar os pedidos de acordo com o cliente, caso o id do cliente informado exista.
    - Caso não seja informado o parâmetro do tipo query **cliente_id** todos os pedidos cadastrados deverão ser retornados.
--------------------------------------------------------

