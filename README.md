# Eventify

Eventify es una aplicación web construida con Vue 3, TypeScript, Vite, Vue Router, Pinia y Tailwind CSS.

## Requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) `22.18.0` o una versión `24.12.0` o superior
- npm, incluido con Node.js

Puedes comprobar las versiones instaladas con:

```sh
node --version
npm --version
```

## Configuración desde otro computador

1. Clona el repositorio y entra en la carpeta del proyecto:

```sh
git clone https://github.com/mcarrasqub/eventify.git
cd eventify
```

2. Instala las dependencias:

```sh
npm install
```

3. Inicia el servidor de desarrollo:

```sh
npm run dev
```

4. Abre en el navegador la dirección que muestre Vite, normalmente [`http://localhost:5173`](http://localhost:5173).

No es necesario copiar `node_modules`; esa carpeta se genera automáticamente con `npm install` y está excluida del repositorio.

## Comandos disponibles

| Comando              | Descripción                                              |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | Inicia el servidor de desarrollo con recarga automática. |
| `npm run build`      | Comprueba los tipos y genera la versión de producción.   |
| `npm run preview`    | Sirve localmente la versión de producción generada.      |
| `npm run type-check` | Ejecuta la comprobación de tipos de Vue y TypeScript.    |
| `npm run lint`       | Ejecuta Oxlint y ESLint.                                 |
| `npm run format`     | Formatea los archivos de `src/` con Prettier.            |

## Tecnologías principales y Librerías

- **Vue 3** (Composition API con `<script setup>`) y **TypeScript**
- **Vite** (Build tool y servidor de desarrollo)
- **Vue Router** (Gestión de rutas y control de acceso)
- **Pinia** (Gestión de estado global)
- **Tailwind CSS v4** (Diseño e interfaz de usuario)
- **Chart.js** (Visualización de gráficos analíticos y estadísticas)
- **Leaflet** (Mapas interactivos para la ubicación de sedes/venues)

## Estructura del Proyecto

```text
src/
├── assets/          # Estilos y recursos multimedia
├── components/      # Componentes reutilizables (formularios, tarjetas, gráficos, mapas)
├── dtos/            # Data Transfer Objects (DTOs)
├── interfaces/      # Interfaces y contratos de tipos en TypeScript
├── router/          # Configuración de Vue Router y guardias de navegación
├── seeders/         # Datos iniciales (mock data) para pruebas
├── services/        # Servicios con lógica de negocio y consumo de datos
├── stores/          # Stores de Pinia para la gestión del estado
├── utils/           # Funciones utilitarias y formateadores
└── views/           # Vistas principales de la aplicación (Públicas y de Administración)
```

## Despliegue con Docker

El proyecto incluye un `Dockerfile` y configuración de `Nginx` para empaquetar la aplicación en producción:

1. **Construir la imagen de Docker:**

```sh
docker build -t eventify .
```

2. **Ejecutar el contenedor:**

```sh
docker run -d -p 80:80 eventify
```

