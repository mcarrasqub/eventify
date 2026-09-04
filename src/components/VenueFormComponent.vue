<script setup lang="ts">
// External Imports
import { computed, ref, watch } from 'vue';

// Internal Imports
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

// Helper Functions
// Generates an empty initial form state for new venue creation
function getInitialForm(): CreateVenueDTO {
  return {
    address: '',
    capacity: '' as unknown as number,
    city: '',
    eventIds: [],
    imageURL: '',
    latitude: '' as unknown as number,
    longitude: '' as unknown as number,
    name: '',
  };
}

// Reactive State (Form & UI)
const form = ref<CreateVenueDTO>(getInitialForm());
const errorMessage = ref<string>('');

// Computed
const isEditMode = computed<boolean>(() => !!props.venue);

// Watchers
// Synchronize form state whenever modal opens or active venue prop changes
watch(
  () => [props.isOpen, props.venue],
  () => {
    if (props.isOpen) {
      errorMessage.value = '';
      if (props.venue) {
        // Populate existing venue data when in edit mode
        form.value = {
          address: props.venue.address,
          capacity: props.venue.capacity,
          city: props.venue.city,
          eventIds: props.venue.eventIds ?? [],
          imageURL: props.venue.imageURL ?? '',
          latitude: props.venue.latitude ?? ('' as unknown as number),
          longitude: props.venue.longitude ?? ('' as unknown as number),
          name: props.venue.name,
        };
      } else {
        resetForm();
      }
    }
  },
  { immediate: true },
);

// Methods
function resetForm(): void {
  form.value = getInitialForm();
  errorMessage.value = '';
}

function handleClose(): void {
  errorMessage.value = '';
  emit('close');
}

function validateForm(): boolean {
  if (!form.value.name.trim()) {
    errorMessage.value = 'Venue name is required.';
    return false;
  }
  if (!form.value.city.trim()) {
    errorMessage.value = 'Venue city is required.';
    return false;
  }
  if (!form.value.address.trim()) {
    errorMessage.value = 'Venue address is required.';
    return false;
  }
  if (
    form.value.capacity === undefined ||
    form.value.capacity === null ||
    form.value.capacity === ('' as unknown as number) ||
    Number(form.value.capacity) <= 0
  ) {
    errorMessage.value = 'Capacity must be greater than 0.';
    return false;
  }

  // Validate optional geographic coordinates
  const lat = form.value.latitude;
  const lng = form.value.longitude;
  const hasLat = lat !== undefined && lat !== null && lat !== ('' as unknown as number);
  const hasLng = lng !== undefined && lng !== null && lng !== ('' as unknown as number);

  // Both latitude and longitude must be provided together
  if (hasLat && !hasLng) {
    errorMessage.value = 'Please provide longitude along with latitude.';
    return false;
  }
  if (!hasLat && hasLng) {
    errorMessage.value = 'Please provide latitude along with longitude.';
    return false;
  }

  // Check valid geographic range: Latitude [-90, 90], Longitude [-180, 180]
  if (hasLat && hasLng) {
    const numLat = Number(lat);
    const numLng = Number(lng);

    if (isNaN(numLat) || numLat < -90 || numLat > 90) {
      errorMessage.value = 'Latitude must be a valid number between -90 and 90.';
      return false;
    }
    if (isNaN(numLng) || numLng < -180 || numLng > 180) {
      errorMessage.value = 'Longitude must be a valid number between -180 and 180.';
      return false;
    }
  }

  errorMessage.value = '';
  return true;
}

function handleSubmit(): void {
  if (!validateForm()) {
    return;
  }

  // Parse coordinates into numeric values if provided
  const parsedLatitude =
    form.value.latitude !== undefined &&
    form.value.latitude !== null &&
    form.value.latitude !== ('' as unknown as number)
      ? Number(form.value.latitude)
      : undefined;

  const parsedLongitude =
    form.value.longitude !== undefined &&
    form.value.longitude !== null &&
    form.value.longitude !== ('' as unknown as number)
      ? Number(form.value.longitude)
      : undefined;

  if (isEditMode.value && props.venue) {
    const updateDTO: UpdateVenueDTO = {
      address: form.value.address,
      capacity: Number(form.value.capacity),
      city: form.value.city,
      imageURL: form.value.imageURL?.trim() || undefined,
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      name: form.value.name,
    };

    const updated = VenueService.update(props.venue.id, updateDTO);
    if (updated) {
      const refreshed = VenueService.getById(props.venue.id);
      if (refreshed) {
        emit('saved', refreshed);
      }
      handleClose();
    } else {
      errorMessage.value = 'Could not update the venue. Please try again.';
    }
  } else {
    // Create new venue record
    const createDTO: CreateVenueDTO = {
      address: form.value.address,
      capacity: Number(form.value.capacity),
      city: form.value.city,
      eventIds: form.value.eventIds ?? [],
      imageURL: form.value.imageURL?.trim() || undefined,
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      name: form.value.name,
    };

    const newVenue = VenueService.create(createDTO);
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
      <!-- Modal Header -->
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

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-400"
      >
        {{ errorMessage }}
      </div>

      <!-- Venue Form -->
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Venue Name -->
        <div class="flex flex-col gap-1.5">
          <label
            for="venue-name"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Venue Name *
          </label>
          <input
            id="venue-name"
            v-model="form.name"
            type="text"
            required
            placeholder="e.g. Grand Convention Center"
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- City and Capacity Row -->
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
              v-model="form.city"
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
              v-model.number="form.capacity"
              type="number"
              min="1"
              required
              placeholder="e.g. 1500"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>
        </div>

        <!-- Address -->
        <div class="flex flex-col gap-1.5">
          <label
            for="venue-address"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Address *
          </label>
          <input
            id="venue-address"
            v-model="form.address"
            type="text"
            required
            placeholder="e.g. Calle 100 # 15-20"
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Coordinates Row (Latitude and Longitude) -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label
              for="venue-latitude"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Latitude
            </label>
            <input
              id="venue-latitude"
              v-model.number="form.latitude"
              type="number"
              step="any"
              min="-90"
              max="90"
              placeholder="e.g. 4.60971"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="venue-longitude"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Longitude
            </label>
            <input
              id="venue-longitude"
              v-model.number="form.longitude"
              type="number"
              step="any"
              min="-180"
              max="180"
              placeholder="e.g. -74.08175"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>
        </div>

        <!-- Image URL -->
        <div class="flex flex-col gap-1.5">
          <label
            for="venue-image"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Image URL
          </label>
          <input
            id="venue-image"
            v-model="form.imageURL"
            type="url"
            placeholder="https://images.unsplash.com/..."
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Action Buttons -->
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
