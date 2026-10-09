# Eventify 

**Eventify** es una plataforma web FullStack moderna para la exploración, reserva y gestión de eventos, escenarios (*venues*) y compra de boletería digital (*tickets*), con control de acceso basado en roles (**RBAC**), autenticación segura mediante **JWT**, analíticas interactivas y mapas georreferenciados.

---

## Arquitectura del Sistema

El proyecto está estructurado como una arquitectura FullStack desacoplada en capas:

```text
                                  🌐 NAVEGADOR / CLIENTE
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
             [ Frontend: Vue 3 SPA ]                     [ Backend: NestJS API ]
             ├── Composition API & Pinia                 ├── Controllers & DTOs
             ├── Vue Router & Access Control             ├── JwtAuthGuard & RolesGuard
             ├── Axios HTTP + Interceptor                ├── Services & Validators
             └── Tailwind CSS & Chart.js                 └── TypeORM Data Mapper
                                                                   │
                                                                   ▼
                                                         [ SQLite Database ]
                                                         (database.sqlite)
```

---

## 🛠️ Tecnologías y Herramientas

### ⚙️ Backend
- **[NestJS](https://nestjs.com/)** — Framework modular progresivo para Node.js.
- **[TypeScript](https://www.typescriptlang.org/)** — Tipado estático estricto.
- **[TypeORM](https://typeorm.io/)** — Object-Relational Mapping (ORM) con patrón Data Mapper.
- **[SQLite3](https://www.sqlite.org/)** — Base de datos relacional ligera y persistente.
- **[Passport JWT](http://www.passportjs.org/)** — Estrategia de autenticación y autorización segura basada en tokens.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** — Hasheo seguro de contraseñas con salt rounds.
- **[Class-Validator & Class-Transformer](https://github.com/typestack/class-validator)** — Validación automática de DTOs en tiempo de ejecución.
- **Database Seeding** — Poblado automático de datos de prueba al iniciar la aplicación (`SeedService`).

### 🖥️ Frontend
- **[Vue 3](https://vuejs.org/)** — Composition API con sintaxis `<script setup>`.
- **[Vite](https://vitejs.dev/)** — Entorno de desarrollo y empaquetador ultrarrápido.
- **[Pinia](https://pinia.vuejs.org/)** — Store reactivo centralizado con persistencia en `localStorage`.
- **[Vue Router](https://router.vuejs.org/)** — Enrutamiento del cliente con guardianes de navegación por rol.
- **[Tailwind CSS](https://tailwindcss.com/)** — Diseño responsive y estilo Glassmorphism.
- **[Axios](https://axios-http.com/)** — Cliente HTTP con interceptores automáticos para Bearer Tokens.
- **[Chart.js](https://www.chartjs.org/)** — Gráficos estadísticos de ventas e ingresos en tiempo real.
- **[Leaflet](https://leafletjs.com/)** — Mapas interactivos con geolocalización de venues.

### DevOps y Despliegue
- **[Docker](https://www.docker.com/)** — Contenedores con *Multi-stage builds* para imágenes ligeras de producción.
- **[Docker Compose](https://docs.docker.com/compose/)** — Orquestación de contenedores (`frontend` + `backend`) y volúmenes persistentes.
- **[Nginx Alpine](https://www.nginx.com/)** — Servidor web de producción de alto rendimiento para la SPA.
- **[Google Cloud Platform (GCP)](https://cloud.google.com/)** — Despliegue en Máquinas Virtuales Compute Engine.

---

## Estructura del Proyecto

```text
eventify/
├── backend/                             # API REST en NestJS
│   ├── src/
│   │   ├── auth/                       # Módulo de Autenticación (JWT, Guards, Strategies, Decorators)
│   │   ├── database/seeds/             # Servicio de inicialización y datos de prueba (SeedService)
│   │   ├── events/                     # Módulo de Eventos (CRUD, DTOs, Entidades)
│   │   ├── tickets/                    # Módulo de Tickets y Analíticas de Venta
│   │   ├── users/                      # Módulo de Usuarios y Roles
│   │   ├── venues/                     # Módulo de Escenarios y Ubicaciones
│   │   ├── app.module.ts               # Módulo raíz y configuración global
│   │   └── main.ts                     # Bootstrap, CORS, Pipes y Prefijo /api
│   ├── Dockerfile                      # Multi-stage Dockerfile para backend
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                            # Single Page Application en Vue 3
│   ├── src/
│   │   ├── assets/                     # Estilos globales y recursos multimedia
│   │   ├── components/                 # Componentes reutilizables (EventCard, Map, Charts)
│   │   ├── dtos/                       # Data Transfer Objects (DTOs) en TypeScript
│   │   ├── interfaces/                 # Contratos e interfaces del dominio
│   │   ├── router/                     # Enrutador y control de acceso (accessControl.ts)
│   │   ├── services/                   # Servicios HTTP (AuthService, BaseService, UserService, etc.)
│   │   ├── stores/                     # Pinia Stores (authstore.ts)
│   │   ├── utils/                      # Funciones utilitarias y formateadores
│   │   ├── views/                      # Vistas públicas y panel de administración
│   │   ├── App.vue                     # Componente principal
│   │   └── main.ts                     # Entrada y configuración de plugins
│   ├── Dockerfile                      # Multi-stage Dockerfile con Nginx
│   ├── nginx.conf                      # Configuración de Nginx para SPA fallback
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml                   # Orquestación de frontend, backend y volumen SQLite
├── deploy.sh                            # Script de despliegue en Google Cloud VM
```

---

## Requisitos Previos

- **[Git](https://git-scm.com/)**
- **[Node.js](https://nodejs.org/)** `>= 20.x` (Recomendado `22.x` o superior)
- **[Docker & Docker Compose](https://www.docker.com/)** *(Opcional para ejecución contenerizada)*

Verifica tus versiones con:
```sh
node --version
npm --version
docker --version
```

---

## Instalación y Ejecución Local (Desarrollo)

### 1. Clonar el repositorio
```sh
git clone https://github.com/mcarrasqub/eventify.git
cd eventify
```

### 2. Configurar y levantar el Backend

```sh
cd backend

# 1. Crear archivo .env basado en el ejemplo
cp .env.example .env

# 2. Instalar dependencias
npm install

# 3. Iniciar el backend en modo desarrollo
npm run start:dev
```
> El backend quedará disponible en: [`http://localhost:3000/api`](http://localhost:3000/api)  
> Al iniciar por primera vez, `SeedService` sembrará automáticamente los datos de prueba en `database.sqlite`.

---

### 3. Configurar y levantar el Frontend

En una nueva terminal:

```sh
cd frontend

# 1. Crear archivo .env
cp .env.example .env

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo de Vite
npm run dev
```
> El frontend quedará disponible en: [`http://localhost:5173`](http://localhost:5173)

---

## Credenciales de Prueba (Seed Data)

El sistema inicializa automáticamente dos cuentas para pruebas:

| Rol | Correo Electrónico | Contraseña | Permisos |
|---|---|---|---|
| **Administrador** | `admin@eventify.com` | `admin123` | Acceso total al panel de administración (`/admin/events`, `/admin/venues`, `/admin/tickets-stats`, `/admin/events-stats`), creación y edición. |
| **Usuario Normal** | `user@eventify.com` | `user123` | Exploración de eventos, compra de tickets y consulta de entradas en `/profile`. |

---

## Endpoints Principales de la API REST

Prefijo global: `/api`

### Autenticación (`/api/auth`)
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `POST` | `/api/auth/login` | Inicia sesión y retorna JWT + datos de usuario | Público |
| `POST` | `/api/auth/register` | Registra una nueva cuenta de usuario | Público |

### Usuarios (`/api/users`)
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/api/users/me` | Obtiene el perfil del usuario autenticado | Autenticado |
| `GET` | `/api/users` | Lista todos los usuarios registrados | `admin` |
| `POST` | `/api/users` | Crea un usuario | `admin` |
| `GET` | `/api/users/:id` | Obtiene un usuario por ID | Autenticado |
| `PATCH` | `/api/users/:id` | Actualiza información de un usuario | Autenticado |
| `DELETE`| `/api/users/:id` | Elimina un usuario | `admin` |

### Eventos (`/api/events`)
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/api/events` | Lista todos los eventos disponibles | Público |
| `GET` | `/api/events/:id` | Obtiene el detalle de un evento | Público |
| `POST` | `/api/events` | Crea un nuevo evento | `admin` |
| `PUT` | `/api/events/:id` | Reemplaza un evento | `admin` |
| `DELETE`| `/api/events/:id` | Elimina un evento | `admin` |

### Escenarios / Venues (`/api/venues`)
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/api/venues` | Lista todos los escenarios registrados | Público |
| `GET` | `/api/venues/:id` | Obtiene un escenario con sus coordenadas | Público |
| `POST` | `/api/venues` | Crea un escenario | `admin` |
| `PUT` | `/api/venues/:id` | Actualiza un escenario | `admin` |
| `DELETE`| `/api/venues/:id` | Elimina un escenario | `admin` |

### Tickets (`/api/tickets`)
| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| `GET` | `/api/tickets` | Lista tickets (filtrable por `?eventId=`) | Autenticado |
| `POST` | `/api/tickets` | Compra de entradas con validación de aforo | Autenticado |
| `GET` | `/api/tickets/distribution` | Distribución de entradas vendidas vs disponibles | `admin` |
| `GET` | `/api/tickets/revenue` | Ingresos totales recaudados por evento | `admin` |

---

## Despliegue con Docker y Docker Compose

### Despliegue Local con Docker Compose
Para levantar la aplicación completa de forma contenerizada en tu máquina:

```sh
docker compose up -d --build
```
- **Frontend:** [`http://localhost:80`](http://localhost:80)
- **Backend:** [`http://localhost:3000/api`](http://localhost:3000/api)

Para detener los contenedores:
```sh
docker compose down
```

---

### Despliegue en Google Cloud Platform (VM)
1. Conéctate a la máquina virtual mediante SSH.
2. Clona el repositorio y edita `deploy.sh` colocando la IP pública de la VM.
3. Ejecuta el script de despliegue:

```sh
chmod +x deploy.sh
./deploy.sh
```
---

## Comandos Disponibles

### Backend (`/backend`)
| Comando | Descripción |
|---|---|
| `npm run start:dev` | Inicia el servidor NestJS en modo desarrollo (*watch mode*). |
| `npm run build` | Compila el código TypeScript a JavaScript en `dist/`. |
| `npm run start:prod` | Ejecuta la aplicación compilada de producción. |
| `npm run format` | Formatea el código con Prettier. |
| `npm run lint` | Ejecuta el linter ESLint con auto-fix. |

### Frontend (`/frontend`)
| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo Vite con HMR. |
| `npm run build` | Valida tipos y empaqueta el bundle estático en `dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción. |
| `npm run type-check` | Ejecuta el comprobador de tipos de Vue y TypeScript. |
| `npm run lint` | Ejecuta Oxlint y ESLint. |
| `npm run format` | Formatea los archivos con Prettier. |

---

## Contribución y Autores

Proyecto desarrollado por el equipo de **Eventify** como parte del curso de Desarrollo de Aplicaciones Web FullStack (**Universidad EAFIT**).

