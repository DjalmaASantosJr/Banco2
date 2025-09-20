const apiUrl = "http://localhost:3000/api/posts";

const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const addPostBtn = document.getElementById("addPostBtn");
const postList = document.getElementById("postList");

// Carregar posts
async function loadPosts() {
    postList.innerHTML = "";
    const res = await fetch(apiUrl);
    const posts = await res.json();

    posts.forEach(post => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        const title = document.createElement("h5");
        title.textContent = post.title;

        const content = document.createElement("p");
        content.textContent = post.content;

        const btns = document.createElement("div");

        // Botão editar
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.className = "btn btn-warning btn-sm me-2";
        editBtn.onclick = async () => {
            const newTitle = prompt("Novo título:", post.title);
            const newContent = prompt("Novo conteúdo:", post.content);
            if (newTitle && newContent) {
                await fetch(`${apiUrl}/${post._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: newTitle, content: newContent })
                });
                loadPosts();
            }
        };

        // Botão deletar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.onclick = async () => {
            await fetch(`${apiUrl}/${post._id}`, { method: "DELETE" });
            loadPosts();
        };

        btns.appendChild(editBtn);
        btns.appendChild(deleteBtn);

        li.appendChild(title);
        li.appendChild(content);
        li.appendChild(btns);

        postList.appendChild(li);
    });
}

// Adicionar novo post
addPostBtn.onclick = async () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) return;

    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    titleInput.value = "";
    contentInput.value = "";
    loadPosts();
};

// Inicializar
loadPosts();
