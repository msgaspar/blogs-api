# Projeto Blogs API

Uma API REST feita com Node.js, Express e Sequelize, para gerenciamento de postagens de blogs.
O servidor permite o cadastro e autenticação de usuários (com token JWT), cadastro e listagem de categorias e o gerenciamente e busca de posts.

Projeto feito individualmente como parte do módulo de back-end do curso da Trybe.

## Executando o projeto localmente

#### É necessário ter instalado

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

#### Siga os passos abaixo

```bash
# Clone o repositorio
$ git clone https://github.com/msgaspar/blogs-api.git

# Entre no diretório do projeto:
$ cd blogs-api

# Instale as dependências
$ npm install

# Crie na raiz do projeto um arquivo .env contendo as variáveis de ambiente para conexão com o banco de dados MySQL (MYSQL_USER, MYSQL_PASSWORD e HOSTNAME)
$ touch .env

# Com o banco de dados conectado, prepare as tabelas com o comando:
$ npm run prestart

# Popule o banco de dados com dados de exemplo:
$ npm run seed

# Inicie o servidor:
$ npm start
```
