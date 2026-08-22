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

## Tecnologías principales

- Vue 3 y TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind CSS
