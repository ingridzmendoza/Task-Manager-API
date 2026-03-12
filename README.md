# PurrShell – Task Manager API

PurrShell es un administrador de tareas con temática **cyberpunk y un asistente felino**, desarrollado como práctica para crear una **API REST utilizando Node.js y Express**.

La aplicación permite:
- Autenticación de usuarios mediante login
- Ver tasks
- Crear nuevas tasks
- Eliminar tasks existentes

Las tareas se almacenan **temporalmente en memoria**, por lo que se reinician al detener el servidor.

- Página hosteada en Render: [PurrShell - Task Manager](https://task-manager-api-1-tswl.onrender.com)

---

# Tecnologías

- Node.js
- Express
- JSON Web Tokens (JWT)
- JavaScript
- HTML / CSS

---
# Autenticación

El sistema implementa **autenticación basada en JWT**.

Flujo de autenticación:

1. El usuario introduce sus credenciales en la interfaz.
2. El cliente envía una petición `POST /login`.
3. El servidor valida las credenciales y genera un **JWT**.
4. El token se guarda en el navegador utilizando `localStorage`.
5. Las peticiones a rutas protegidas incluyen el header: `Authorization: Bearer TOKEN`
6. El servidor valida el token antes de permitir el acceso a los endpoints protegidos.


---

# Endpoints de la API

**POST /login**
Autentica al usuario y devuelve un **JWT**.

**GET /tasks**
Obtiene todas las tareas.
Ruta protegida que requiere autenticación.

**POST /tasks**
Crea una nueva tarea.
Ruta protegida.

**DELETE /tasks/:id**
Elimina una tarea por su ID.
Ruta protegida.

---

# Consideraciones de Seguridad

Para esta práctica el token JWT se almacena en **localStorage**, lo cual permite una implementación sencilla del flujo de autenticación en el cliente.

Sin embargo, este método presenta posibles vulnerabilidades frente a **ataques XSS (Cross-Site Scripting)**, ya que scripts maliciosos podrían acceder al token almacenado en el navegador.

En entornos de producción se recomienda utilizar **cookies httpOnly**, las cuales no pueden ser accedidas por JavaScript del lado del cliente, reduciendo así el riesgo de robo de tokens.

Otras mejoras de seguridad que podrían implementarse incluyen:

- expiración corta de tokens
- uso de refresh tokens
- sanitización de entradas del usuario
- implementación de políticas **Content Security Policy (CSP)**

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

---

# Usuarios de prueba

Para probar el flujo de autenticación JWT puedes utilizar los siguientes usuarios:

| Usuario | Contraseña |
|-------|-----------|
| admin | 1234 |
| vxndett | 1234 |

Estos usuarios permiten validar:

- el proceso de **login**
- la generación de **JWT**
- el acceso a **endpoints protegidos**
- el funcionamiento del **task manager autenticado**

Si las credenciales son incorrectas, el servidor devolverá un **401 Unauthorized** y no permitirá acceder a las rutas protegidas.