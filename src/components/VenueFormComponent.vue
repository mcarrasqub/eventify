<script setup lang="ts">
// Imports
import { computed, ref, watch } from 'vue';

import type { CreateVenueDTO, UpdateVenueDTO } from '@/dtos/VenueDTO.js';
import type { VenueInterface } from '@/interfaces/VenueInterface.js';
import { VenueService } from '@/services/VenueService.js';

// Props
const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    venue?: VenueInterface | null;
  }>(),
  {
    isOpen: false,
    venue: null,
  },
);

// Emits
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved', venue: VenueInterface): void;
}>();

// Variables reactivas (Formulario y Errores)
const name = ref<string>('');
const city = ref<string>('');
const address = ref<string>('');
const capacity = ref<number>(500);
const imageURL = ref<string>('');
const errorMessage = ref<string>('');

// Computed
const isEditMode = computed<boolean>(() => !!props.venue);

// Watcher para sincronizar datos al abrir el modal o cambiar el venue
watch(
  () => [props.isOpen, props.venue],
  () => {
    if (props.isOpen) {
      errorMessage.value = '';
      if (props.venue) {
        name.value = props.venue.name;
        city.value = props.venue.city;
        address.value = props.venue.address;
        capacity.value = props.venue.capacity;
        imageURL.value = props.venue.imageURL ?? '';
      } else {
        resetForm();
      }
    }
  },
  { immediate: true },
);

// Métodos
function resetForm(): void {
  name.value = '';
  city.value = '';
  address.value = '';
  capacity.value = 500;
  imageURL.value =
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80';
  errorMessage.value = '';
}

function handleClose(): void {
  errorMessage.value = '';
  emit('close');
}

function validateForm(): boolean {
  if (!name.value.trim()) {
    errorMessage.value = 'Venue name is required.';
    return false;
  }
  if (!city.value.trim()) {
    errorMessage.value = 'Venue city is required.';
    return false;
  }
  if (!address.value.trim()) {
    errorMessage.value = 'Venue address is required.';
    return false;
  }
  if (!capacity.value || capacity.value <= 0) {
    errorMessage.value = 'Capacity must be greater than 0.';
    return false;
  }

  errorMessage.value = '';
  return true;
}

function handleSubmit(): void {
  if (!validateForm()) {
    return;
  }

  if (isEditMode.value && props.venue) {
    const updateDTO: UpdateVenueDTO = {
      address: address.value,
      capacity: Number(capacity.value),
      city: city.value,
      imageURL: imageURL.value.trim() || undefined,
      name: name.value,
    };

    const updated = VenueService.updateVenue(props.venue.id, updateDTO);
    if (updated) {
      const refreshed = VenueService.getVenueById(props.venue.id);
      if (refreshed) {
        emit('saved', refreshed);
      }
      handleClose();
    } else {
      errorMessage.value = 'Could not update the venue. Please try again.';
    }
  } else {
    const createDTO: CreateVenueDTO = {
      address: address.value,
      capacity: Number(capacity.value),
      city: city.value,
      eventIds: [],
      imageURL:
        imageURL.value.trim() ||
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80',
      name: name.value,
    };

    const newVenue = VenueService.createVenue(createDTO);
    emit('saved', newVenue);
    handleClose();
  }
}
</script>

<template>
  <!-- Modal Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
    @click.self="handleClose"
  >
    <!-- Modal Card Container -->
    <div
      class="relative my-8 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-2xl sm:p-8"
    >
      <!-- Encabezado del Modal -->
      <div class="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-rose-gold">
            {{ isEditMode ? 'Modify venue record' : 'New venue record' }}
          </p>
          <h3 class="font-display text-2xl font-bold tracking-tight text-white">
            {{ isEditMode ? 'Edit Venue' : 'Create Venue' }}
          </h3>
        </div>
        <button
          type="button"
          class="rounded-lg border border-white/10 p-2 text-ink-muted transition hover:bg-white/10 hover:text-white"
          @click="handleClose"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mensaje de Error -->
      <div
        v-if="errorMessage"
        class="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-400"
      >
        {{ errorMessage }}
      </div>

      <!-- Formulario de Venue -->
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Nombre del Venue -->
        <div class="flex flex-col gap-1.5">
          <label
            for="venue-name"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Venue Name *
          </label>
          <input
            id="venue-name"
            v-model="name"
            type="text"
            required
            placeholder="e.g. Grand Convention Center"
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Fila de Ciudad y Capacidad -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label
              for="venue-city"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              City *
            </label>
            <input
              id="venue-city"
              v-model="city"
              type="text"
              required
              placeholder="e.g. Bogotá, Medellín"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="venue-capacity"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Capacity (People) *
            </label>
            <input
              id="venue-capacity"
              v-model.number="capacity"
              type="number"
              min="1"
              required
              placeholder="e.g. 1500"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>
        </div>

        <!-- Dirección -->
        <div class="flex flex-col gap-1.5">
          <label
            for="venue-address"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Address *
          </label>
          <input
            id="venue-address"
            v-model="address"
            type="text"
            required
            placeholder="e.g. Calle 100 # 15-20"
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- URL de Imagen -->
        <div class="flex flex-col gap-1.5">
          <label
            for="venue-image"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Image URL
          </label>
          <input
            id="venue-image"
            v-model="imageURL"
            type="url"
            placeholder="https://images.unsplash.com/..."
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Botones de Acción -->
        <div class="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            class="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-white/10 hover:text-white"
            @click="handleClose"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-xl bg-rose-gold px-6 py-2.5 font-display text-sm font-bold text-midnight transition hover:bg-rose-light"
          >
            {{ isEditMode ? 'Save Changes' : 'Create Venue' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
