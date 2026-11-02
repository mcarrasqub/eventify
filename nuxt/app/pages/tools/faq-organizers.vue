<script setup lang="ts">
// Imports
import { organizerFaqs } from '~/data/faqs';

// SEO
useSeoMeta({
  title: 'FAQ Organizadores · Eventify',
  description: 'Guías y respuestas sobre creación de eventos, comisiones y gestión de accesos.',
});
</script>

<template>
  <section>
    <!-- Breadcrumb navigation -->
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <NuxtLink to="/" class="text-decoration-none">Inicio</NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink to="/tools" class="text-decoration-none">Herramientas</NuxtLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">FAQ Organizadores</li>
      </ol>
    </nav>

    <!-- Header -->
    <div class="mb-3">
      <h1 class="h2 mb-1 text-success">Preguntas frecuentes - Organizadores</h1>
      <p class="text-body-secondary mb-0">
        Guías y respuestas sobre creación de eventos, comisiones y gestión de accesos.
      </p>
    </div>

    <!-- FAQ list -->
    <div class="mt-3">
      <details
        v-for="faq in organizerFaqs"
        :key="faq.question"
        class="border rounded-3 bg-body p-3 mb-2 shadow-sm"
      >
        <summary class="fw-semibold text-success" style="cursor: pointer">
          {{ faq.question }}
        </summary>
        <p class="text-body-secondary mt-2 mb-0 pt-2 border-top">
          {{ faq.answer }}
        </p>
      </details>
    </div>
  </section>
</template>
