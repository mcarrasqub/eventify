<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';

import EventFormComponent from '@/components/EventFormComponent.vue';
import FilterSelectorComponent from '@/components/FilterSelectorComponent.vue';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import { EventService } from '@/services/EventService.js';
import { VenueService } from '@/services/VenueService.js';

// Reactive State (Search, Selectors and Modals)
const searchQuery = ref<string>('');
const categorySelector = ref<string>('All');
const statusSelector = ref<string>('All');

const isEventModalOpen = ref<boolean>(false);
const selectedEvent = ref<EventInterface | null>(null);

// Computed
const allEvents = computed<EventInterface[]>(() => EventService.getEvents());

const categoryOptions = computed<string[]>(() => ['All', ...EventService.getUniqueCategories()]);

const statusOptions = computed<string[]>(() => ['All', ...EventService.getUniqueStatuses()]);

const filteredEvents = computed<EventInterface[]>(() => {
  return allEvents.value.filter((event) => {
    const matchesQuery =
      event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      categorySelector.value === 'All' || event.category === categorySelector.value;
    const matchesStatus = statusSelector.value === 'All' || event.status === statusSelector.value;
    return matchesQuery && matchesCategory && matchesStatus;
  });
});

// Methods
function handleCreateEvent(): void {
  selectedEvent.value = null;
  isEventModalOpen.value = true;
}

function handleEditEvent(event: EventInterface): void {
  selectedEvent.value = event;
  isEventModalOpen.value = true;
}

function handleDelete(id: number, title: string): void {
  const confirmed = window.confirm(`Are you sure you want to delete the event "${title}"?`);
  if (confirmed) {
    EventService.deleteEvent(id);
  }
}

function getVenueName(venueId: number): string {
  const venue = VenueService.getVenueById(venueId);
  return venue ? venue.name : `Venue #${venueId}`;
}
</script>

<template>
  <section class="mx-auto max-w-7xl">
    <!-- View Header and Creation Actions -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          Event control center
        </p>
        <h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Admin Events
        </h2>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-rose-gold px-5 py-3 font-display text-sm font-bold text-midnight transition hover:bg-rose-light"
          @click="handleCreateEvent"
        >
          <span>+</span>
          <span>Create Event</span>
        </button>
      </div>
    </div>

    <!-- Search Bar and Filter Selectors -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="flex flex-col gap-1.5">
        <label
          for="event-search"
          class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
        >
          Search
        </label>
        <input
          id="event-search"
          v-model="searchQuery"
          type="text"
          placeholder="Search by title or description..."
          class="w-full rounded-xl border border-white/15 bg-midnight-soft px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
        />
      </div>

      <FilterSelectorComponent
        id="category-selector"
        v-model="categorySelector"
        label="Category"
        placeholder="All Categories"
        :options="categoryOptions"
      />

      <FilterSelectorComponent
        id="status-selector"
        v-model="statusSelector"
        label="Status"
        placeholder="All Statuses"
        :options="statusOptions"
      />
    </div>

    <!-- Events Table -->
    <div class="overflow-hidden rounded-2xl border border-white/10 bg-midnight-soft shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left text-sm text-white">
          <!-- Table Header -->
          <thead
            class="border-b border-white/10 bg-midnight-lift font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
          >
            <tr>
              <th scope="col" class="w-16 px-6 py-4 text-left font-medium">ID</th>
              <th scope="col" class="px-6 py-4 text-left font-medium">Event</th>
              <th scope="col" class="px-6 py-4 text-left font-medium">Category</th>
              <th scope="col" class="px-6 py-4 text-left font-medium">Date & Time</th>
              <th scope="col" class="px-6 py-4 text-left font-medium">Venue</th>
              <th scope="col" class="w-32 px-6 py-4 text-center font-medium">Status</th>
              <th scope="col" class="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="divide-y divide-white/5 font-sans">
            <!-- Empty State -->
            <tr v-if="filteredEvents.length === 0">
              <td colspan="7" class="py-12 text-center">
                <div class="flex flex-col items-center justify-center gap-3">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-midnight text-ink-muted"
                  >
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p class="font-sans text-sm text-ink-muted">
                    No events found matching the selected criteria.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Data Rows -->
            <tr
              v-for="event in filteredEvents"
              :key="event.id"
              class="transition duration-150 hover:bg-white/[0.03]"
            >
              <!-- ID -->
              <td class="w-16 px-6 py-4 text-left font-mono text-xs text-ink-muted align-middle">
                #{{ event.id }}
              </td>

              <!-- Event (Image + Title + Type) -->
              <td class="px-6 py-4 text-left text-sm align-middle">
                <div class="flex items-center gap-3">
                  <img
                    :src="event.imageURL"
                    :alt="event.title"
                    class="h-10 w-10 rounded-lg object-cover"
                  />
                  <div class="min-w-0">
                    <p class="truncate font-medium text-white">
                      {{ event.title }}
                    </p>
                    <p class="text-xs text-ink-muted">
                      {{ event.type }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td class="px-6 py-4 text-left text-sm align-middle">
                <span
                  class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-rose-light"
                >
                  {{ event.category }}
                </span>
              </td>

              <!-- Date & Time -->
              <td class="px-6 py-4 text-left text-sm align-middle">
                <div class="text-xs">
                  <p class="font-medium text-white">
                    {{ event.date }}
                  </p>
                  <p class="text-ink-muted">{{ event.time }} ({{ event.duration }})</p>
                </div>
              </td>

              <!-- Venue -->
              <td class="px-6 py-4 text-left text-sm align-middle">
                <div class="text-xs">
                  <p class="font-medium text-white">
                    {{ getVenueName(event.venueId) }}
                  </p>
                  <p class="font-mono text-ink-muted">#{{ event.venueId }}</p>
                </div>
              </td>

              <!-- Status Badge -->
              <td class="w-32 px-6 py-4 text-center text-sm align-middle">
                <span
                  :class="[
                    'rounded-md px-2.5 py-1 text-xs font-semibold',
                    event.status === 'Active' && 'bg-emerald-500/10 text-emerald-400',
                    event.status === 'Draft' && 'bg-amber-500/10 text-amber-400',
                    event.status === 'Completed' && 'bg-indigo-500/10 text-indigo-400',
                    event.status === 'Cancelled' && 'bg-rose-500/10 text-rose-400',
                  ]"
                >
                  {{ event.status }}
                </span>
              </td>

              <!-- Actions: Edit and Delete -->
              <td class="px-6 py-4 text-right text-sm align-middle">
                <div class="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    class="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-rose-gold hover:text-rose-gold"
                    @click="handleEditEvent(event)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500 hover:text-white"
                    @click="handleDelete(event.id, event.title)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Form Modal -->
    <EventFormComponent
      :is-open="isEventModalOpen"
      :event="selectedEvent"
      @close="isEventModalOpen = false"
    />
  </section>
</template>
