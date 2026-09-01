<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { CreateTicketDTO } from '@/dtos/TicketDTO.js';
import { EventService } from '@/services/EventService.js';
import { TicketService } from '@/services/TicketService.js';
import { UserService } from '@/services/UserService.js';
import { VenueService } from '@/services/VenueService.js';

// Variables
const route = useRoute();
const eventId = Number(route.params.id);

// Reactive variables
const quantitySelector = ref<number>(1);
const purchaseMessage = ref<string>('');

// Computed
const event = computed(() => EventService.getEventById(eventId)!);

const venue = computed(() => VenueService.getVenueById(event.value.venueId));

const availableTickets = computed<number>(() => TicketService.getAvailableTickets(event.value.id));

const soldTickets = computed<number>(() => TicketService.getSoldTicketsCount(event.value.id));

const ticketUnitPrice = computed<number>(() => EventService.getEventPriceById(event.value.id));

const totalCost = computed<number>(() => quantitySelector.value * ticketUnitPrice.value);

// Methods
function handlePurchase(): void {
  const currentUser = UserService.getCurrentUser();

  const ticketDTO: CreateTicketDTO = {
    eventId: event.value.id,
    quantity: quantitySelector.value,
    status: 'UNUSED',
    userId: currentUser ? currentUser.id : 1,
  };

  const createdTickets = TicketService.createTicket(ticketDTO);

  if (createdTickets) {
    purchaseMessage.value = `Successfully acquired ${createdTickets.length} ticket(s) for "${event.value.title}"!`;
  } else {
    purchaseMessage.value = 'Could not complete the purchase. Please check ticket availability.';
  }
}
</script>

<template>
  <!-- View Container -->
  <section class="mx-auto max-w-7xl space-y-8">
    <!-- Navigation Breadcrumb -->
    <div>
      <RouterLink
        to="/explore"
        class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-gold transition hover:text-rose-light"
      >
        ← Back to events
      </RouterLink>
    </div>

    <!-- Event Details & Purchase Grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- Main Event Information -->
      <div class="space-y-6 lg:col-span-2">
        <!-- Event Banner Image -->
        <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-midnight">
          <img :src="event.imageURL" :alt="event.title" class="h-72 w-full object-cover sm:h-96" />
          <div class="absolute top-4 right-4 flex gap-2">
            <span
              class="rounded-full border border-white/20 bg-midnight/80 px-3 py-1 font-mono text-xs font-medium text-rose-gold backdrop-blur"
            >
              {{ event.type }}
            </span>
            <span
              class="rounded-full border border-white/20 bg-midnight/80 px-3 py-1 font-mono text-xs font-medium text-rose-light backdrop-blur"
            >
              {{ event.category }}
            </span>
          </div>
        </div>

        <!-- Title & Basic Details -->
        <div class="rounded-2xl border border-white/10 bg-midnight-soft p-6 sm:p-8">
          <div class="mb-3 flex items-center justify-between">
            <span
              class="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400"
            >
              {{ event.status }}
            </span>
            <span class="font-mono text-xs text-ink-muted">
              {{ event.date }} • {{ event.time }}
            </span>
          </div>

          <h1 class="font-display text-3xl font-bold text-white sm:text-4xl">
            {{ event.title }}
          </h1>

          <div
            class="mt-4 flex flex-wrap gap-4 border-t border-white/10 pt-4 font-mono text-xs text-ink-muted"
          >
            <div><span class="text-white">Duration:</span> {{ event.duration }}</div>
            <div><span class="text-white">Category:</span> {{ event.category }}</div>
            <div><span class="text-white">Type:</span> {{ event.type }}</div>
          </div>

          <!-- Description -->
          <div class="mt-6 border-t border-white/10 pt-6">
            <h2 class="font-display text-xl font-semibold text-white">About the Event</h2>
            <p class="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              {{ event.description }}
            </p>
          </div>
        </div>

        <!-- Venue Information -->
        <div v-if="venue" class="rounded-2xl border border-white/10 bg-midnight-soft p-6 sm:p-8">
          <h2 class="font-display text-xl font-semibold text-white">Location & Venue</h2>
          <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">Venue</p>
              <p class="mt-1 text-sm font-semibold text-white">{{ venue.name }}</p>
            </div>
            <div>
              <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">
                City & Address
              </p>
              <p class="mt-1 text-sm text-ink-muted">{{ venue.address }}, {{ venue.city }}</p>
            </div>
            <div>
              <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">
                Total Capacity
              </p>
              <p class="mt-1 font-mono text-sm text-white">{{ venue.capacity }} attendees</p>
            </div>
            <div>
              <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">Tickets Sold</p>
              <p class="mt-1 font-mono text-sm text-purple-200">{{ soldTickets }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Ticket Acquisition Card & Selector -->
      <div class="space-y-6">
        <div class="sticky top-6 rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-xl">
          <h2 class="font-display text-2xl font-bold text-white">Get Tickets</h2>
          <p class="mt-1 text-xs text-ink-muted">Select quantity and acquire your access</p>

          <!-- Pricing & Availability -->
          <div class="mt-6 space-y-3 rounded-xl border border-rose-gold/25 bg-rose-gold/10 p-4">
            <div class="flex items-center justify-between">
              <span class="text-xs text-ink-muted">Price per ticket</span>
              <span class="font-mono text-lg font-bold text-rose-light">
                ${{ ticketUnitPrice }}
              </span>
            </div>
            <div class="flex items-center justify-between border-t border-rose-gold/20 pt-2">
              <span class="text-xs text-ink-muted">Available tickets</span>
              <span
                :class="[
                  'font-mono text-xs font-bold',
                  availableTickets > 0 ? 'text-emerald-400' : 'text-rose-400',
                ]"
              >
                {{ availableTickets > 0 ? `${availableTickets} remaining` : 'Sold out' }}
              </span>
            </div>
          </div>

          <!-- Purchase Form -->
          <div class="mt-6 space-y-4">
            <!-- Ticket Quantity Selector -->
            <div>
              <label
                for="ticket-quantity-selector"
                class="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
              >
                Quantity selector
              </label>
              <select
                id="ticket-quantity-selector"
                v-model.number="quantitySelector"
                :disabled="availableTickets === 0"
                class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-3 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 disabled:opacity-50"
              >
                <option v-if="availableTickets === 0" :value="0" class="bg-midnight text-white">
                  0 tickets
                </option>
                <option
                  v-for="qty in Math.min(availableTickets, 10)"
                  :key="qty"
                  :value="qty"
                  class="bg-midnight text-white"
                >
                  {{ qty }} {{ qty === 1 ? 'ticket' : 'tickets' }}
                </option>
              </select>
            </div>

            <!-- Total Calculation -->
            <div class="flex items-center justify-between rounded-xl bg-midnight px-4 py-3 text-sm">
              <span class="text-ink-muted">Total amount:</span>
              <span class="font-mono text-lg font-bold text-white"> ${{ totalCost }} </span>
            </div>

            <!-- Purchase Button -->
            <button
              type="button"
              :disabled="availableTickets === 0"
              @click="handlePurchase"
              class="w-full rounded-xl bg-rose-gold py-3.5 font-display text-sm font-bold text-midnight transition hover:bg-rose-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              {{ availableTickets === 0 ? 'Sold Out' : 'Acquire Tickets' }}
            </button>

            <!-- Feedback Alert -->
            <div
              v-if="purchaseMessage"
              class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs leading-relaxed text-emerald-300"
            >
              {{ purchaseMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
