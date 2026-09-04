<script setup lang="ts">
// External Imports
import { computed, ref, watch } from 'vue';

// Internal Imports
import type { CreateEventDTO, UpdateEventDTO } from '@/dtos/EventDTO.js';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import type { VenueInterface } from '@/interfaces/VenueInterface.js';
import { EventService } from '@/services/EventService.js';
import { VenueService } from '@/services/VenueService.js';

// Props
const props = withDefaults(
  defineProps<{
    event?: EventInterface | null;
    isOpen: boolean;
  }>(),
  {
    event: null,
    isOpen: false,
  },
);

// Emits
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved', event: EventInterface): void;
}>();

// Reactive State (Form & Errors)
const title = ref<string>('');
const description = ref<string>('');
const type = ref<string>('Conference');
const category = ref<string>('Technology');
const date = ref<string>('');
const time = ref<string>('');
const duration = ref<string>('');
const price = ref<number>(50);
const status = ref<string>('Active');
const venueId = ref<number>(1);
const imageURL = ref<string>('');
const errorMessage = ref<string>('');

// Default Categories and Types
const defaultCategories: string[] = [
  'Technology',
  'Music',
  'Business',
  'Art',
  'Sports',
  'Education',
  'Entertainment',
  'Food & Drink',
];

const defaultTypes: string[] = [
  'Conference',
  'Concert',
  'Workshop',
  'Festival',
  'Seminar',
  'Networking',
  'Meetup',
  'Exhibition',
];

const statusOptions: string[] = ['Active', 'Draft', 'Completed', 'Cancelled'];

// Computed
const isEditMode = computed<boolean>(() => !!props.event);

const venues = computed<VenueInterface[]>(() => VenueService.getAll());

const categoryOptions = computed<string[]>(() => {
  const existingCategories = EventService.getUniqueCategories();
  const merged = Array.from(new Set([...defaultCategories, ...existingCategories]));
  return merged.filter((cat) => cat.length > 0);
});

// Watcher to synchronize form data when modal opens or event changes
watch(
  () => [props.isOpen, props.event],
  () => {
    if (props.isOpen) {
      errorMessage.value = '';
      if (props.event) {
        title.value = props.event.title;
        description.value = props.event.description;
        type.value = props.event.type;
        category.value = props.event.category;
        date.value = props.event.date;
        time.value = props.event.time;
        duration.value = props.event.duration;
        price.value = props.event.price;
        status.value = props.event.status;
        venueId.value = props.event.venueId;
        imageURL.value = props.event.imageURL;
      } else {
        resetForm();
      }
    }
  },
  { immediate: true },
);

// Methods
function resetForm(): void {
  title.value = '';
  description.value = '';
  type.value = 'Conference';
  category.value = 'Technology';
  date.value = new Date().toISOString().split('T')[0] ?? '';
  time.value = '09:00 AM';
  duration.value = '2 hours';
  price.value = 50;
  status.value = 'Active';
  venueId.value = venues.value[0]?.id ?? 1;
  imageURL.value =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80';
  errorMessage.value = '';
}

function handleClose(): void {
  errorMessage.value = '';
  emit('close');
}

function validateForm(): boolean {
  if (!title.value.trim()) {
    errorMessage.value = 'Event title is required.';
    return false;
  }
  if (!description.value.trim()) {
    errorMessage.value = 'Event description is required.';
    return false;
  }
  if (!date.value.trim()) {
    errorMessage.value = 'Event date is required.';
    return false;
  }
  if (!time.value.trim()) {
    errorMessage.value = 'Event time is required.';
    return false;
  }
  if (!duration.value.trim()) {
    errorMessage.value = 'Event duration is required.';
    return false;
  }
  if (price.value === undefined || price.value === null || price.value < 0) {
    errorMessage.value = 'Event price must be a non-negative number.';
    return false;
  }
  if (!imageURL.value.trim()) {
    errorMessage.value = 'Event image URL is required.';
    return false;
  }
  if (!venueId.value) {
    errorMessage.value = 'Please select a valid venue.';
    return false;
  }

  errorMessage.value = '';
  return true;
}

