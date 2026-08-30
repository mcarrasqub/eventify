<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';

import GraphComponent from '@/components/GraphComponent.vue';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';
import { EventService } from '@/services/EventService.js';
import { TicketService } from '@/services/TicketService.js';

// Reactive variables
const eventSelector = ref<string>('');

// Variables
const eventOptions: { eventId: string; title: string }[] =
  TicketService.getUniqueTicketEvents().map((eventId) => ({
    eventId,
    title: EventService.getEventTitle(Number(eventId)),
  }));

// Computed
const filteredTickets = computed<TicketInterface[]>(() => {
  if (!eventSelector.value) {
    return TicketService.getTickets();
  }

  return TicketService.getTicketByEventId(Number(eventSelector.value));
});
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
        <label
          for="ticket-event-selector"
          class="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
        >
          Select event
        </label>
        <select
          id="ticket-event-selector"
          v-model="eventSelector"
          class="w-full rounded-xl border border-white/15 bg-midnight-soft px-4 py-3 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 sm:min-w-72"
        >
          <option value="" class="bg-midnight text-white">All Events</option>
          <option
            v-for="event in eventOptions"
            :key="event.eventId"
            :value="event.eventId"
            class="bg-midnight text-white"
          >
            {{ event.title }}
          </option>
        </select>
      </div>
    </div>

    <!-- Statistics Overview / Graph -->
    <div class="mb-8 rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-xl">
      <div class="mb-4">
        <h3 class="font-display text-lg font-semibold text-white">Ticket Status Overview</h3>
        <p class="text-xs text-ink-muted">General distribution overview</p>
      </div>
      <div class="mx-auto max-w-xs">
        <GraphComponent />
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
                {{ ticket.price }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
