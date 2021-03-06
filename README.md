# Cashback

## Descrição

As API's do sistema Cashback foi desenvolvida utilizando NodeJS com o framework NestJS.

O Banco de dados utilizado foi o mongoDB, a base de dados está na nuvem.

Exemplo registro no BD:

<img src="https://github.com/theusFalconde/cashback/blob/master/public/exemplo_registro.png?raw=true" alt="Exemplo Registro" />


## API

Os endpoints estão mapeados utilizando o Swagger, que pode ser acessado pelo link (http://localhost:3000/api)

Algumas rotas estão protegidas por JWT, para ter acesso é necessário realizar o login e obter o token.

A rota para deletar uma Venda está protegida e só pode ser acessada por um usuário com perfil de admin, como não é possível criar um usuário com esse perfil utilize esse usuário:

### email: admin@cashback.com

### senha: senha01


## Instalação

É necessário ter instalado o python, pois uma das bibliotecas do projeto utiliza dele para ser instalada.

```bash
$ npm install
```

## Rodando o app

```bash
# Desenvolvimento
$ npm run start

# Desenvolvimento com watch
$ npm run start:dev

# Produção
$ npm run start:prod
```