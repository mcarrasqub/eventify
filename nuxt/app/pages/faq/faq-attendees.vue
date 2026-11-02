<script setup lang="ts">
// Imports
import { attendeeFaqs } from '~/data/faqs';

// SEO
useSeoMeta({
  title: 'FAQ Asistentes · Eventify',
  description: 'Respuestas a dudas frecuentes sobre compra, entradas y acceso a eventos.',
});
</script>

<template>
  <section>
    <!-- Back navigation -->
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/faq">← Todas las preguntas frecuentes</NuxtLink>
    </p>

    <!-- Header -->
    <div class="mb-3">
      <h1 class="h2 mb-1 text-primary">Preguntas frecuentes - Asistentes</h1>
      <p class="text-body-secondary mb-0">
        Respuestas a las dudas más comunes sobre compra, entradas y acceso a eventos.
      </p>
    </div>

    <!-- FAQ list -->
    <div class="mt-3">
      <details
        v-for="faq in attendeeFaqs"
        :key="faq.id"
        class="border rounded-3 bg-body p-3 mb-2 shadow-sm"
      >
        <summary class="fw-semibold text-primary" style="cursor: pointer">
          {{ faq.question }}
        </summary>
        <p class="text-body-secondary mt-2 mb-0 pt-2 border-top">
          {{ faq.answer }}
        </p>
      </details>
    </div>
  </section>
</template>
