 # CRUD Completo com Node.js e Prisma

Este é um projeto de CRUD (Create, Read, Update, Delete) completo desenvolvido com Node.js e Prisma. O projeto demonstra como gerenciar dados em uma aplicação web, utilizando um banco de dados relacional. O front-end foi construído utilizando Tailwind CSS.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org) (versão LTS recomendada)
- [NPM](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)

Ao ter o `Node.js` e o `NPM` instalado, abra o terminal na pasta `backend` e digite [ `npm install` ],
após digite `npm start`, e abra o arquivo `index.html` da pasta frontend com a extensão do VScode chamada `Live Server`.

## Configuração do Ambiente

Para executar este projeto, você precisará configurar algumas variáveis de ambiente. Você pode criar um arquivo `.env` na pasta `backend` do projeto e incluir as seguintes variáveis:

```dotenv
SECRET=<sua_chave_secreta>
PORT=<porta_opcional>
DATABASE_URL=<sua_string_de_conexão>
