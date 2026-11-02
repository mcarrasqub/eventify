<script setup lang="ts">
// Imports
import { DateFormatUtil } from '~/utils/DateFormatUtil';

// Variables
const { data: events } = await useFetch('/api/events');

// SEO
useSeoMeta({
  title: 'Eventos · Eventify',
  description: 'Explora los eventos disponibles en Eventify.',
});
</script>

<template>
  <section>
    <!-- Page title -->
    <h1 class="h2 mb-3 text-primary">Eventos</h1>

    <!-- Events list -->
    <ul class="list-group shadow-sm">
      <li
        v-for="event in events"
        :key="event.id"
        class="list-group-item list-group-item-action position-relative py-3"
      >
        <NuxtLink
          class="stretched-link text-decoration-none fw-semibold"
          :to="`/events/${event.id}`"
        >
          {{ event.title }}
        </NuxtLink>
        <span class="text-body-secondary d-block small">
          {{ event.category }} · {{ event.city }} · {{ DateFormatUtil.formatLongDate(event.date) }}
        </span>
      </li>
    </ul>
  </section>
</template>
