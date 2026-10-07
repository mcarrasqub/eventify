// External Imports
import axios from 'axios';

// Internal Imports
import type { CreateTicketDTO } from '@/dtos/TicketDTO.js';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';
import { AuthService } from '@/services/AuthService.js';
import { EventService } from '@/services/EventService.js';
import { VenueService } from '@/services/VenueService.js';

// Service Class
export class TicketService {
  private static readonly API_URL = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/api/tickets`;

  // HTTP Method using Axios (corresponde a POST /api/tickets en el Backend)
  public static async purchase(eventId: number, quantity: number): Promise<TicketInterface[]> {
    const token = AuthService.getToken();
    const payload: CreateTicketDTO = { eventId, quantity };
    const { data } = await axios.post<TicketInterface[]>(this.API_URL, payload, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  }

  // Métodos auxiliares sincrónicos para compatibilidad de vistas
  public static getAll(): TicketInterface[] {
    return [];
  }

  public static getByEventId(_eventId: number): TicketInterface[] {
    return [];
  }

  public static getAvailableTickets(eventId: number): number {
    const event = EventService.getById(eventId);
    const venue = VenueService.getById(event?.venueId ?? 0);
    const capacity = venue?.capacity ?? 0;
    const soldTickets = TicketService.getSoldTicketsCount(eventId);

    return capacity - soldTickets;
  }

  public static getSoldTicketsCount(_eventId: number): number {
    return 0;
  }
}
