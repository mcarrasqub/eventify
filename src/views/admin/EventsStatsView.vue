<script setup lang="ts">
// External Imports
import { computed } from 'vue';

// Internal Imports
import PieGraphComponent from '@/components/graphs/PieGraphComponent.vue';
import { EventService } from '@/services/EventService.js';
import { VenueService } from '@/services/VenueService.js';

// Computed

const eventsList = computed(() => EventService.getAll());

const eventDistributionByCity = computed<{
  labels: string[];
  data: number[];
}>(() => {
  const cityCounts = new Map<string, number>();

  eventsList.value.forEach((event) => {
    const venue = VenueService.getByEventId(event.venueId);
    const cityName = venue?.city ?? 'Unknown';
    cityCounts.set(cityName, (cityCounts.get(cityName) || 0) + 1);
  });

  return {
    labels: Array.from(cityCounts.keys()),
    data: Array.from(cityCounts.values()),
  };
});

const totalEventsCount = computed<number>(() => eventsList.value.length);

const totalCitiesCount = computed<number>(() => eventDistributionByCity.value.labels.length);

const topCityInfo = computed<{ name: string; count: number }>(() => {
  const { labels, data } = eventDistributionByCity.value;

  let maxIndex = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i]! > data[maxIndex]!) {
      maxIndex = i;
    }
  }

  return {
    name: labels[maxIndex]!,
    count: data[maxIndex]!,
  };
});

const cityBreakdown = computed<
  Array<{ city: string; numberOfEventsPerCity: number; percentage: number }>
>(() => {
  const { labels, data } = eventDistributionByCity.value;

  return labels.map((city, index) => {
    const numberOfEventsPerCity = data[index]!;
    const percentage = Math.round((numberOfEventsPerCity / totalEventsCount.value) * 100);
    return { city, numberOfEventsPerCity, percentage };
  });
});
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

    <!-- Summary Metrics Cards -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- Card: Total Events -->
      <div class="rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-xl">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">Total Events</p>
        <p class="mt-2 font-display text-3xl font-bold text-white">
          {{ totalEventsCount }}
        </p>
      </div>

      <!-- Card: Cities Covered -->
      <div class="rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-xl">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">Cities Covered</p>
        <p class="mt-2 font-display text-3xl font-bold text-rose-gold">
          {{ totalCitiesCount }}
        </p>
      </div>

      <!-- Card: Top City -->
      <div class="rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-xl">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">Top City</p>
        <div class="mt-2 flex items-baseline gap-2">
          <p class="font-display text-2xl font-bold text-white">
            {{ topCityInfo.name }}
          </p>
          <span class="font-mono text-xs text-rose-light"> ({{ topCityInfo.count }} events) </span>
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
            v-for="item in cityBreakdown"
            :key="item.city"
            class="rounded-xl border border-white/5 bg-midnight-lift p-4"
          >
            <div class="mb-2 flex items-center justify-between text-sm">
              <span class="font-medium text-white">{{ item.city }}</span>
              <span class="font-mono text-xs text-rose-gold">
                {{ item.numberOfEventsPerCity }}
                {{ item.numberOfEventsPerCity === 1 ? 'event' : 'events' }} ({{ item.percentage }}%)
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
  </section>
</template>
