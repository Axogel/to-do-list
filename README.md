## 📂 Estructura del Proyecto


├── api-backend/ # Servidor Express con Sequelize y conexión a PostgreSQL
├── frontend/ # Aplicación React con TypeScript y autenticación
├── docker-compose.yml # Orquestador principal de los contenedores
└── .env # Variables de entorno del proyecto


### 🔙 Backend (`/api-backend`)
- Node.js + Express
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- Docker

### 💻 Frontend (`/frontend`)
- React + TypeScript
- Axios + Context API
- TailwindCSS
- Docker


### Ejecucion del proyecto

1. tener docker instalado
2.crear .env

### estructura del .env


JWT_SECRET=4f8B5cD3X@t7Pq2Ew9Jz1Yg6Hk0M

#backend

PORT=3000
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=miapi
DB_PORT=5433

#frontend

FRONTEND_PORT=8080
API_URL=http://localhost:3000

### Al finalizar

correr el comando docker compose up --build
