// Imports
import type { CreateEventDTO, UpdateEventDTO } from '@/dtos/EventDTO.js';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import { useEventStore } from '@/stores/eventstore.js';

// Service Class
export class EventService {
  public static getEvents(): EventInterface[] {
    const store = useEventStore();
    return store.events;
  }

  public static getEventById(id: number): EventInterface | undefined {
    const store = useEventStore();
    return store.events.find((event) => event.id === id);
  }

  public static createEvent(eventDTO: CreateEventDTO): EventInterface {
    const store = useEventStore();
    const nextId =
      store.events.length > 0 ? Math.max(...store.events.map((event) => event.id), 0) + 1 : 1;

    const newEvent: EventInterface = {
      ...eventDTO,
      id: nextId,
    };

    store.addEvent(newEvent);
    return newEvent;
  }

  public static updateEvent(id: number, eventDTO: UpdateEventDTO): boolean {
    const store = useEventStore();
    const existingEvent = this.getEventById(id);

    if (!existingEvent) {
      return false;
    }

    const updatedEvent: EventInterface = {
      ...existingEvent,
      ...eventDTO,
      id,
    };

    return store.updateEvent(updatedEvent);
  }

  public static deleteEvent(id: number): boolean {
    const store = useEventStore();
    return store.removeEvent(id);
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

  public static getEventsByStatus(statusSelector: string): EventInterface[] {
    if (!statusSelector || statusSelector === 'All') {
      return this.getEvents();
    }
    return this.getEvents().filter((event) => event.status === statusSelector);
  }

  public static getEventsByCategory(categorySelector: string): EventInterface[] {
    if (!categorySelector || categorySelector === 'All') {
      return this.getEvents();
    }
    return this.getEvents().filter((event) => event.category === categorySelector);
  }

  public static getUniqueCategories(): string[] {
    const categories = this.getEvents().map((event) => event.category);
    return Array.from(new Set(categories));
  }

  public static getUniqueStatuses(): string[] {
    const statuses = this.getEvents().map((event) => event.status);
    return Array.from(new Set(statuses));
  }

  public static getEventStatusCounts(): Record<string, number> {
    const events = this.getEvents();
    const counts: Record<string, number> = {
      Active: 0,
      Cancelled: 0,
      Completed: 0,
      Draft: 0,
    };

    for (const event of events) {
      const currentCount = counts[event.status];
      if (typeof currentCount === 'number') {
        counts[event.status] = currentCount + 1;
      } else {
        counts[event.status] = 1;
      }
    }

    return counts;
  }
}
