<script setup lang="ts">
import type { EventItem } from '~/../server/data/events'

const route = useRoute()
const eventId = route.params.id

const { data: event, error } = await useFetch<EventItem>(`/api/events/${eventId}`)
</script>

<template>
  <div>
    <p class="mb-3">
      <NuxtLink class="text-decoration-none small" to="/events">
        ← Volver a todos los eventos
      </NuxtLink>
    </p>

    <div v-if="error" class="alert alert-danger">
      <h4>Evento no encontrado</h4>
      <p class="mb-0">No se pudo encontrar el evento con ID {{ eventId }}.</p>
    </div>

    <article v-else-if="event" class="card border-0 shadow-sm p-4">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <span class="badge bg-secondary">{{ event.category }}</span>
        <span class="badge bg-success-subtle text-success border border-success-subtle">
          {{ event.status }}
        </span>
      </div>

      <h1 class="h2 mb-2">{{ event.title }}</h1>

      <p class="text-muted small mb-3">
        📍 <strong>{{ event.venue }}</strong>, {{ event.city }} · 
        📅 {{ event.date }} a las {{ event.time }} (Duración: {{ event.duration }})
      </p>

      <div class="p-3 bg-light rounded-3 mb-4 d-flex justify-content-between align-items-center">
        <div>
          <span class="text-muted d-block small">Precio de entrada general:</span>
          <span class="h4 text-primary fw-bold mb-0">
            ${{ event.price.toLocaleString('es-CO') }} COP
          </span>
        </div>
        <button class="btn btn-primary btn-sm px-3" disabled>
          Boletería Digital (Demo)
        </button>
      </div>

      <h5 class="h6 text-uppercase text-muted fw-bold">Descripción del Evento</h5>
      <p class="fs-6 lh-base mb-0 text-secondary">
        {{ event.description }}
      </p>
    </article>
  </div>
</template>
