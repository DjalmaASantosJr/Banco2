// server.js - Back-end com Node.js, Express e Mongoose para MongoDB

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Servir arquivos estáticos como index.html

// Conexão com MongoDB (sem opções depreciadas)
const mongoURI = 'mongodb+srv://djalmav7:djalma1234@banco.p03ag0o.mongodb.net/blogdb?retryWrites=true&w=majority'; // Substitua com sua URI real
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err.message));

// Schema para Posts (documentos NoSQL)
const postSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Título é obrigatório'], minlength: 3 },
  content: { type: String, required: [true, 'Conteúdo é obrigatório'], minlength: 5 },
  createdAt: { type: Date, default: Date.now },
  comments: [{
    content: { type: String, required: [true, 'Comentário não pode ser vazio'], minlength: 1 },
    createdAt: { type: Date, default: Date.now }
  }]
});

// Índice para buscas rápidas no título e conteúdo
postSchema.index({ title: 'text', content: 'text' });

const Post = mongoose.model('Post', postSchema);

// Rotas CRUD para Posts

// CREATE: Criar um novo post
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar post: ' + err.message });
  }
});

// READ: Listar todos os posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar posts: ' + err.message });
  }
});

// READ: Buscar post por ID
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post não encontrado' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar post: ' + err.message });
  }
});

// UPDATE: Atualizar um post
app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updatedPost) return res.status(404).json({ error: 'Post não encontrado' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar post: ' + err.message });
  }
});

// DELETE: Excluir um post
app.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post não encontrado' });
    res.json({ message: 'Post excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir post: ' + err.message });
  }
});

// Extra: Adicionar comentário a um post
app.post('/posts/:id/comments', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Comentário não pode ser vazio' });
    }
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post não encontrado' });
    post.comments.push({ content });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar comentário: ' + err.message });
  }
});

// Exportar dados em JSON
app.get('/export', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao exportar dados: ' + err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});