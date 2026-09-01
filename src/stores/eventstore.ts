// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { EventInterface } from '@/interfaces/EventInterface.js';
import { eventSeeder } from '@/stores/eventseeder.js';

// Store Definition
export const useEventStore = defineStore('event', () => {
  const events = ref<EventInterface[]>(eventSeeder);

  return { events };
});
