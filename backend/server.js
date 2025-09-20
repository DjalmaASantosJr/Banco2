const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://djalmav7:djalma1234@banco.p03ag0o.mongodb.net/todolist?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Atlas conectado"))
.catch(err => console.error("Erro na conexão:", err));


const tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  prioridade: { type: String, enum: ["Baixa", "Média", "Alta"], default: "Média" },
  status: { type: String, enum: ["pendente", "concluída"], default: "pendente" },
  dataCriacao: { type: Date, default: Date.now },
  dataConclusao: Date
});


const Tarefa = mongoose.model("Tarefa", tarefaSchema);


app.get("/tasks", async (req, res) => {
  const tarefas = await Tarefa.find().sort({ dataCriacao: -1 });
  res.json(tarefas);
});

app.post("/tasks", async (req, res) => {
  const tarefa = new Tarefa(req.body);
  await tarefa.save();
  res.json(tarefa);
});

app.put("/tasks/:id", async (req, res) => {
  if (req.body.status === "concluída") req.body.dataConclusao = new Date();
  const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tarefa);
});

app.delete("/tasks/:id", async (req, res) => {
  await Tarefa.findByIdAndDelete(req.params.id);
  res.json({ message: "Tarefa removida" });
});

app.get("/export", async (req, res) => {
  const tarefas = await Tarefa.find();
  res.setHeader("Content-Disposition", "attachment; filename=tarefas.json");
  res.json(tarefas);
});

app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));