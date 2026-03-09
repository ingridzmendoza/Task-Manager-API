const API_URL = "/tasks";

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// cargar tasks al iniciar
document.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    renderTasks(tasks);
}

function renderTasks(tasks) {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    tasks.forEach(task => {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
        textSpan.textContent = task.title;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// agregar task
async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value;

    if (!title) return;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            completed: false
        })
    });

    input.value = "";
    loadTasks();
}

// borrar task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}