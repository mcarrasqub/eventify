<script setup lang="ts">
// Imports
import { allFaqs } from '~/data/faqs';

// Variables
const searchQuery = ref('');

const faqCategories = [
  {
    title: 'FAQ Asistentes',
    to: '/faq/attendees',
    description: 'Guía de compra, descarga de boletos digitales, políticas de cesión y acceso.',
    color: 'primary',
  },
  {
    title: 'FAQ Organizadores',
    to: '/faq/organizers',
    description: 'Gestión de recintos, validación de códigos QR, tarifas y liquidación de ventas.',
    color: 'success',
  },
];

// Computed
const filteredFaqs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return [];
  return allFaqs.filter(
    (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
  );
});

// Methods
const clearSearch = (): void => {
  searchQuery.value = '';
};

// SEO
useSeoMeta({
  title: 'Preguntas Frecuentes (FAQ) · Eventify',
  description: 'Preguntas frecuentes y soporte para asistentes y organizadores en Eventify.',
});
</script>

<template>
  <section>
    <!-- Header -->
    <div class="mb-4">
      <h1 class="h2 mb-1 text-primary">Preguntas Frecuentes (FAQ)</h1>
      <p class="text-body-secondary mb-0">
        Encuentra respuestas rápidas para asistentes y organizadores de eventos.
      </p>
    </div>

    <!-- Category cards -->
    <div class="row g-4 mb-4">
      <div v-for="category in faqCategories" :key="category.to" class="col-md-6">
        <div
          class="card h-100 shadow-sm border-0 border-top border-4"
          :class="`border-${category.color}`"
        >
          <div class="card-body p-4 d-flex flex-column">
            <h2 class="h5 card-title mb-2 text-dark">{{ category.title }}</h2>
            <p class="card-text text-body-secondary flex-grow-1">
              {{ category.description }}
            </p>
            <div class="mt-3">
              <NuxtLink
                :to="category.to"
                class="btn w-100"
                :class="`btn-outline-${category.color}`"
              >
                Ver Preguntas →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick search card -->
    <div class="card p-4 border-0 shadow-sm bg-body-tertiary">
      <h2 class="h5 mb-2">Buscador Rápido</h2>
      <p class="text-body-secondary small mb-3">
        Encuentra rápidamente respuestas a tus preguntas sobre entradas, comisiones o recintos.
      </p>

      <!-- Search input -->
      <div class="input-group mb-3">
        <span class="input-group-text bg-body">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Busca por palabra clave: boletos, QR, entradas, comisiones..."
        />
        <button
          v-if="searchQuery"
          class="btn btn-outline-secondary"
          type="button"
          @click="clearSearch"
        >
          Limpiar
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-if="searchQuery && filteredFaqs.length === 0"
        class="text-center py-3 text-body-secondary"
      >
        No se encontraron preguntas con el término "{{ searchQuery }}".
      </div>

      <!-- Search results -->
      <ul v-else-if="filteredFaqs.length > 0" class="list-group">
        <li
          v-for="faq in filteredFaqs"
          :key="faq.id"
          class="list-group-item d-flex justify-content-between align-items-start py-3"
        >
          <div class="me-3">
            <span
              class="badge mb-1"
              :class="
                faq.category === 'attendees'
                  ? 'bg-primary-subtle text-primary'
                  : 'bg-success-subtle text-success'
              "
            >
              {{ faq.category === 'attendees' ? 'Asistentes' : 'Organizadores' }}
            </span>
            <div class="fw-semibold">{{ faq.question }}</div>
            <div class="text-body-secondary small mt-1">{{ faq.answer }}</div>
          </div>
          <NuxtLink
            v-if="faq.targetRoute"
            :to="faq.targetRoute"
            class="btn btn-sm btn-light border text-nowrap align-self-center"
          >
            Ver más →
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
