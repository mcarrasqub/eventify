import type { TicketInterface } from '@/interfaces/TicketInterface';
import { useTicketStore } from '@/stores/ticketstore.js';
import Utils from '@/utils/Utils.js';

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

  public static getUniqueTicketEvents(): string[] {
    const tickets = TicketService.getTickets();
    const events = tickets.map((ticket) => ticket.eventId.toString());
    const uniqueEvents = new Set(events);

    return Array.from(uniqueEvents);
  }
}
