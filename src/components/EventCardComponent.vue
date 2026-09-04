<script setup lang="ts">
// Imports
import type { EventInterface } from '@/interfaces/EventInterface.js';

// Props
defineProps<{
  event: EventInterface;
}>();
</script>

<template>
  <!-- Event Card Container -->
  <article
    class="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-midnight-soft transition duration-300 hover:-translate-y-1 hover:border-rose-gold/40 hover:shadow-lg hover:shadow-rose-gold/5"
  >
    <!-- Image, Type & Category -->
    <div class="relative h-48 w-full overflow-hidden bg-midnight">
      <img
        :src="event.imageURL"
        :alt="event.title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div class="absolute top-3 right-3 flex gap-2">
        <span
          class="rounded-full border border-white/20 bg-midnight/80 px-2.5 py-0.5 text-xs font-medium text-rose-gold backdrop-blur"
        >
          {{ event.type }}
        </span>
        <span
          class="rounded-full border border-white/20 bg-midnight/80 px-2.5 py-0.5 text-xs font-medium text-rose-light backdrop-blur"
        >
          {{ event.category }}
        </span>
      </div>
    </div>

    <!-- Event Content & Details -->
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-2 flex items-center justify-between text-xs text-ink-muted">
        <span class="font-mono">{{ event.date }} • {{ event.time }}</span>
        <span>{{ event.duration }}</span>
      </div>

      <h3 class="font-display text-lg font-bold text-white transition group-hover:text-rose-gold">
        {{ event.title }}
      </h3>

      <p class="mt-2 line-clamp-2 text-sm text-ink-muted">
        {{ event.description }}
      </p>

      <!-- Status & Actions -->
      <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span class="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
          {{ event.status }}
        </span>
        <RouterLink
          :to="`/event/${event.id}`"
          class="rounded-lg bg-rose-gold/10 px-3 py-1.5 text-xs font-semibold text-rose-light transition hover:bg-rose-gold hover:text-midnight"
        >
          View Details
        </RouterLink>
      </div>
    </div>
  </article>
</template>
