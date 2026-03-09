const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// servir archivos del frontend
app.use(express.static(path.join(__dirname, "..")));

let tasks = [
    { id: 1, title: "Patch NeonPaws Security Firewall", completed: false },
    { id: 2, title: "Review Docker Compose Documentation", completed: false },
    { id: 3, title: "Deploy Node.js API to the Cyber Grid", completed: false },
    { id: 4, title: "Optimize Task Database Indexes", completed: false },
    { id: 5, title: "Run System Diagnostics for AI Assistant", completed: false },
    { id: 6, title: "Calibrate CyberCat Navigation Sensors", completed: false },
    { id: 7, title: "Scan Network for Rogue Processes", completed: false },
    { id: 8, title: "Backup Task Logs to Secure Server", completed: false },
    { id: 9, title: "Upgrade Neon UI Interface Modules", completed: false },
    { id: 10, title: "Feed the Cyber Cat AI (Critical)", completed: false }
];

let nextId = 11;

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

// ruta principal para cargar index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

// puerto compatible con Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});