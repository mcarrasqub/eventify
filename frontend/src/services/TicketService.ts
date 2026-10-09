// Internal Imports
import type {
  CreateTicketDTO,
  EventRevenueDTO,
  TicketDistributionDTO,
} from '@/dtos/TicketDTO.js';
import { BaseService } from '@/services/BaseService.js';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';

export type { EventRevenueDTO, TicketDistributionDTO };

// Service Class
export class TicketService extends BaseService {
  // Methods
  public static async create(ticketDTO: CreateTicketDTO): Promise<TicketInterface[]> {
    return await this.post<TicketInterface[]>('/tickets', ticketDTO);
  }

  // Getters
  public static async getAvailable(eventId: number): Promise<number> {
    return await this.get<number>(`/tickets/available/${eventId}`);
  }

  public static async getRevenueByEvent(): Promise<EventRevenueDTO[]> {
    return await this.get<EventRevenueDTO[]>('/tickets/revenue');
  }

  public static async getDistribution(eventId?: number): Promise<TicketDistributionDTO> {
    const url = eventId ? `/tickets/distribution/${eventId}` : '/tickets/distribution/all';
    return await this.get<TicketDistributionDTO>(url);
  }

  public static async getAll(eventId?: number): Promise<TicketInterface[]> {
    const params = eventId ? { eventId } : undefined;
    return await this.get<TicketInterface[]>('/tickets', { params });
  }

  public static async getByEventId(eventId: number): Promise<TicketInterface[]> {
    return await this.get<TicketInterface[]>('/tickets', {
      params: { eventId },
    });
  }
}
