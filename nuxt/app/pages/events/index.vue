<script setup lang="ts">
import type { EventItem } from '~/../server/data/events'

const { data: events, status, error } = await useFetch<EventItem[]>('/api/events')
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h1 class="h2 mb-1">Eventos Disponibles</h1>
        <p class="text-muted mb-0">
          Datos obtenidos desde la capa <code>/server</code> de Nuxt y renderizados con <strong>SSR</strong>.
        </p>
      </div>
      <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
        Modo SSR
      </span>
    </div>

    <!-- Estado de carga y error si aplica -->
    <div v-if="status === 'pending'" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      Error al cargar los eventos desde el servidor: {{ error.message }}
    </div>

    <!-- Lista de eventos -->
    <ul v-else class="list-group">
      <li
        v-for="event in events"
        :key="event.id"
        class="list-group-item position-relative py-3"
      >
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <NuxtLink
              class="stretched-link text-decoration-none fw-semibold text-dark fs-5"
              :to="`/events/${event.id}`"
            >
              {{ event.title }}
            </NuxtLink>
            <span class="text-body-secondary d-block small mt-1">
              📍 {{ event.venue }} ({{ event.city }}) · 📅 {{ event.date }} - {{ event.time }} · 🏷️ {{ event.category }}
            </span>
          </div>
          <span class="badge bg-primary fs-6">
            ${{ event.price.toLocaleString('es-CO') }} COP
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
