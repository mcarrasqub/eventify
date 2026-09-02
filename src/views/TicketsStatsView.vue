<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';

import BarGraphComponent from '@/components/BarGraphComponent.vue';
import FilterSelectorComponent from '@/components/FilterSelectorComponent.vue';
import GraphComponent from '@/components/PieGraphComponent.vue';
import type { SelectorOption } from '@/components/FilterSelectorComponent.vue';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';
import { EventService } from '@/services/EventService.js';
import { TicketService } from '@/services/TicketService.js';

// Variables reactivas
const eventSelector = ref<string>('');

// Variables
const eventOptions: SelectorOption[] = EventService.getEvents().map((event) => ({
  label: event.title,
  value: String(event.id),
}));

const pieLabels = ['Tickets sold', 'Tickets available'];

const revenueLabels = computed<string[]>(() =>
  EventService.getEvents().map((event) => event.title),
);

// Computed
const filteredTickets = computed<TicketInterface[]>(() => {
  if (!eventSelector.value) {
    return TicketService.getTickets();
  }

  return TicketService.getTicketByEventId(Number(eventSelector.value));
});

const selectedEventId = computed<number | null>(() => {
  if (!eventSelector.value) {
    return null;
  }

  return Number(eventSelector.value);
});

const selectedEventTitle = computed<string>(() => {
  if (!selectedEventId.value) {
    return 'All events';
  }

  return EventService.getEventTitle(selectedEventId.value);
});

const ticketStatusChartData = computed<number[]>(() => {
  if (!selectedEventId.value) {
    const totals = EventService.getEvents().reduce(
      (totals, event) => {
        totals.sold += TicketService.getSoldTicketsCount(event.id);
        totals.available += TicketService.getAvailableTickets(event.id);

        return totals;
      },
      { sold: 0, available: 0 },
    );

    return [totals.sold, totals.available];
  }

  return [
    TicketService.getSoldTicketsCount(selectedEventId.value),
    TicketService.getAvailableTickets(selectedEventId.value),
  ];
});

const revenueChartData = computed<number[]>(() =>
  EventService.getEvents().map((event) => EventService.getEventRevenue(event.id)),
);
</script>

<template>
  <!-- Tickets Stats Section -->
  <section class="mx-auto max-w-7xl">
    <!-- View Header & Selector -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <!-- Title & Description -->
      <div>
        <p class="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          Ticket control center
        </p>
        <h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Admin Tickets
        </h2>
      </div>

      <!-- Event Selector -->
      <div class="w-full sm:w-auto">
        <FilterSelectorComponent
          id="ticket-event-selector"
          v-model="eventSelector"
          label="Select event"
          :options="eventOptions"
          placeholder="All Events"
          :placeholder-value="''"
          class="sm:min-w-72"
        />
      </div>
    </div>

    <!-- Revenue Overview / Bar Graph -->
    <div class="mb-8 rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-xl">
      <div class="mb-4">
        <h3 class="font-display text-lg font-semibold text-white">Revenue by Event</h3>
        <p class="text-xs text-ink-muted">Total revenue across all events</p>
      </div>
      <div class="mx-auto max-w-5xl">
        <BarGraphComponent
          :data="revenueChartData"
          :labels="revenueLabels"
          :background-color="[
            '#c9956c',
            '#d4a276',
            '#7b5ea7',
            '#b48fd8',
            '#f0b3a5',
            '#9bae61',
            '#8fb5d9',
            '#ec9f9f',
            '#6dc7bf',
            '#d7b8a6',
            '#a5b4fc',
            '#d2b3f0',
          ]"
          :border-color="'#111827'"
          title="Event revenue"
        />
      </div>
    </div>

    <!-- Statistics Overview / Graph -->
    <div class="mb-8 rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-xl">
      <div class="mb-4">
        <h3 class="font-display text-lg font-semibold text-white">Ticket Status Overview</h3>
        <p class="text-xs text-ink-muted">
          {{
            selectedEventTitle === 'All events'
              ? 'General distribution overview'
              : selectedEventTitle
          }}
        </p>
      </div>
      <div class="mx-auto max-w-md">
        <GraphComponent
          :data="ticketStatusChartData"
          :labels="pieLabels"
          :background-color="['#c9956c', '#7b5ea7']"
          :border-color="'#111827'"
          :legend-position="'bottom'"
          :title="selectedEventTitle === 'All events' ? 'Overall sales' : 'Sales by event'"
        />
      </div>
    </div>

    <!-- Tickets Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="ticket in filteredTickets" :key="ticket.id">
        <!-- Ticket Card -->
        <div
          class="group rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-rose-gold/40"
        >
          <!-- Ticket Header -->
          <div class="mb-4 flex items-start justify-between gap-3">
            <h3 class="font-display text-xl font-semibold text-white">
              {{ EventService.getEventTitle(ticket.eventId) }}
            </h3>
            <span
              class="rounded-full border border-deep-purple/40 bg-deep-purple/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-purple-200"
            >
              #{{ ticket.id }}
            </span>
          </div>

          <!-- Ticket Image -->
          <div class="mb-4 overflow-hidden rounded-xl border border-white/10">
            <img
              src="https://picsum.photos/seed/picsum/536/354"
              alt="Ticket image"
              class="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <!-- Ticket Status -->
          <p class="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            Status: <span class="text-rose-light">{{ ticket.status }}</span>
          </p>

          <!-- Ticket Price Details -->
          <div class="rounded-xl border border-rose-gold/25 bg-rose-gold/10 p-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-muted">Price</span>
              <span class="font-mono text-base font-medium text-rose-light">
                {{ EventService.getEventPriceById(ticket.eventId) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
