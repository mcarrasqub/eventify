// Internal Imports
import type { CreateEventDTO, UpdateEventDTO } from '@/dtos/EventDTO.js';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import { TicketService } from '@/services/TicketService.js';
import { useEventStore } from '@/stores/eventstore.js';
import Utils from '@/utils/Utils.js';

// Service Class
export class EventService {
  // CRUD Methods
  static create(eventDTO: CreateEventDTO): EventInterface {
    const store = useEventStore();

    const newEvent: EventInterface = {
      ...eventDTO,
      id: Utils.generateNextId(store.events),
    };

    store.events.push(newEvent);
    return newEvent;
  }

  static search(query: string, categorySelector: string): EventInterface[] {
    return EventService.getAll().filter((event) => {
      const matchesQuery =
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categorySelector === 'All' || event.category === categorySelector;
      return matchesQuery && matchesCategory;
    });
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

  // Getters
  static getAll(): EventInterface[] {
    return useEventStore().events;
  }

  static getById(id: number): EventInterface | undefined {
    return useEventStore().events.find((event) => event.id === id);
  }

  static getImageUrl(id: number): string {
    return EventService.getById(id)?.imageURL ?? '';
  }

  static getTitle(id: number): string {
    return EventService.getById(id)?.title ?? 'Unknown Event';
  }

  static getPrice(id: number): number {
    return EventService.getById(id)?.price ?? 0;
  }

  static getByVenueId(venueId: number): EventInterface[] {
    return EventService.getAll().filter((event) => event.venueId === venueId);
  }

  static getFeatured(): EventInterface[] {
    return EventService.getAll().slice(0, 6);
  }

  static getRevenue(eventId: number): number {
    const event = EventService.getById(eventId);
    const soldTickets = TicketService.getSoldTicketsCount(eventId);

    return soldTickets * (event?.price ?? 0);
  }

  static getUniqueCategories(): string[] {
    const categories = EventService.getAll().map((event) => event.category);
    return Array.from(new Set(categories));
  }

  static getUniqueStatuses(): string[] {
    const statuses = EventService.getAll().map((event) => event.status);
    return Array.from(new Set(statuses));
  }
}
