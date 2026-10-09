# Stage 1: Build
FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production

ARG CORS_ORIGIN=http://localhost:8080,http://127.0.0.1:8080
ENV CORS_ORIGIN=$CORS_ORIGIN

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
