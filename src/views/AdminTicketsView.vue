<script setup lang="ts">
//external imports
import { computed, ref } from 'vue';

//internal imports
import { TicketService } from '@/services/TicketService.js';
import { EventService } from '@/services/EventService.js';

//variables
const tickets = TicketService.getTickets();

//selectors
const selectorEvents = computed(() => TicketService.getUniqueTicketEvents());
const selectorEventOptions = computed(() =>
  selectorEvents.value.map((eventId) => ({
    eventId,
    title: getEventTitle(Number(eventId)),
  })),
);
const selectedEvent = ref('');

//reactive variables
const filteredTickets = computed(() => {
  if (!selectedEvent.value) {
    return tickets;
  }

  return tickets.filter((ticket) => ticket.eventId.toString() === selectedEvent.value);
});

//functions
function getEventTitle(eventId: number): string {
  const event = EventService.getEventById(eventId);
  return event ? event.title : 'Unknown Event';
}
</script>

<template>
  <section class="mx-auto max-w-7xl">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          Ticket control center
        </p>
        <h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Admin Tickets
        </h2>
      </div>

      <div class="w-full sm:w-auto">
        <label
          for="ticket-event-filter"
          class="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >Filter by event</label
        >
        <select
          id="ticket-event-filter"
          v-model="selectedEvent"
          class="w-full rounded-xl border border-white/15 bg-midnight-soft px-4 py-3 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 sm:min-w-72"
        >
          <option value="" class="bg-midnight text-white">All Events</option>
          <option
            v-for="event in selectorEventOptions"
            :key="event.eventId"
            :value="event.eventId"
            class="bg-midnight text-white"
          >
            {{ event.title }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="ticket in filteredTickets" :key="ticket.id">
          <div
            class="group rounded-2xl border border-white/10 bg-midnight-soft p-5 shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-rose-gold/40"
          >
            <div class="mb-4 flex items-start justify-between gap-3">
              <h3 class="font-display text-xl font-semibold text-white">
                {{ getEventTitle(ticket.eventId) }}
              </h3>
              <span
                class="rounded-full border border-deep-purple/40 bg-deep-purple/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-purple-200"
              >
                #{{ ticket.id }}
              </span>
            </div>

            <div class="mb-4 overflow-hidden rounded-xl border border-white/10">
              <img
                src="https://picsum.photos/seed/picsum/536/354"
                alt="Ticket image"
                class="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <p class="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
              Status: <span class="text-rose-light">{{ ticket.status }}</span>
            </p>

            <div class="rounded-xl border border-rose-gold/25 bg-rose-gold/10 p-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-ink-muted">Price</span>
                <span class="font-mono text-base font-medium text-rose-light">{{
                  ticket.price
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
