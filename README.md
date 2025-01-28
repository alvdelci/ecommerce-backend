# Ecommerce Backend

Instruções para a configuração e utilização do projeto

## Pré-requisitos

- Node.js
- YARN (com o NPM instalado por padrão pelo Node.js, basta executar o comando npm install -g yarn)
- MongoDB (recomendo utilizar no docker (https://hub.docker.com/_/mongo))
- Redis (recomendo utilizar no docker (https://hub.docker.com/_/redis))
- Obs.: Para utilizar o Mongo e o Redis no docker será necessário baixar e configurar o docker (https://www.docker.com)

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url do repositório>
   cd ecommerce-backend
   ```

2. Instale as dependências

   ```bash
   yarn
   ```

3. Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias.
   **Obs.: Substitua "user" e "password" pelos usuários e senhas que você configurou na aplicação (ou no container, se estiver utilizando o docker)**

   ```bash
   MONGO_URL=mongodb://<user>:<password>@localhost:27017/ecommerce?authSource=admin
   MONGO_URL_TEST=mongodb://<user>:<password>@localhost:27017/ecommerce-test?authSource=admin
   REDIS_URL=redis://default:<password>@localhost:6379
   ```

## Executando a Aplicação

1. Inicie o servidor

   ```bash
   yarn dev
   ```

2. A API estará disponível na url http://localhost:3333/

## Estrutura do projeto

- **index.js**: Arquivo principal da api que configura o framework express e outras ferramentas
- **src/server.js**: Arquivo que inicializa o servidor e outras ferramentas
- **src/schemas**: Contém os modelos de dados.
- **src/routes**: Contém as definições de rotas da API.
- **src/controllers**: Contém os controladores que recebem a solicitação http, lidam com a lógica de negócios e enviam a resposta ao cliente.
- **src/services**: Contém os serviços que executam ações no banco de dados e fazem a ponte entre o banco de dados e os controladores.
- **src/middlewares**: Contém os middleware utilizados nas rotas.
- **src/db**: Contém as configurações da conexão do banco de dados.
- **src/cache**: Contém as configurações da conexão com o Redis e as funções get e set de dados no cache
- **test/unit/controllers**: Contém os testes unitário dos controladores
- **test/unit/services**: Contém os testes unitários dos services

## Endpoints do Projeto

### Produtos

- **POST /api/product**: Cria um novo produto.
- **GET /api/product**: Lista todos os produtos.
- **GET /api/product/:id**: Obtém os detalhes de um produto específico.

### Carrinho

- **POST /api/cart**: Adiciona um item ao carrinho.
- **GET /api/cart/:id**: Obtém as informações do carrinho
- **DELETE /api/cart**: Remove um carrinho

### Cliente

- **POST /api/customer**: Adiciona um client
- **GET /api/customer/:id**: Obtém os dados de um client específico

## Testes

1. Executar os testes unitários
    ```bash
    yarn test
    ```
