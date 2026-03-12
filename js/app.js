const API_URL = "/tasks";

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const loginPanel = document.getElementById("loginPanel");
const taskPanel = document.getElementById("taskPanel");

// cargar tasks al iniciar

document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    if (token) {
        loginPanel.style.display = "none";
        taskPanel.style.display = "block";
        loadTasks();
    }

});

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

async function loadTasks() {

    try {

        const response = await fetch(API_URL, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            renderTasks([]); // show empty state
            return;
        }

        const tasks = await response.json();

        if (!Array.isArray(tasks)) {
            renderTasks([]);
            return;
        }

        renderTasks(tasks);

    } catch (error) {

        console.error("Task loading failed:", error);
        renderTasks([]);

    }

}

function renderTasks(tasks) {

    taskList.innerHTML = "";

    if (!Array.isArray(tasks) || tasks.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

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
        headers: getAuthHeaders(),
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
        method: "DELETE",
        headers: getAuthHeaders()
    });

    loadTasks();
}

// login
async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const message = document.getElementById("authMessage");

    if (!response.ok) {
        message.textContent = "AUTH ERROR: Invalid credentials";
        return;
    }

    message.textContent = "";

    const data = await response.json();

    localStorage.setItem("token", data.token);

    loginPanel.style.display = "none";
    taskPanel.style.display = "block";

    loadTasks();
}

//logout
function logout() {

    localStorage.removeItem("token");

    taskPanel.style.display = "none";
    loginPanel.style.display = "block";

}