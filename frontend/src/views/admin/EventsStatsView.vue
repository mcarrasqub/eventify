<script setup lang="ts">
// External Imports
import { computed, onMounted, ref } from 'vue';

// Internal Imports
import { ErrorHandlerService } from '@/services/ErrorHandlerService.js';
import type { EventsByCityDTO, EventSummaryDTO } from '@/dtos/EventDTO.js';
import { EventService } from '@/services/EventService.js';
import PieGraphComponent from '@/components/graphs/PieGraphComponent.vue';

// Reactive State
const summary = ref<EventSummaryDTO | null>(null);
const byCityData = ref<EventsByCityDTO[]>([]);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string>('');

// Fetch Data
onMounted(async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const [summaryRes, cityRes] = await Promise.all([
      EventService.getEventSummary(),
      EventService.getEventsByCity(),
    ]);
    summary.value = summaryRes;
    byCityData.value = cityRes;
  } catch (err: unknown) {
    errorMessage.value = ErrorHandlerService.getErrorMessage(err, 'Failed to load events statistics.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

// Computed for Graph Data
const eventDistributionByCity = computed<{
  labels: string[];
  data: number[];
}>(() => ({
  labels: byCityData.value.map((item) => item.city),
  data: byCityData.value.map((item) => item.eventCount),
}));
</script>

<template>
  <!-- Events Stats Section -->
  <section class="mx-auto max-w-7xl">
    <!-- View Header -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          Analytics dashboard
        </p>
        <h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Events Statistics
        </h2>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="py-12 text-center font-mono text-sm text-ink-muted">
      Loading events statistics...
    </div>

    <!-- Error State -->
    <div
      v-else-if="errorMessage"
      class="rounded-xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-sm text-rose-400"
    >
      {{ errorMessage }}
    </div>

    <template v-else>
      <!-- Summary Metrics Cards -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <!-- Card: Total Events -->
        <div class="rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-xl">
          <p class="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">Total Events</p>
          <p class="mt-2 font-display text-3xl font-bold text-white">
            {{ summary?.totalEvents ?? 0 }}
          </p>
        </div>

        <!-- Card: Cities Covered -->
        <div class="rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-xl">
          <p class="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">Cities Covered</p>
          <p class="mt-2 font-display text-3xl font-bold text-rose-gold">
            {{ summary?.citiesCovered ?? 0 }}
          </p>
        </div>

        <!-- Card: Top City -->
        <div class="rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-xl">
          <p class="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">Top City</p>
          <div class="mt-2 flex items-baseline gap-2">
            <p class="font-display text-2xl font-bold text-white">
              {{ summary?.topCity ?? 'N/A' }}
            </p>
            <span class="font-mono text-xs text-rose-light"> ({{ summary?.topCityEventCount ?? 0 }} events) </span>
          </div>
        </div>
      </div>

      <!-- Main Content Grid (Chart & City Breakdown) -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <!-- Pie Graph Container -->
        <div class="rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-xl lg:col-span-7">
          <div class="mb-6">
            <h3 class="font-display text-lg font-semibold text-white">Events Distribution by City</h3>
            <p class="text-xs text-ink-muted">
              Comparison of event volume hosted across target cities
            </p>
          </div>

          <div class="mx-auto max-w-md">
            <PieGraphComponent
              :data="eventDistributionByCity.data"
              :labels="eventDistributionByCity.labels"
              :background-color="[
                '#c9956c',
                '#7b5ea7',
                '#f0b3a5',
                '#9bae61',
                '#8fb5d9',
                '#ec9f9f',
                '#6dc7bf',
              ]"
              :border-color="'#111827'"
              :legend-position="'bottom'"
              title="Events by city"
            />
          </div>
        </div>

        <!-- City Breakdown List -->
        <div class="rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-xl lg:col-span-5">
          <div class="mb-6">
            <h3 class="font-display text-lg font-semibold text-white">City Breakdown</h3>
            <p class="text-xs text-ink-muted">Detailed view of events per city</p>
          </div>

          <div class="space-y-4">
            <div
              v-for="item in byCityData"
              :key="item.city"
              class="rounded-xl border border-white/5 bg-midnight-lift p-4"
            >
              <div class="mb-2 flex items-center justify-between text-sm">
                <span class="font-medium text-white">{{ item.city }}</span>
                <span class="font-mono text-xs text-rose-gold">
                  {{ item.eventCount }}
                  {{ item.eventCount === 1 ? 'event' : 'events' }} ({{ item.percentage }}%)
                </span>
              </div>
              <!-- Progress Bar -->
              <div class="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-rose-gold to-deep-purple transition-all duration-500"
                  :style="{ width: `${item.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
