<template>
  <div>
    <h1 class="h2 mb-3">Eventify Dashboard</h1>
    <p class="lead">
      Bienvenido a la mini versión del proyecto Eventify implementado con Nuxt.
    </p>
    <div class="card p-4 my-3 bg-light border-0 shadow-sm">
      <h2 class="h5">Módulo de Blog</h2>
      <p class="mb-3">
        Explora nuestros artículos técnicos sobre gestión de escenarios, analíticas de asistencia y optimización de boletería digital.
      </p>
      <div>
        <NuxtLink to="/blog" class="btn btn-outline-primary">
          Ir a la sección de Blog →
        </NuxtLink>
      </div>
    </div>

    <div class="card p-4 my-3 bg-light border-0 shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h2 class="h5 mb-0">Módulo de Eventos</h2>
        <span class="badge bg-success-subtle text-success border border-success-subtle">SSR</span>
      </div>
      <p class="mb-3">
        Explora los eventos disponibles cargados desde la capa <code>/server</code> de Nuxt y renderizados dinámicamente con Server-Side Rendering.
      </p>
      <div>
        <NuxtLink to="/events" class="btn btn-success">
          Ver Eventos →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
