// Imports
import type { CreateEventDTO, UpdateEventDTO } from '@/dtos/EventDTO.js';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import { useEventStore } from '@/stores/eventstore.js';
import Utils from '@/utils/Utils.js';

// Service Class
export class EventService {
  public static getEvents(): EventInterface[] {
    const eventStore = useEventStore();
    return eventStore.events;
  }

  public static getEventById(id: number): EventInterface | undefined {
    const eventStore = useEventStore();
    return eventStore.events.find((event) => event.id === id);
  }

  public static createEvent(eventDTO: CreateEventDTO): EventInterface {
    const eventStore = useEventStore();
    const nextId = Utils.generateNextId(eventStore.events);

    const newEvent: EventInterface = {
      ...eventDTO,
      id: nextId,
    };

    eventStore.addEvent(newEvent);
    return newEvent;
  }

  public static updateEvent(id: number, eventDTO: UpdateEventDTO): boolean {
    const eventStore = useEventStore();
    const existingEvent = this.getEventById(id);

    if (!existingEvent) {
      return false;
    }

    const updatedEvent: EventInterface = {
      ...existingEvent,
      ...eventDTO,
      id,
    };

    return eventStore.updateEvent(updatedEvent);
  }

  public static deleteEvent(id: number): boolean {
    const eventStore = useEventStore();
    return eventStore.removeEvent(id);
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
