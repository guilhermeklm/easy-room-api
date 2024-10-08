# EspaçoFácil API

API para o projeto EasyRoom - um sistema para gerenciar a reserva de salas e auditórios no Unisenac.

## Índice

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Começar](#como-começar)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Executando a API](#executando-a-api)
- [Endpoints da API](#endpoints-da-api)
  - [Endpoints de Salas](#endpoints-de-salas)
  - [Endpoints de Reservas](#endpoints-de-reservas)

## Visão Geral do Projeto

A API do EasyRoom fornece todos os serviços de backend para gerenciar salas e reservas no Unisenac. Com esta API, os usuários podem:

- Criar e buscar salas.
- Criar reservas de salas.

## Tecnologias Utilizadas

- **Node.js v18.18.2**
- **TypeScript v5.5.4**
- **Express.js v4.19**
- **MongoDB v6.8.1** (Banco de dados)
- **JWT** (para autenticação)
- **mongoose v8.6.1** (interface para mongodb)

## Como Começar

### Pré-requisitos

Para rodar a API localmente, você precisa ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/)

### Instalação

1. Clone o repositório:

    ```bash
    - git clone https://github.com/guilhermeklm/easy-room-api.git
    - cd easy-room-api
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

### Executando a API

1. Inicie o servidor em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

2. A API estará disponível em `http://localhost:3000`.

## Endpoints da API

### Endpoints de Salas

- **GET /rooms** - Recupera uma lista de salas disponíveis.
- **POST /rooms** - Cria uma nova sala.

### Endpoints de Reservas

- **POST /reservations** - Cria uma nova reserva.
