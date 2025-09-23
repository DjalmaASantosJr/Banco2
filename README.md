# README - Projeto Blog / Mural de Posts com MongoDB

## Descrição
Este é um mini-sistema de blog onde usuários podem criar, ler, atualizar e excluir posts com título e conteúdo. Inclui suporte a comentários aninhados para praticar documentos embutidos no MongoDB. O back-end usa Node.js com Express e Mongoose para interagir com o MongoDB. O front-end é simples com HTML, Bootstrap e JavaScript (fetch para requisições assíncronas). Os dados podem ser exportados como JSON.

## Banco NoSQL Escolhido: MongoDB
- **Por quê?** MongoDB é um banco de documentos (NoSQL), ideal para armazenar posts como documentos JSON flexíveis. Permite esquemas dinâmicos, facilitando a adição de campos como comentários aninhados sem migrações rígidas. Comparado a chave-valor (Redis), documentos permitem estruturas complexas como arrays de comentários. Usamos índices textuais para buscas rápidas em título e conteúdo.
- **Modelagem de Dados:**
  - Coleção: `posts`
  - Documento: { title: String, content: String, createdAt: Date, comments: [{ content: String, createdAt: Date }] }
  - Justificativa: Documentos embutidos para comentários evitam joins (comum em SQL), melhorando performance para leituras frequentes. Índices: { title: 'text', content: 'text' } para buscas textuais eficientes.

## Dependências
- Node.js (v18+)
- MongoDB (local ou Atlas - crie uma conta gratuita em mongodb.com)
- Bibliotecas Node: express, mongoose, cors, body-parser (instale com `npm install express mongoose cors body-parser`)

## Como Rodar
1. Clone o repositório ou crie os arquivos `server.js` e `public/index.html`.
2. No terminal: `npm init -y` e instale dependências.
3. Atualize `mongoURI` em `server.js` com sua string de conexão MongoDB (ex: MongoDB Atlas).
4. Rode o servidor: `node server.js`
5. Acesse no navegador: `http://localhost:3000`
6. Interaja: Crie posts, adicione comentários, edite/exclua, e exporte JSON.

## Funcionalidades
- **CRUD Completo:**
  - Create: Formulário para novo post.
  - Read: Lista todos os posts com comentários.
  - Update: Edite posts existentes.
  - Delete: Exclua posts.
- **Integração Front-End:** Requisições assíncronas via fetch para o back-end.
- **Exportação:** Botão para baixar posts como JSON.
- **Extra:** Comentários aninhados demonstram embedded documents.

## Opcionais Implementados
- Busca textual implícita via índices (pode expandir com rota de busca).
- Interface mínima com Bootstrap.

Para deploy: Use Vercel/Netlify para front-end e back-end, com MongoDB Atlas.