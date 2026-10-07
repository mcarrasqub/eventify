<script setup lang="ts">
// External Imports
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Internal Imports
import EventCardComponent from '@/components/EventCardComponent.vue';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import { EventService } from '@/services/EventService.js';
import { getErrorMessage } from '@/utils/errorHandler.js';

// Variables
const route = useRoute();

// Reactive variables
const searchQuery = ref<string>('');
const initialCategory = typeof route.query.category === 'string' ? route.query.category : 'All';
const categorySelector = ref<string>(initialCategory);
const events = ref<EventInterface[]>([]);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string>('');

// Constants
const categories = [
  'All',
  'Technology',
  'Music',
  'Design',
  'Gastronomy',
  'Sports',
  'Theater',
  'Business',
  'Art',
  'Education',
  'Entertainment',
  'Food & Drink',
];

async function loadEvents(): Promise<void> {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    events.value = await EventService.search(searchQuery.value, categorySelector.value);
  } catch (err: unknown) {
    errorMessage.value = getErrorMessage(err, 'Failed to load events.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadEvents();
});

watch([searchQuery, categorySelector], () => {
  loadEvents();
});
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
          v-for="category in categories"
          :key="category"
          @click="categorySelector = category"
          :class="[
            'rounded-lg px-4 py-2 text-xs font-semibold transition',
            categorySelector === category
              ? 'bg-rose-gold text-midnight'
              : 'border border-white/10 bg-midnight-soft text-ink-muted hover:border-white/30 hover:text-white',
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="py-12 text-center font-mono text-sm text-ink-muted">
      Loading events...
    </div>

    <!-- Error State -->
    <div
      v-else-if="errorMessage"
      class="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-center text-sm text-rose-400"
    >
      {{ errorMessage }}
    </div>

    <!-- Results Grid -->
    <div v-else-if="events.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <EventCardComponent v-for="event in events" :key="event.id" :event="event" />
    </div>

    <div
      v-else
      class="rounded-xl border border-white/10 bg-midnight-soft p-12 text-center text-ink-muted"
    >
      No events found for the selected criteria.
    </div>
  </section>
</template>
