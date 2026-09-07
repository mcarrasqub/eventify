// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { EventInterface } from '@/interfaces/EventInterface.js';

// Store Definition
export const useEventStore = defineStore('event', () => {
  // State
  const events = ref<EventInterface[]>([]);

  return { events };
});
