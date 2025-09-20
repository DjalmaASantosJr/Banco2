const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api/posts", postRoutes);

// Conectar MongoDB
mongoose.connect("mongodb+srv://djalmav7:DJ@lma1234@banco.p03ag0o.mongodb.net/todolist?retryWrites=true&w=majority"
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error(err));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
