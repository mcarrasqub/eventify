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

  function addEvent(event: EventInterface): void {
    events.value.push(event);
  }

  function updateEvent(updatedEvent: EventInterface): boolean {
    const index = events.value.findIndex((event) => event.id === updatedEvent.id);
    if (index !== -1) {
      events.value[index] = updatedEvent;
      return true;
    }
    return false;
  }

  function removeEvent(id: number): boolean {
    const initialLength = events.value.length;
    events.value = events.value.filter((event) => event.id !== id);
    return events.value.length < initialLength;
  }

  return {
    addEvent,
    events,
    removeEvent,
    setEvents,
    updateEvent,
  };
});
