# PurrShell – Task Manager API

PurrShell es un administrador de tareas con temática **cyberpunk y un asistente felino**, desarrollado como práctica para crear una **API REST utilizando Node.js y Express**.

La aplicación permite:
- Ver tasks
- Crear nuevas tasks
- Eliminar tasks existentes

Las tareas se almacenan **temporalmente en memoria**, por lo que se reinician al detener el servidor.

- Página hosteada en GitHub Pages: [PurrShell - Task Manager](https://ingridzmendoza.github.io/Task-Manager-API/)

---

# Tecnologías

- Node.js
- Express
- JavaScript
- HTML / CSS

---

# Endpoints de la API

**GET /tasks**
Obtiene todas las tareas.

**POST /tasks**
Crea una nueva tarea.

**DELETE /tasks/:id**
Elimina una tarea por su ID.

---

# Ejecutar el proyecto localmente

**1. Clonar el repositorio**

```bash
git clone https://github.com/ingridzmendoza/Task-Manager-API.git
```

**2. Entrar a la carpeta del proyecto**

```bash
cd \TaskManager\
```

**3. Instalar dependencias**

```bash
npm install
```

**4. Ejecutar el servidor**

```bash
node js/server.js
```

**Nota -** El servidor se ejecutará en:

```bash
http://localhost:3000
```

**5. Abre el archivo `index.html` desde tu navegador.**

