const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
    {
        id: 1,
        title: "Review Docker Compose Documentation",
        completed: false
    }
];

let nextId = 2;

// GET - obtener todas las tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// POST - crear nueva task
app.post("/tasks", (req, res) => {
    const { title, completed } = req.body;

    const newTask = {
        id: nextId++,
        title,
        completed
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// DELETE - eliminar task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);

    res.json({ message: "Task has been deleted." });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});