// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { EventInterface } from '@/interfaces/EventInterface.js';
import { eventSeeder } from '@/stores/eventseeder.js';

// Store Definition
export const useEventStore = defineStore('event', () => {
  // Reactive state
  const events = ref<EventInterface[]>(eventSeeder);

  // Actions
  function setEvents(newEvents: EventInterface[]): void {
    events.value = newEvents;
  }

  return {
    events,
    setEvents,
  };
});
