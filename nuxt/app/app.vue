<template>
  <!-- Navigation header -->
  <header class="border-bottom bg-body-tertiary shadow-sm">
    <div class="container d-flex flex-wrap align-items-center justify-content-between gap-3 py-3">
      <NuxtLink class="navbar-brand mb-0 text-decoration-none fw-bold text-primary" to="/">
        Eventify
      </NuxtLink>

      <nav aria-label="Principal">
        <ul class="nav mb-0">
          <li class="nav-item">
            <NuxtLink class="nav-link py-1 px-2" to="/" active-class="active">Inicio</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link py-1 px-2" to="/events" active-class="active">
              Eventos
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link py-1 px-2" to="/blog" active-class="active">Blog</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link py-1 px-2" to="/tools" active-class="active">
              Herramientas
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Main content wrapper -->
  <div class="container my-4">
    <NuxtPage />
  </div>
</template>
