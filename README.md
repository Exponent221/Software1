# API REST de Tareas con autenticación JWT
## Alumno: Aldo Tomás Mundo Carrillo
Backend desarrollado en **Node.js** y **Express**.La API permite registrar usuarios, iniciar sesión obteniendo un JWT(JSON Web Token) y administrar un CRUD de tareas protegido por medio de un **Bearer Token**. Cada usuario solo puede ver, modificar y eliminar sus propias tareas.

## Cómo funciona la seguridad

- Las rutas protegidas pasan por el middleware `protect`, que valida el token JWT. Sin token o con un token inválido, la API responde **401 Unauthorized**.
- El id del usuario se obtiene siempre del token (`req.user.id`), nunca del body ni de la URL.
- Cada tarea guarda el id de su dueño y todas las consultas se filtran por ese id. Si un usuario intenta modificar o eliminar una tarea que no es suya, la API responde con error y la tarea no cambia.
- Las contraseñas se guardan cifradas con bcrypt.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Exponent221/Software1.git
   cd Software1/backend
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` dentro de la carpeta `backend/`  y llenar los valores:

   ```bash
   cp ../.env.example .env
   ```

   | Variables de .env     | Descripción                                          |
   |-----------------------|------------------------------------------------------|
   | `PORT`                | Puerto del servidor (por defecto 5000)               |
   | `MONGO_DB`            | Cadena de conexión de MongoDB Atlas                  |
   | `NODE_ENV`            | `development` o `production`                         |
   | `JWT_SECRET`          | Cadena secreta para firmar los tokens                |


## Ejecución

Desde la carpeta `backend/`:

```bash
npm run server   # modo desarrollo, se reinicia con cada cambio (nodemon)
npm start        # modo normal
```

Si todo está bien, la terminal mostrará:

```
Servidor iniciado en el puerto 5000
MongoDB connected: ...
```

## Endpoints

URL base: `http://localhost:5000`

### Usuarios (`/api/users`)

| Método | Ruta                | Descripción                                   | ¿Requiere token? |
|--------|---------------------|-----------------------------------------------|------------------|
| POST   | `/api/users`        | Registrar un usuario                          | No               |
| POST   | `/api/users/login`  | Iniciar sesión y obtener el token JWT         | No               |
| GET    | `/api/users/datos`  | Obtener los datos del usuario dueño del token | Sí               |

### Tareas (`/api/tareas`)

| Método | Ruta               | Descripción                                    | ¿Requiere token? |
|--------|--------------------|------------------------------------------------|------------------|
| GET    | `/api/tareas`      | Listar las tareas del usuario autenticado      | Sí               |
| POST   | `/api/tareas`      | Crear una tarea asignada al usuario autenticado| Sí               |
| PUT    | `/api/tareas/:id`  | Modificar una tarea propia                     | Sí               |
| DELETE | `/api/tareas/:id`  | Eliminar una tarea propia                      | Sí               |
