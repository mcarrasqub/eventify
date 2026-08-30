<script setup lang="ts">
// Imports
import { computed } from 'vue';

import EventComponent from '@/components/EventComponent.vue';
import { EventService } from '@/services/EventService.js';
import { UserService } from '@/services/UserService.js';

// Computed
const currentUser = computed(() => UserService.getCurrentUser());
const featuredEvents = computed(() => EventService.getFeaturedEvents());
</script>

<template>
  <section class="mx-auto max-w-7xl space-y-10">
    <!-- Hero Section -->
    <div
      class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-midnight-soft via-deep-purple/20 to-midnight-soft p-8 sm:p-12"
    >
      <div class="max-w-2xl space-y-4">
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-rose-gold">
          Welcome to Eventify
        </p>
        <h1 class="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Hello,
          <span class="text-rose-gold">{{ currentUser ? currentUser.name : 'Guest' }}</span>
        </h1>
        <p class="text-sm text-ink-muted sm:text-base">
          Discover the best technology, cultural, and independent events all in one place.
        </p>

        <div class="pt-4">
          <RouterLink
            to="/explore"
            class="inline-flex items-center gap-2 rounded-xl bg-rose-gold px-6 py-3 font-display text-sm font-bold text-midnight transition hover:bg-rose-light"
          >
            Explore Events
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Featured Events Section -->
    <div>
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="font-display text-2xl font-bold text-white">Featured Events</h2>
          <p class="text-xs text-ink-muted">The most relevant events of the week</p>
        </div>
        <RouterLink
          to="/explore"
          class="text-xs font-semibold text-rose-gold transition hover:underline"
        >
          View all →
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <EventComponent v-for="event in featuredEvents" :key="event.id" :event="event" />
      </div>
    </div>
  </section>
</template>
