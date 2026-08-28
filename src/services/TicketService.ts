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
    const timestamp = new Date().toISOString();

    const newTicket: TicketInterface = {
      id: Utils.generateNextId(store.tickets),
      userId: ticket.userId,
      eventId: ticket.eventId,
      price: ticket.price,
      status: ticket.status,
      createdAt: ticket.createdAt ?? timestamp,
      updatedAt: ticket.updatedAt ?? timestamp,
    };

    store.tickets.push(newTicket);
  }

  static getUniqueTicketEvents(): string[] {
    const tickets = TicketService.getTickets();
    const events = tickets.map((ticket) => ticket.eventId.toString());
    const uniqueEvents = new Set(events);

    return Array.from(uniqueEvents);
  }
}
