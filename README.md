# JavaScript Notes API - Backend 🖥️

## 📋 Descrição

A **JavaScript Notes API** é o backend da aplicação **JavaScript Notes**, que permite aos usuários criar e gerenciar notas pessoais. Esta API gerencia a autenticação, o armazenamento de dados e a comunicação com o frontend da aplicação. É construída com Node.js e utiliza Express para o gerenciamento das rotas e Mongoose para interagir com o banco de dados MongoDB.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework para criar APIs e gerenciar rotas.
- **Mongoose**: Biblioteca para modelar dados e interagir com o MongoDB.
- **Axios**: Cliente HTTP para realizar requisições à APIs externas, se necessário.
- **bcrypt**: Biblioteca para hashing de senhas e autenticação.
- **jsonwebtoken**: Para gerar e verificar tokens JWT.
- **dotenv**: Para gerenciar variáveis de ambiente.
- **cors**: Para habilitar CORS (Cross-Origin Resource Sharing).
- **morgan**: Middleware de logging de requisições HTTP.
- **node-fetch**: Para realizar requisições HTTP, se necessário.

## Recursos

- Autenticação de usuários com JWT.
- Armazenamento e gerenciamento de notas.
- Conexão com banco de dados MongoDB.
  
## 📋 Requisitos

- Node.js (versão 20.x)
- npm (ou yarn)

## 🚀 Instalação

## 📥 Clone o repositório

```bash
git clone https://github.com/seu-usuario/javascript_note_api.git
```
## 📂 Navegue para o diretório do projeto

```bash
cd javascript_note_api
```
## 📦 Instale as dependências

Usando npm:

```bash
npm install
```

ou, se estiver usando yarn:

```bash
yarn install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

    ```env
    MONGODB_URI=SuaUriDoMongoDBAqui
    JWT_SECRET=SeuSecretJWTAqui
    ```

2. Substitua SuaUriDoMongoDBAqui pela URI de conexão com o MongoDB.
3. Substitua SeuSecretJWTAqui pela chave secreta para assinatura de tokens JWT.

## 🚀 Uso

1. Inicie o servidor de desenvolvimento:

    Usando npm:

    ```bash
    npm run dev
    ```

    ou, se estiver usando yarn:

    ```bash
    yarn run dev
    ```

## Scripts

- **start**: 🖥️ Inicia o servidor em modo de produção.
- **dev**: 🧪 Inicia o servidor em modo de desenvolvimento com nodemon.
- **build**: 📦 (Não aplicável para esta aplicação, já que não há construção de frontend).

## Contribuição

1. 🍴 Faça um fork deste repositório.
2. 🌿 Crie uma nova branch (`git checkout -b minha-feature`).
3. 💻 Faça suas alterações e commite-as (`git commit -am 'Adiciona nova feature'`).
4. 📤 Envie suas alterações para o repositório remoto (`git push origin minha-feature`).
5. 🔄 Abra um Pull Request para a branch principal do projeto.

## Licença

📜 Este projeto está licenciado sob a Licença MIT.

## Contato

📧 Wallace - [wallacesantanak0@gmail.com](mailto:wallacesantanak0@gmail.com)  
🐙 GitHub: [wallacemt](https://github.com/wallacemt)