function handleSubmit(): void {
  if (!validateForm()) {
    return;
  }

  if (isEditMode.value && props.event) {
    const updateDTO: UpdateEventDTO = {
      category: category.value,
      date: date.value,
      duration: duration.value,
      imageURL: imageURL.value,
      price: Number(price.value),
      status: status.value,
      description: description.value,
      time: time.value,
      title: title.value,
      type: type.value,
      venueId: Number(venueId.value),
    };

    const updated = EventService.update(props.event.id, updateDTO);
    if (updated) {
      const refreshed = EventService.getById(props.event.id);
      if (refreshed) {
        emit('saved', refreshed);
      }
      handleClose();
    } else {
      errorMessage.value = 'Could not update the event. Please try again.';
    }
  } else {
    const createDTO: CreateEventDTO = {
      category: category.value,
      date: date.value,
      duration: duration.value,
      imageURL: imageURL.value,
      price: Number(price.value),
      status: status.value,
      description: description.value,
      ticketIds: [],
      time: time.value,
      title: title.value,
      type: type.value,
      venueId: Number(venueId.value),
    };

    const newEvent = EventService.create(createDTO);
    emit('saved', newEvent);
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
      class="relative my-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-midnight-soft p-6 shadow-2xl sm:p-8"
    >
      <!-- Modal Header -->
      <div class="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-rose-gold">
            {{ isEditMode ? 'Modify record' : 'New record' }}
          </p>
          <h3 class="font-display text-2xl font-bold tracking-tight text-white">
            {{ isEditMode ? 'Edit Event' : 'Create Event' }}
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

      <!-- Event Form -->
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="flex flex-col gap-1.5">
          <label
            for="event-title"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Title *
          </label>
          <input
            id="event-title"
            v-model="title"
            type="text"
            required
            placeholder="e.g. AI Innovation Summit 2025"
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Type and Category Row -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label
              for="event-type"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Type *
            </label>
            <select
              id="event-type"
              v-model="type"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            >
              <option
                v-for="typeOption in defaultTypes"
                :key="typeOption"
                :value="typeOption"
                class="bg-midnight text-white"
              >
                {{ typeOption }}
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="event-category"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Category *
            </label>
            <select
              id="event-category"
              v-model="category"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            >
              <option
                v-for="cat in categoryOptions"
                :key="cat"
                :value="cat"
                class="bg-midnight text-white"
              >
                {{ cat }}
              </option>
            </select>
          </div>
        </div>

        <!-- Date, Time, Duration and Price Row -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col gap-1.5">
            <label
              for="event-date"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Date *
            </label>
            <input
              id="event-date"
              v-model="date"
              type="date"
              required
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="event-time"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Time *
            </label>
            <input
              id="event-time"
              v-model="time"
              type="text"
              required
              placeholder="e.g. 09:00 AM"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="event-duration"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Duration *
            </label>
            <input
              id="event-duration"
              v-model="duration"
              type="text"
              required
              placeholder="e.g. 3 hours"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="event-price"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Price ($) *
            </label>
            <input
              id="event-price"
              v-model.number="price"
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="e.g. 50"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>
        </div>

        <!-- Venue and Status Row -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label
              for="event-venue"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Venue *
            </label>
            <select
              id="event-venue"
              v-model.number="venueId"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            >
              <option
                v-for="venueItem in venues"
                :key="venueItem.id"
                :value="venueItem.id"
                class="bg-midnight text-white"
              >
                {{ venueItem.name }} ({{ venueItem.city }})
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="event-status"
              class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
            >
              Status *
            </label>
            <select
              id="event-status"
              v-model="status"
              class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            >
              <option
                v-for="stat in statusOptions"
                :key="stat"
                :value="stat"
                class="bg-midnight text-white"
              >
                {{ stat }}
              </option>
            </select>
          </div>
        </div>

        <!-- Image URL -->
        <div class="flex flex-col gap-1.5">
          <label
            for="event-image"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Image URL *
          </label>
          <input
            id="event-image"
            v-model="imageURL"
            type="url"
            required
            placeholder="https://images.unsplash.com/..."
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-1.5">
          <label
            for="event-description"
            class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
          >
            Description *
          </label>
          <textarea
            id="event-description"
            v-model="description"
            rows="3"
            required
            placeholder="Detailed description of the event..."
            class="w-full rounded-xl border border-white/15 bg-midnight px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          ></textarea>
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
            {{ isEditMode ? 'Save Changes' : 'Create Event' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
