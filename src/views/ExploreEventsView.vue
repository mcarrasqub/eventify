<script setup lang="ts">
// External Imports
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

// Internal Imports
import EventComponent from '@/components/EventComponent.vue';
import { EventService } from '@/services/EventService.js';

// Variables
const route = useRoute();

// Reactive variables
const searchQuery = ref<string>('');
const initialCategory = typeof route.query.category === 'string' ? route.query.category : 'All';
const categorySelector = ref<string>(initialCategory);

// Constants
const categories = ['All', 'Technology', 'Music', 'Design', 'Gastronomy', 'Sports', 'Theater'];

// Computed
const filteredEvents = computed(() =>
  EventService.search(searchQuery.value, categorySelector.value),
);
</script>

<template>
  <section class="mx-auto max-w-7xl space-y-8">
    <!-- View Header -->
    <div>
      <h1 class="font-display text-3xl font-bold text-white">Explore Events</h1>
      <p class="text-xs text-ink-muted">Find and join events of your interest</p>
    </div>

    <!-- Search & Category Selector -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by title or description..."
        class="w-full rounded-xl border border-white/10 bg-midnight-soft px-4 py-3 text-sm text-white placeholder-white/30 focus:border-rose-gold focus:outline-none sm:w-80"
      />

      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="categorySelector = cat"
          :class="[
            'rounded-lg px-4 py-2 text-xs font-semibold transition',
            categorySelector === cat
              ? 'bg-rose-gold text-midnight'
              : 'border border-white/10 bg-midnight-soft text-ink-muted hover:border-white/30 hover:text-white',
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Results Grid -->
    <div
      v-if="filteredEvents.length > 0"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <EventComponent v-for="event in filteredEvents" :key="event.id" :event="event" />
    </div>

    <div
      v-else
      class="rounded-xl border border-white/10 bg-midnight-soft p-12 text-center text-ink-muted"
    >
      No events found for the selected criteria.
    </div>
  </section>
</template>
