<script setup lang="ts">
// External Imports
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

// Internal Imports
import MapComponent from '@/components/MapComponent.vue';
import type { CreateTicketDTO } from '@/dtos/TicketDTO.js';
import { AuthService } from '@/services/AuthService.js';
import { EventService } from '@/services/EventService.js';
import { TicketService } from '@/services/TicketService.js';
import { VenueService } from '@/services/VenueService.js';

// Variables
const route = useRoute();
const eventId = Number(route.params.id);

// Reactive variables
const quantitySelector = ref<number>(1);
const purchaseMessage = ref<string>('');

// Computed
const event = computed(() => EventService.getById(eventId)!);

const venue = computed(() => VenueService.getById(event.value.venueId));

const availableTickets = computed<number>(() => TicketService.getAvailableTickets(event.value.id));

const soldTickets = computed<number>(() => TicketService.getSoldTicketsCount(event.value.id));

const ticketUnitPrice = computed<number>(() => EventService.getPriceById(event.value.id));

const totalCost = computed<number>(() => quantitySelector.value * ticketUnitPrice.value);

// Methods
function handlePurchase(): void {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    purchaseMessage.value = 'You must log in to acquire tickets.';
    return;
  }

  const ticketDTO: CreateTicketDTO = {
    eventId: event.value.id,
    quantity: quantitySelector.value,
    status: 'UNUSED',
    userId: currentUser.id,
  };

  const createdTickets = TicketService.create(ticketDTO);

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

    <!-- Main Grid -->
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
      <!-- Left Column: Details & Map -->
      <div class="space-y-8 lg:col-span-2">
        <!-- Event Main Card -->
        <div class="overflow-hidden rounded-3xl border border-white/10 bg-midnight-soft shadow-xl">
          <div class="relative h-72 sm:h-96">
            <img
              :src="event.imageURL"
              :alt="event.title"
              class="h-full w-full object-cover opacity-80"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-midnight-soft via-midnight-soft/30 to-transparent"
            ></div>
            <div class="absolute bottom-6 left-6 right-6 space-y-2">
              <span
                class="rounded-full bg-rose-gold/20 px-3 py-1 font-mono text-xs font-semibold text-rose-gold"
              >
                {{ event.category }}
              </span>
              <h1 class="font-display text-3xl font-bold text-white sm:text-4xl">
                {{ event.title }}
              </h1>
            </div>
          </div>

          <div class="space-y-6 p-6 sm:p-8">
            <p class="text-sm leading-relaxed text-ink-muted sm:text-base">
              {{ event.description }}
            </p>

            <!-- Event Metadata Grid -->
            <div class="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-midnight p-4">
              <div>
                <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">Date</p>
                <p class="mt-1 text-sm font-semibold text-white">{{ event.date }}</p>
              </div>
              <div>
                <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">Time</p>
                <p class="mt-1 text-sm font-semibold text-white">{{ event.time }}</p>
              </div>
              <div>
                <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">Duration</p>
                <p class="mt-1 text-sm font-semibold text-white">{{ event.duration }}</p>
              </div>
              <div>
                <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">Status</p>
                <p
                  :class="[
                    'mt-1 font-mono text-xs font-bold uppercase',
                    event.status === 'Active' ? 'text-emerald-400' : 'text-rose-400',
                  ]"
                >
                  {{ event.status }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Venue & Location Section -->
        <div
          v-if="venue"
          class="space-y-6 rounded-3xl border border-white/10 bg-midnight-soft p-6 sm:p-8"
        >
          <div>
            <h2 class="font-display text-2xl font-bold text-white">Location & Venue</h2>
            <p class="mt-1 text-xs text-ink-muted">Venue details and geographic location</p>
          </div>

          <div
            class="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-midnight p-5 sm:grid-cols-3"
          >
            <div>
              <p class="font-mono text-xs uppercase tracking-wider text-rose-gold">Venue</p>
              <p class="mt-1 font-semibold text-white">{{ venue.name }}</p>
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

          <!-- Venue Map -->
          <MapComponent
            :latitude="venue.latitude"
            :longitude="venue.longitude"
            :name="venue.name"
            :address="`${venue.address}, ${venue.city}`"
          />
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
              <span class="font-mono text-lg font-bold text-rose-gold">
                ${{ ticketUnitPrice }}
              </span>
            </div>
            <div class="flex items-center justify-between border-t border-rose-gold/20 pt-3">
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
                  v-for="quantity in Math.min(availableTickets, 10)"
                  :key="quantity"
                  :value="quantity"
                  class="bg-midnight text-white"
                >
                  {{ quantity }} {{ quantity === 1 ? 'ticket' : 'tickets' }}
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
              :class="[
                'flex flex-col gap-2 rounded-xl border p-3.5 text-xs leading-relaxed',
                AuthService.getCurrentUser()
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-300',
              ]"
            >
              <p>{{ purchaseMessage }}</p>
              <RouterLink
                v-if="!AuthService.getCurrentUser()"
                to="/login"
                class="inline-flex w-fit items-center gap-1 font-semibold text-rose-gold underline hover:text-rose-light"
              >
                Go to Log In →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
