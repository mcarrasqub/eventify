<script setup lang="ts">
// External Imports
import { computed, onMounted, ref, watch } from 'vue';

// Internal Imports
import BarGraphComponent from '@/components/graphs/BarGraphComponent.vue';
import { ErrorHandlerService } from '@/services/ErrorHandlerService.js';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import type { EventRevenueDTO, TicketDistributionDTO } from '@/dtos/TicketDTO.js';
import { EventService } from '@/services/EventService.js';
import FilterSelectorComponent from '@/components/FilterSelectorComponent.vue';
import GraphComponent from '@/components/graphs/PieGraphComponent.vue';
import type { SelectorOption } from '@/components/FilterSelectorComponent.vue';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';
import { TicketService } from '@/services/TicketService.js';

// Reactive State
const eventSelector = ref<string>('');
const eventsList = ref<EventInterface[]>([]);
const revenueData = ref<EventRevenueDTO[]>([]);
const ticketDistribution = ref<TicketDistributionDTO | null>(null);
const filteredTickets = ref<TicketInterface[]>([]);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string>('');

// Variables
const pieLabels = ['Tickets sold', 'Tickets available'];

// Initial Data Fetching
onMounted(async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const [eventsRes, revenueRes, distRes, ticketsRes] = await Promise.all([
      EventService.getAll(),
      TicketService.getRevenueByEvent(),
      TicketService.getTicketDistribution(),
      TicketService.getAll(),
    ]);
    eventsList.value = eventsRes;
    revenueData.value = revenueRes;
    ticketDistribution.value = distRes;
    filteredTickets.value = ticketsRes;
  } catch (err: unknown) {
    errorMessage.value = ErrorHandlerService.getErrorMessage(err, 'Failed to load ticket statistics.');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

// Watch selector changes
watch(eventSelector, async (newVal) => {
  const eventId = newVal ? Number(newVal) : undefined;
  try {
    const [distRes, ticketsRes] = await Promise.all([
      TicketService.getTicketDistribution(eventId),
      TicketService.getAll(eventId),
    ]);
    ticketDistribution.value = distRes;
    filteredTickets.value = ticketsRes;
  } catch (err: unknown) {
    console.error('Failed to filter tickets:', err);
  }
});

// Computed
const eventOptions = computed<SelectorOption[]>(() =>
  eventsList.value.map((event) => ({
    label: event.title,
    value: String(event.id),
  })),
);

const revenueLabels = computed<string[]>(() => revenueData.value.map((item) => item.eventTitle));

const revenueChartData = computed<number[]>(() => revenueData.value.map((item) => item.revenue));

const selectedEventTitle = computed<string>(() => {
  if (!eventSelector.value) {
    return 'All events';
  }
  const found = eventsList.value.find((e) => String(e.id) === eventSelector.value);
  return found?.title ?? 'Unknown Event';
});

const ticketStatusChartData = computed<number[]>(() => {
  if (!ticketDistribution.value) {
    return [0, 0];
  }
  return [ticketDistribution.value.sold, ticketDistribution.value.available];
});

const getEventForTicket = (eventId: number): EventInterface | undefined => {
  return eventsList.value.find((e) => e.id === eventId);
};
</script>

<template>
  <!-- Tickets Stats Section -->
  <section class="mx-auto max-w-7xl">
    <!-- View Header -->
    <div class="mb-8">
      <p class="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
        Ticket control center
      </p>
      <h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Admin Tickets
      </h2>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="py-12 text-center font-mono text-sm text-ink-muted">
      Loading tickets statistics...
    </div>

    <!-- Error State -->
    <div
      v-else-if="errorMessage"
      class="rounded-xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-sm text-rose-400"
    >
      {{ errorMessage }}
    </div>

    <template v-else>
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

      <!-- Filter Selector -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="font-display text-xl font-semibold text-white">Filter Tickets</h3>
          <p class="text-xs text-ink-muted">Select an event to filter tickets</p>
        </div>
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

      <!-- Statistics Overview / Graph -->
      <div class="mb-8 rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-xl">
        <div class="mb-4">
          <h3 class="font-display text-lg font-semibold text-white">Ticket Overview</h3>
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

      <!-- Sold Tickets Header -->
      <div class="mb-6">
        <h3 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Sold Tickets - {{ selectedEventTitle }}
        </h3>
      </div>

      <!-- Empty State for Tickets -->
      <div
        v-if="filteredTickets.length === 0"
        class="rounded-xl border border-white/10 bg-midnight-soft p-8 text-center text-sm text-ink-muted"
      >
        No tickets found for {{ selectedEventTitle }}.
      </div>

      <!-- Tickets Grid -->
      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="ticket in filteredTickets" :key="ticket.id">
          <!-- Ticket Card -->
          <div
            class="group rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-rose-gold/40"
          >
            <!-- Ticket Header -->
            <div class="mb-4 flex items-start justify-between gap-3">
              <h3 class="font-display text-xl font-semibold text-white">
                {{ getEventForTicket(ticket.eventId)?.title ?? 'Unknown Event' }}
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
                :src="getEventForTicket(ticket.eventId)?.imageURL ?? ''"
                :alt="getEventForTicket(ticket.eventId)?.title ?? 'Unknown Event'"
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
                  ${{ getEventForTicket(ticket.eventId)?.price ?? 0 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
