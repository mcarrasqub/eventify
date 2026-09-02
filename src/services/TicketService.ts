// Internal Imports
import type { CreateTicketDTO } from '@/dtos/TicketDTO.js';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';
import { EventService } from '@/services/EventService.js';
import { VenueService } from '@/services/VenueService.js';
import { useTicketStore } from '@/stores/ticketstore.js';
import Utils from '@/utils/Utils.js';

// Service Class
export class TicketService {
  static getTickets(): TicketInterface[] {
    return useTicketStore().tickets;
  }

  static getTicketById(id: number): TicketInterface | undefined {
    return useTicketStore().tickets.find((ticket) => ticket.id === id);
  }

  static getTicketByEventId(eventId: number): TicketInterface[] {
    return useTicketStore().tickets.filter((ticket) => ticket.eventId === eventId);
  }

  static getTicketsByUserId(userId: number): TicketInterface[] {
    return useTicketStore().tickets.filter((ticket) => ticket.userId === userId);
  }

  static getSoldTicketsCount(eventId: number): number {
    return this.getTicketByEventId(eventId).length;
  }

  static getAvailableTickets(eventId: number): number {
    const event = EventService.getEventById(eventId);
    const venue = VenueService.getVenueById(event?.venueId ?? 0);
    const capacity = venue?.capacity ?? 0;
    const soldTickets = this.getSoldTicketsCount(eventId);

    return capacity - soldTickets;
  }

  static createTicket(ticketDTO: CreateTicketDTO): TicketInterface[] | null {
    const availableTickets = TicketService.getAvailableTickets(ticketDTO.eventId);

    if (ticketDTO.quantity > availableTickets) {
      return null;
    }

    const store = useTicketStore();
    const createdTickets: TicketInterface[] = [];

    for (let i = 0; i < ticketDTO.quantity; i++) {
      const newTicket: TicketInterface = {
        id: Utils.generateNextId(store.tickets),
        status: ticketDTO.status,
        eventId: ticketDTO.eventId,
        userId: ticketDTO.userId,
      };

      store.tickets.push(newTicket);
      createdTickets.push(newTicket);
    }

    return createdTickets;
  }

  static getUniqueTicketEvents(): string[] {
    const tickets = TicketService.getTickets();
    const events = tickets.map((ticket) => ticket.eventId.toString());
    const uniqueEvents = new Set(events);

    return Array.from(uniqueEvents);
  }
}
