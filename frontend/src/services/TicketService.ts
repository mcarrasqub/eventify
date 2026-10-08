// Internal Imports
import type {
  CreateTicketDTO,
  EventRevenueDTO,
  TicketDistributionDTO,
} from '@/dtos/TicketDTO.js';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';
import httpClient from '@/utils/httpClient.js';

export type { EventRevenueDTO, TicketDistributionDTO };

// Service Class
export class TicketService {
  public static async purchase(ticketDTO: CreateTicketDTO): Promise<TicketInterface[]> {
    const response = await httpClient.post<TicketInterface[]>('/tickets', ticketDTO);
    return response.data;
  }

  public static async getAvailableTickets(eventId: number): Promise<number> {
    const response = await httpClient.get<number>(`/tickets/available/${eventId}`);
    return response.data;
  }

  public static async getRevenueByEvent(): Promise<EventRevenueDTO[]> {
    const response = await httpClient.get<EventRevenueDTO[]>('/tickets/revenue');
    return response.data;
  }

  public static async getTicketDistribution(eventId?: number): Promise<TicketDistributionDTO> {
    const url = eventId ? `/tickets/distribution/${eventId}` : '/tickets/distribution/all';
    const response = await httpClient.get<TicketDistributionDTO>(url);
    return response.data;
  }

  public static async getAll(eventId?: number): Promise<TicketInterface[]> {
    const params = eventId ? { eventId } : undefined;
    const response = await httpClient.get<TicketInterface[]>('/tickets', { params });
    return response.data;
  }

  public static async getByEventId(eventId: number): Promise<TicketInterface[]> {
    const response = await httpClient.get<TicketInterface[]>('/tickets', {
      params: { eventId },
    });
    return response.data;
  }

  public static getSoldTicketsCount(_eventId: number): number {
    return 0;
  }
}
