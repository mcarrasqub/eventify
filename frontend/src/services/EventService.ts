// Internal Imports
import type {
  CreateEventDTO,
  EventsByCityDTO,
  EventSummaryDTO,
  UpdateEventDTO,
} from '@/dtos/EventDTO.js';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import { BaseService } from '@/services/BaseService.js';

export type { EventSummaryDTO, EventsByCityDTO };

// Service Class
export class EventService extends BaseService {
  // CRUD Methods
  static async create(eventDTO: CreateEventDTO): Promise<EventInterface> {
    return await this.post<EventInterface>('/events', eventDTO);
  }

  static async search(query: string, categorySelector: string): Promise<EventInterface[]> {
    const params: Record<string, string> = {};
    if (query.trim()) {
      params.query = query.trim();
    }
    if (categorySelector && categorySelector !== 'All') {
      params.category = categorySelector;
    }

    return await this.get<EventInterface[]>('/events', { params });
  }

  static async update(id: number, eventDTO: UpdateEventDTO): Promise<EventInterface> {
    return await this.patch<EventInterface>(`/events/${id}`, eventDTO);
  }

  static async delete(id: number): Promise<void> {
    await this.deleteHttp(`/events/${id}`);
  }

  // Getters & Stats Methods
  static async getAll(): Promise<EventInterface[]> {
    return await this.get<EventInterface[]>('/events');
  }

  static async getById(id: number): Promise<EventInterface> {
    return await this.get<EventInterface>(`/events/${id}`);
  }

  static async getByVenueId(venueId: number): Promise<EventInterface[]> {
    const events = await EventService.getAll();
    return events.filter((event) => event.venueId === venueId);
  }

  static async getFeatured(): Promise<EventInterface[]> {
    const events = await EventService.getAll();
    return events.slice(0, 6);
  }

  static async getEventSummary(): Promise<EventSummaryDTO> {
    return await this.get<EventSummaryDTO>('/events/summary');
  }

  static async getEventsByCity(): Promise<EventsByCityDTO[]> {
    return await this.get<EventsByCityDTO[]>('/events/by-city');
  }

  static getUniqueCategories(events: EventInterface[]): string[] {
    const categories = events.map((event) => event.category);
    return Array.from(new Set(categories));
  }

  static getUniqueStatuses(events: EventInterface[]): string[] {
    const statuses = events.map((event) => event.status);
    return Array.from(new Set(statuses));
  }
}
