// Imports
import type { TicketInterface } from '@/interfaces/TicketInterface.js';
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

  static createTicket(ticket: TicketInterface): void {
    const store = useTicketStore();

    const newTicket: TicketInterface = {
      id: Utils.generateNextId(store.tickets),
      userId: ticket.userId,
      eventId: ticket.eventId,
      price: ticket.price,
      status: ticket.status,
    };

    store.tickets.push(newTicket);
  }

  static getUniqueTicketEvents(): string[] {
    const tickets = TicketService.getTickets();
    const events = tickets.map((ticket) => ticket.eventId.toString());
    const uniqueEvents = new Set(events);

    return Array.from(uniqueEvents);
  }

  /*  public static getTicketStatsByEventId(eventId: number): number[] {
    const tickets = TicketService.getTicketByEventId(eventId);
    const soldTickets = tickets.length;

    const venue = EventService.getVenueByEventId(eventId);
    const availableTickets = venue.capacity - soldTickets;

    return [soldTickets, availableTickets];
  } */ // this will give me info for stats when the time comes
}
