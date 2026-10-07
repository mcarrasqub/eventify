// Internal Imports
import type { CreateTicketDTO } from '@/dtos/TicketDTO.js';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';
import httpClient from '@/utils/httpClient.js';

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

  public static getAll(): TicketInterface[] {
    return [];
  }

  public static getByEventId(_eventId: number): TicketInterface[] {
    return [];
  }

  public static getSoldTicketsCount(_eventId: number): number {
    return 0;
  }
}
