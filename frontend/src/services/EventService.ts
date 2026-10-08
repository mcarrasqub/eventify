// Internal Imports
import type {
  CreateEventDTO,
  EventsByCityDTO,
  EventSummaryDTO,
  UpdateEventDTO,
} from '@/dtos/EventDTO.js';
import type { EventInterface } from '@/interfaces/EventInterface.js';
import httpClient from '@/utils/httpClient.js';

export type { EventSummaryDTO, EventsByCityDTO };

// Service Class
export class EventService {
  // CRUD Methods
  static async create(eventDTO: CreateEventDTO): Promise<EventInterface> {
    const response = await httpClient.post<EventInterface>('/events', eventDTO);
    return response.data;
  }

  static async search(query: string, categorySelector: string): Promise<EventInterface[]> {
    const params: Record<string, string> = {};
    if (query.trim()) {
      params.query = query.trim();
    }
    if (categorySelector && categorySelector !== 'All') {
      params.category = categorySelector;
    }

    const response = await httpClient.get<EventInterface[]>('/events', { params });
    return response.data;
  }

  static async update(id: number, eventDTO: UpdateEventDTO): Promise<EventInterface> {
    const response = await httpClient.patch<EventInterface>(`/events/${id}`, eventDTO);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await httpClient.delete(`/events/${id}`);
  }

  // Getters & Stats Methods
  static async getAll(): Promise<EventInterface[]> {
    const response = await httpClient.get<EventInterface[]>('/events');
    return response.data;
  }

  static async getById(id: number): Promise<EventInterface> {
    const response = await httpClient.get<EventInterface>(`/events/${id}`);
    return response.data;
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
    const response = await httpClient.get<EventSummaryDTO>('/events/summary');
    return response.data;
  }

  static async getEventsByCity(): Promise<EventsByCityDTO[]> {
    const response = await httpClient.get<EventsByCityDTO[]>('/events/by-city');
    return response.data;
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
