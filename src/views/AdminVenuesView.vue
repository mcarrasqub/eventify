<script setup lang="ts">
// External Imports
import { computed, ref } from 'vue';

// Internal Imports
import FilterSelectorComponent from '@/components/FilterSelectorComponent.vue';
import VenueFormComponent from '@/components/VenueFormComponent.vue';
import type { VenueInterface } from '@/interfaces/VenueInterface.js';
import { EventService } from '@/services/EventService.js';
import { VenueService } from '@/services/VenueService.js';

// Reactive State (Search, Selectors and Modals)
const searchQuery = ref<string>('');
const citySelector = ref<string>('All');

const isVenueModalOpen = ref<boolean>(false);
const selectedVenue = ref<VenueInterface | null>(null);

// Computed
const allVenues = computed<VenueInterface[]>(() => VenueService.getVenues());

const cityOptions = computed<string[]>(() => ['All', ...VenueService.getUniqueCities()]);

const filteredVenues = computed<VenueInterface[]>(() => {
  return allVenues.value.filter((venue) => {
    const query = searchQuery.value.toLowerCase().trim();
    const matchesQuery =
      query === '' ||
      venue.name.toLowerCase().includes(query) ||
      venue.city.toLowerCase().includes(query) ||
      venue.address.toLowerCase().includes(query);

    const matchesCity = citySelector.value === 'All' || venue.city === citySelector.value;

    return matchesQuery && matchesCity;
  });
});

// Methods
function handleCreateVenue(): void {
  selectedVenue.value = null;
  isVenueModalOpen.value = true;
}

function handleEditVenue(venue: VenueInterface): void {
  selectedVenue.value = venue;
  isVenueModalOpen.value = true;
}

function handleDeleteVenue(id: number, name: string): void {
  const confirmed = window.confirm(`Are you sure you want to delete the venue "${name}"?`);
  if (confirmed) {
    VenueService.deleteVenue(id);
  }
}

function getEventCount(venueId: number): number {
  return EventService.getEventsByVenueId(venueId).length;
}
</script>

<template>
  <section class="mx-auto max-w-7xl">
    <!-- View Header and Creation Actions -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          Venue control center
        </p>
        <h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Admin Venues
        </h2>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-rose-gold px-5 py-3 font-display text-sm font-bold text-midnight transition hover:bg-rose-light"
          @click="handleCreateVenue"
        >
          <span>+</span>
          <span>Create Venue</span>
        </button>
      </div>
    </div>

    <!-- Search Bar and Filter Selectors -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="flex flex-col gap-1.5">
        <label
          for="venue-search"
          class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
        >
          Search
        </label>
        <input
          id="venue-search"
          v-model="searchQuery"
          type="text"
          placeholder="Search by venue name, city or address..."
          class="w-full rounded-xl border border-white/15 bg-midnight-soft px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
        />
      </div>

      <FilterSelectorComponent
        id="city-selector"
        v-model="citySelector"
        label="City"
        placeholder="All Cities"
        :options="cityOptions"
      />
    </div>

    <!-- Venues Table -->
    <div class="overflow-hidden rounded-2xl border border-white/10 bg-midnight-soft shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left text-sm text-white">
          <!-- Table Header -->
          <thead
            class="border-b border-white/10 bg-midnight-lift font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
          >
            <tr>
              <th scope="col" class="w-16 px-6 py-4 text-left font-medium">ID</th>
              <th scope="col" class="px-6 py-4 text-left font-medium">Venue</th>
              <th scope="col" class="px-6 py-4 text-left font-medium">City</th>
              <th scope="col" class="px-6 py-4 text-left font-medium">Address</th>
              <th scope="col" class="px-6 py-4 text-left font-medium">Capacity</th>
              <th scope="col" class="px-6 py-4 text-center font-medium">Events</th>
              <th scope="col" class="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="divide-y divide-white/5 font-sans">
            <!-- Empty State -->
            <tr v-if="filteredVenues.length === 0">
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <p class="font-sans text-sm text-ink-muted">
                    No venues found matching the selected criteria.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Data Rows -->
            <tr
              v-for="venue in filteredVenues"
              :key="venue.id"
              class="transition duration-150 hover:bg-white/[0.03]"
            >
              <!-- ID -->
              <td class="w-16 px-6 py-4 text-left font-mono text-xs text-ink-muted align-middle">
                #{{ venue.id }}
              </td>

              <!-- Venue (Image + Name) -->
              <td class="px-6 py-4 text-left text-sm align-middle">
                <div class="flex items-center gap-3">
                  <img
                    :src="
                      venue.imageURL ||
                      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80'
                    "
                    :alt="venue.name"
                    class="h-10 w-10 rounded-lg object-cover"
                  />
                  <div class="min-w-0">
                    <p class="truncate font-medium text-white">
                      {{ venue.name }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- City -->
              <td class="px-6 py-4 text-left text-sm align-middle">
                <span
                  class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-rose-light"
                >
                  {{ venue.city }}
                </span>
              </td>

              <!-- Address -->
              <td class="px-6 py-4 text-left text-sm text-ink-muted align-middle">
                {{ venue.address }}
              </td>

              <!-- Capacity -->
              <td class="px-6 py-4 text-left text-sm font-medium text-white align-middle">
                {{ venue.capacity.toLocaleString() }} pax
              </td>

              <!-- Linked Events -->
              <td class="px-6 py-4 text-center text-sm align-middle">
                <span
                  class="rounded-md border border-white/10 bg-midnight px-2.5 py-1 font-mono text-xs text-white"
                >
                  {{ getEventCount(venue.id) }}
                </span>
              </td>

              <!-- Actions: Edit and Delete -->
              <td class="px-6 py-4 text-right text-sm align-middle">
                <div class="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    class="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-rose-gold hover:text-rose-gold"
                    @click="handleEditVenue(venue)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500 hover:text-white"
                    @click="handleDeleteVenue(venue.id, venue.name)"
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
    <VenueFormComponent
      :is-open="isVenueModalOpen"
      :venue="selectedVenue"
      @close="isVenueModalOpen = false"
    />
  </section>
</template>
