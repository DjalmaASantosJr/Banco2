const API_URL = "http://localhost:5000/tasks";

// --- Funções de Tarefas ---
async function carregarTarefas() {
  const statusFiltro = document.getElementById("filtroStatus").value;
  const prioridadeFiltro = document.getElementById("filtroPrioridade").value;
  const query = new URLSearchParams();
  if(statusFiltro) query.append("status", statusFiltro);
  if(prioridadeFiltro) query.append("prioridade", prioridadeFiltro);

  const res = await fetch(`${API_URL}?${query.toString()}`);
  const tarefas = await res.json();

  const ul = document.getElementById("tarefas");
  ul.innerHTML = "";

  let pendentes = 0;
  let concluidas = 0;

  tarefas.forEach(t => {
    if(t.status === "pendente") pendentes++;
    if(t.status === "concluída") concluidas++;

    const li = document.createElement("li");
    li.className = t.status === "concluída" ? "completed" : "";

    let corPrioridade = "#333";
    if(t.prioridade === "Baixa") corPrioridade = "green";
    if(t.prioridade === "Média") corPrioridade = "orange";
    if(t.prioridade === "Alta") corPrioridade = "red";

    li.innerHTML = `
      <div class="task-info">
        <strong style="color:${corPrioridade}">${t.titulo}</strong> [${t.prioridade}] - ${t.status}
        <span>Criada em: ${new Date(t.dataCriacao).toLocaleString()}</span>
        ${t.status === "concluída" ? `<span>Concluída em: ${new Date(t.dataConclusao).toLocaleString()}</span>` : ""}
        ${t.descricao ? `<span>Descrição: ${t.descricao}</span>` : ""}
      </div>
      <div class="task-buttons">
        <button onclick="alternarStatus('${t._id}', '${t.status}')">
          ${t.status === "pendente" ? "Concluir" : "Desfazer"}
        </button>
        <button onclick="deletarTarefa('${t._id}')">Excluir</button>
      </div>
    `;
    ul.appendChild(li);
  });

  document.getElementById("pendentes").innerText = `Pendentes: ${pendentes}`;
  document.getElementById("concluidas").innerText = `Concluídas: ${concluidas}`;
}

async function criarTarefa() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const prioridade = document.getElementById("prioridade").value;
  if(!titulo) return alert("Digite o título");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descricao, prioridade })
  });

  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  carregarTarefas();
}

async function alternarStatus(id, statusAtual) {
  let novoStatus = statusAtual === "pendente" ? "concluída" : "pendente";
  let dataConclusao = novoStatus === "concluída" ? new Date() : null;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: novoStatus, dataConclusao })
  });
  carregarTarefas();
}

async function deletarTarefa(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  carregarTarefas();
}

async function exportarJSON() {
  window.open("http://localhost:5000/export", "_blank");
}

const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeIcon = document.getElementById("darkModeIcon");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if(document.body.classList.contains("dark-mode")) {
    darkModeIcon.classList.remove("fa-moon");
    darkModeIcon.classList.add("fa-sun");
  } else {
    darkModeIcon.classList.remove("fa-sun");
    darkModeIcon.classList.add("fa-moon");
  }
});

carregarTarefas();