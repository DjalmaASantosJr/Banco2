Lista de Tarefas - Projeto NoSQL
Rodando o Projeto
Clone o repositório: git clone <URL_DO_REPOSITORIO>

Backend:

Entre na pasta do backend: cd backend
Instale as dependências: npm install
Configure a conexão com o MongoDB no arquivo server.js. Exemplo de URI: mongodb+srv://usuario:senha@cluster0.mongodb.net/nome_do_banco?retryWrites=true&w=majority
Inicie o backend: npm start
Frontend:

Em outra aba do terminal, entre na pasta do frontend: cd ../frontend
Instale as dependências (se houver): npm install
Abra o arquivo index.html no navegador ou rode com um servidor local: http://localhost:3000 (ou abrindo o HTML diretamente)
Acesse a aplicação no navegador e utilize normalmente a lista de tarefas.

Dependências
Node.js
Express (backend)
MongoDB Atlas
Mongoose (backend)
Cors (backend)
React ou HTML/CSS/JS puro no frontend
Font Awesome (frontend)
Configuração do Banco
MongoDB Atlas: Cluster gratuito, database todolist, collections conforme definido no backend (Tarefa).
As tarefas possuem campos: titulo, descricao, prioridade, status, dataCriacao e dataConclusao.
Funcionalidades
Criar, editar e deletar tarefas
Filtrar tarefas por status e prioridade
Contador de tarefas pendentes e concluídas
Exportar todas as tarefas em JSON
Modo escuro/claridade alternável