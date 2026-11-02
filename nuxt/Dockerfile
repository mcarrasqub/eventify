# Stage 1: Build Nuxt application
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build

# Stage 2: Production runtime
FROM node:22-bookworm-slim
WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=80
ENV PORT=80

COPY --from=builder /app/.output ./.output

EXPOSE 80

CMD ["node", ".output/server/index.mjs"]
