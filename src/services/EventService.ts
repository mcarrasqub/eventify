// Internal Imports
import type { CreateEventDTO, UpdateEventDTO } from '@/dtos/EventDTO.js';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import { TicketService } from '@/services/TicketService.js';
import { useEventStore } from '@/stores/eventstore.js';
import Utils from '@/utils/Utils.js';

// Service Class
export class EventService {
  static getAll(): EventInterface[] {
    return useEventStore().events;
  }

  static getById(id: number): EventInterface | undefined {
    return useEventStore().events.find((event) => event.id === id);
  }

  static getPriceById(id: number): number {
    return this.getById(id)?.price ?? 0;
  }

  static getRevenue(eventId: number): number {
    const event = EventService.getById(eventId);
    const soldTickets = TicketService.getSoldTicketsCount(eventId);

    return soldTickets * (event?.price ?? 0);
  }

  static create(eventDTO: CreateEventDTO): EventInterface {
    const store = useEventStore();

    const newEvent: EventInterface = {
      ...eventDTO,
      id: Utils.generateNextId(store.events),
      ticketIds: eventDTO.ticketIds ?? [],
    };

    store.events.push(newEvent);
    return newEvent;
  }

  static update(id: number, eventDTO: UpdateEventDTO): boolean {
    const store = useEventStore();
    const index = store.events.findIndex((event) => event.id === id);

    if (index === -1) {
      return false;
    }

    const currentEvent = store.events[index];
    if (!currentEvent) {
      return false;
    }

    store.events[index] = {
      ...currentEvent,
      ...eventDTO,
      id,
    };

    return true;
  }

  static delete(id: number): boolean {
    const store = useEventStore();
    const initialLength = store.events.length;
    store.events = store.events.filter((event) => event.id !== id);
    return store.events.length < initialLength;
  }

  static getFeatured(): EventInterface[] {
    return this.getAll().slice(0, 6);
  }

  static getTitle(id: number): string {
    return this.getById(id)?.title ?? 'Unknown Event';
  }

  static search(query: string, categorySelector: string): EventInterface[] {
    return this.getAll().filter((event) => {
      const matchesQuery =
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categorySelector === 'All' || event.category === categorySelector;
      return matchesQuery && matchesCategory;
    });
  }

  static getByStatus(statusSelector: string): EventInterface[] {
    if (!statusSelector || statusSelector === 'All') {
      return this.getAll();
    }
    return this.getAll().filter((event) => event.status === statusSelector);
  }

  static getByCategory(categorySelector: string): EventInterface[] {
    if (!categorySelector || categorySelector === 'All') {
      return this.getAll();
    }
    return this.getAll().filter((event) => event.category === categorySelector);
  }

  static getUniqueCategories(): string[] {
    const categories = this.getAll().map((event) => event.category);
    return Array.from(new Set(categories));
  }

  static getUniqueStatuses(): string[] {
    const statuses = this.getAll().map((event) => event.status);
    return Array.from(new Set(statuses));
  }

  static getByVenueId(venueId: number): EventInterface[] {
    return this.getAll().filter((event) => event.venueId === venueId);
  }
}
