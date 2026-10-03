<script setup lang="ts">
// External Imports
import { computed } from 'vue';

// Internal Imports
import EventCardComponent from '@/components/EventCardComponent.vue';
import { AuthService } from '@/services/AuthService.js';
import { EventService } from '@/services/EventService.js';

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());
const featuredEvents = computed(() => EventService.getFeatured());

const popularCategories = computed(() => {
  const events = EventService.getAll();
  const categoryNames = ['Technology', 'Music', 'Design', 'Gastronomy', 'Sports', 'Theater'];

  return categoryNames.map((name) => ({
    name,
    count: events.filter((event) => event.category === name).length,
  }));
});
</script>

<template>
  <section class="mx-auto max-w-7xl space-y-12">
    <!-- Hero Section with Background Image -->
    <div
      class="relative flex min-h-[70vh] items-center justify-center overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-16"
    >
      <!-- Background Image -->
      <img
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=900&fit=crop&auto=format"
        alt="Live event crowd"
        class="absolute inset-0 h-full w-full object-cover opacity-90"
      />

      <!-- Dark Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/70 to-midnight/95"
      ></div>

      <!-- Hero Content -->
      <div class="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <span
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-rose-gold backdrop-blur-md"
        >
          ✦ The new way to experience events
        </span>

        <h1
          class="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Hello,
          <span class="text-rose-gold">{{ currentUser ? currentUser.name : 'Guest' }}</span>
        </h1>

        <h2 class="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
          Discover the best
          <span class="bg-gradient-to-r from-rose-gold to-rose-light bg-clip-text text-transparent">
            events
          </span>
        </h2>

        <p class="mt-4 max-w-lg text-sm text-ink-muted sm:text-base md:text-lg">
          Concerts, festivals, conferences, theater, and much more — all in one place.
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <RouterLink
            to="/explore"
            class="inline-flex items-center gap-2 rounded-xl bg-rose-gold px-8 py-3.5 font-display text-sm font-bold text-midnight transition duration-200 hover:bg-rose-light hover:shadow-lg hover:shadow-rose-gold/20"
          >
            Explore all events →
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Featured Events Section -->
    <div>
      <div class="mb-8 flex items-end justify-between">
        <div>
          <p class="mb-1 font-mono text-xs uppercase tracking-widest text-rose-gold">✦ Featured</p>
          <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Events of the week</h2>
        </div>
        <RouterLink
          to="/explore"
          class="text-xs font-semibold text-rose-gold transition hover:underline"
        >
          View all →
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <EventCardComponent v-for="event in featuredEvents" :key="event.id" :event="event" />
      </div>
    </div>

    <!-- Popular Categories Section -->
    <div class="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12">
      <!-- Background Image -->
      <img
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=900&fit=crop&auto=format"
        alt="Live event crowd"
        class="absolute inset-0 h-full w-full object-cover opacity-90"
      />

      <!-- Dark Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/70 to-midnight/95"
      ></div>

      <!-- Categories Content -->
      <div class="relative z-10">
        <div class="mb-10 text-center">
          <p class="mb-1 font-mono text-xs uppercase tracking-widest text-rose-gold">
            ✦ Browse by categories
          </p>
          <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Popular categories</h2>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <RouterLink
            v-for="category in popularCategories"
            :key="category.name"
            :to="{ path: '/explore', query: { category: category.name } }"
            class="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-midnight/80 p-5 text-center transition duration-300 hover:scale-105 hover:border-rose-gold/40 hover:bg-midnight"
          >
            <span class="text-base font-semibold text-white group-hover:text-rose-gold">{{
              category.name
            }}</span>
            <span class="font-mono text-xs text-ink-muted"
              >{{ category.count }} {{ category.count === 1 ? 'event' : 'events' }}</span
            >
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
