// Imports
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
    const eventTickets = this.getTicketByEventId(eventId);
    return eventTickets.reduce((total, ticket) => total + (ticket.quantity ?? 1), 0);
  }

  static getTicketPriceByEventId(eventId: number): number {
    const tickets = this.getTicketByEventId(eventId);
    return tickets.length > 0 && tickets[0] ? tickets[0].price : 0;
  }

  static getAvailableTickets(eventId: number): number {
    const event = EventService.getEventById(eventId);
    if (!event) {
      return 0;
    }

    const venue = VenueService.getVenueById(event.venueId);
    const capacity = venue?.capacity ?? 0;
    const soldTickets = this.getSoldTicketsCount(eventId);

    return Math.max(0, capacity - soldTickets);
  }

  static createTicket(ticketDTO: CreateTicketDTO): TicketInterface | null {
    const availableTickets = this.getAvailableTickets(ticketDTO.eventId);

    if (ticketDTO.quantity <= 0 || ticketDTO.quantity > availableTickets) {
      return null;
    }

    const store = useTicketStore();

    const newTicket: TicketInterface = {
      ...ticketDTO,
      id: Utils.generateNextId(store.tickets),
    };

    store.tickets.push(newTicket);
    return newTicket;
  }

  static getUniqueTicketEvents(): string[] {
    const tickets = TicketService.getTickets();
    const events = tickets.map((ticket) => ticket.eventId.toString());
    const uniqueEvents = new Set(events);

    return Array.from(uniqueEvents);
  }
}
