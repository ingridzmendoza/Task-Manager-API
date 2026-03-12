const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// servir archivos del frontend
app.use(express.static(path.join(__dirname, "..")));

const SECRET = "cybersecretkey";

// usuario de prueba
const users = [
    {
        id: 1,
        username: "admin",
        password: bcrypt.hashSync("1234", 8)
    },
    {
        id: 2,
        username: "vxndett",
        password: bcrypt.hashSync("1234", 8)
    }
];

// LOGIN - generar JWT
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ message: "User not found" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

// middleware para verificar JWT
function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token." });

        req.user = user;
        next();
    });
}

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

// GET - obtener todas las tasks (protegido)
app.get("/tasks", authenticateToken, (req, res) => {
    res.json(tasks);
});

// POST - crear nueva task (protegido)
app.post("/tasks", authenticateToken, (req, res) => {
    const { title, completed } = req.body;

    const newTask = {
        id: nextId++,
        title,
        completed
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// DELETE - eliminar task (protegido)
app.delete("/tasks/:id", authenticateToken, (req, res) => {
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