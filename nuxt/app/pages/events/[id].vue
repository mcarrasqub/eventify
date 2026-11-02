<script setup lang="ts">
// Imports
import { CurrencyFormatUtil } from '~/utils/CurrencyFormatUtil';
import { DateFormatUtil } from '~/utils/DateFormatUtil';

// Variables
const route = useRoute();
const id = route.params.id;

const { data: event, error } = await useFetch(`/api/events/${id}`);

if (error.value) {
  throw createError({
    status: error.value.status,
    statusText: error.value.statusText,
    fatal: true,
  });
}

// SEO
useSeoMeta({
  title: () => `${event.value?.title} · Eventify`,
  description: () => event.value?.description,
});
</script>

<template>
  <article v-if="event">
    <!-- Back navigation -->
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/events">← Todos los eventos</NuxtLink>
    </p>

    <!-- Event header -->
    <h1 class="h2">{{ event.title }}</h1>
    <p class="lead mb-2">{{ event.category }} · {{ CurrencyFormatUtil.formatCop(event.price) }}</p>
    <p>{{ event.description }}</p>

    <!-- Event details -->
    <dl class="row mb-0">
      <dt class="col-sm-3">Lugar</dt>
      <dd class="col-sm-9">{{ event.venue }}, {{ event.city }}</dd>

      <dt class="col-sm-3">Fecha</dt>
      <dd class="col-sm-9">{{ DateFormatUtil.formatLongDate(event.date) }} · {{ event.time }}</dd>

      <dt class="col-sm-3">Duración</dt>
      <dd class="col-sm-9">{{ event.duration }}</dd>
    </dl>
  </article>
</template>
