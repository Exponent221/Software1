# API REST de Tareas con autenticación JWT

Backend desarrollado en **Node.js** y **Express** para la materia de Ingeniería de Software (Universidad Anáhuac Mayab).

La API permite registrar usuarios, iniciar sesión obteniendo un **token JWT** y administrar un CRUD de tareas protegido con **Bearer Token**. Cada usuario solo puede ver, modificar y eliminar sus propias tareas.

## Tecnologías

- Node.js y Express
- MongoDB Atlas con Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcrypt para el cifrado de contraseñas
- dotenv para las variables de entorno
- nodemon para el desarrollo

## Estructura del proyecto

```
backend/
├── backend/
│   ├── config/         # Conexión a MongoDB
│   ├── controllers/    # Lógica de usuarios y tareas
│   ├── middleware/     # Autenticación (protect) y manejo de errores
│   ├── models/         # Modelos de Mongoose (User, Tarea)
│   ├── routes/         # Rutas de usuarios y tareas
│   └── server.js       # Punto de entrada
├── package.json
└── .gitignore
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Exponent221/Software1.git
   cd Software1/backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea el archivo `.env` dentro de la carpeta `backend/` a partir de `.env.example` (ubicado en la raíz del repositorio) y llena los valores:

   ```bash
   cp ../.env.example .env
   ```

   | Variable     | Descripción                                          |
   |--------------|------------------------------------------------------|
   | `PORT`       | Puerto del servidor (por defecto 5000)               |
   | `MONGO_DB`   | Cadena de conexión de MongoDB Atlas                  |
   | `NODE_ENV`   | `development` o `production`                         |
   | `JWT_SECRET` | Cadena secreta para firmar los tokens                |

   > El archivo `.env` nunca debe subirse al repositorio; ya está incluido en `.gitignore`.

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

### Ejemplos de uso

**Registro** (`POST /api/users`)

```json
{ "nombre": "Pedro", "email": "pedro@correo.com", "password": "123456" }
```

**Login** (`POST /api/users/login`)

```json
{ "email": "pedro@correo.com", "password": "123456" }
```

La respuesta incluye el campo `token`, que debe enviarse en las rutas protegidas con el header:

```
Authorization: Bearer <token>
```

**Crear o modificar una tarea** (`POST /api/tareas`, `PUT /api/tareas/:id`)

```json
{ "descripcion": "Entregar la práctica de backend" }
```

## Seguridad

- Las rutas protegidas pasan por el middleware `protect`, que valida el token JWT. Sin token o con un token inválido, la API responde **401 Unauthorized**.
- El id del usuario se obtiene siempre del token (`req.user.id`), nunca del body ni de la URL.
- Cada tarea guarda el id de su dueño y todas las consultas se filtran por ese id. Si un usuario intenta modificar o eliminar una tarea que no es suya, la API responde con error y la tarea no cambia.
- Las contraseñas se guardan cifradas con bcrypt.

## Autor

Tomás Mundo Carrillo
