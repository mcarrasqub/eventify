<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'Inicio · Eventify',
  description: 'Portal de eventos, blog y centro de ayuda de Eventify.',
});
</script>

<template>
  <div>
    <!-- Hero banner -->
    <section class="p-5 mb-5 bg-body-tertiary border rounded-4 shadow-sm text-center">
      <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 mb-3 rounded-pill fw-semibold">
        Plataforma Eventify Mini
      </span>
      <h1 class="display-5 fw-bold text-primary mb-3">
        Tu portal de eventos, entradas y experiencias
      </h1>
      <p class="lead text-body-secondary mb-4 mx-auto" style="max-width: 680px">
        Explora nuestra cartelera en tiempo real, aprende con artículos especializados y resuelve
        tus dudas en nuestro centro de ayuda.
      </p>
      <div class="d-flex flex-wrap justify-content-center gap-3">
        <NuxtLink class="btn btn-primary px-4 py-2 fw-semibold" to="/events">
          Explorar eventos →
        </NuxtLink>
        <NuxtLink class="btn btn-outline-primary px-4 py-2" to="/blog">
          Leer blog
        </NuxtLink>
        <NuxtLink class="btn btn-outline-secondary px-4 py-2" to="/tools">
          Centro de ayuda
        </NuxtLink>
      </div>
    </section>

    <!-- Quick access cards -->
    <section class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 border-top border-4 border-primary">
          <div class="card-body p-4 d-flex flex-column">
            <h2 class="h5 card-title mb-2 text-primary">Cartelera de Eventos</h2>
            <p class="card-text text-body-secondary flex-grow-1">
              Descubre conciertos, conferencias y festivales con detalles de recintos, fechas y precios.
            </p>
            <div class="mt-3">
              <NuxtLink to="/events" class="btn btn-sm btn-outline-primary w-100">
                Ver cartelera →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 border-top border-4 border-dark">
          <div class="card-body p-4 d-flex flex-column">
            <h2 class="h5 card-title mb-2 text-dark">Blog Especializado</h2>
            <p class="card-text text-body-secondary flex-grow-1">
              Guías sobre venta de boletería digital, gestión de recintos y analíticas operativas.
            </p>
            <div class="mt-3">
              <NuxtLink to="/blog" class="btn btn-sm btn-outline-dark w-100">
                Leer artículos →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 border-top border-4 border-success">
          <div class="card-body p-4 d-flex flex-column">
            <h2 class="h5 card-title mb-2 text-success">Centro de Ayuda</h2>
            <p class="card-text text-body-secondary flex-grow-1">
              Preguntas frecuentes con buscador rápido para asistentes y organizadores de eventos.
            </p>
            <div class="mt-3">
              <NuxtLink to="/tools" class="btn btn-sm btn-outline-success w-100">
                Ir a FAQ →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
