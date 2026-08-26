// Imports
import type { EventInterface } from '@/interfaces/EventInterface.js';
import { useEventStore } from '@/stores/eventstore.js';

// Service Class
export class EventService {
  public static getEvents(): EventInterface[] {
    const eventStore = useEventStore();
    return eventStore.events;
  }

  public static getFeaturedEvents(): EventInterface[] {
    return this.getEvents().slice(0, 3);
  }

  public static searchEvents(query: string, categorySelector: string): EventInterface[] {
    return this.getEvents().filter((event) => {
      const matchesQuery =
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categorySelector === 'All' || event.category === categorySelector;
      return matchesQuery && matchesCategory;
    });
  }
}
