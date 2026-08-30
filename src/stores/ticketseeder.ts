// Imports
import type { TicketInterface } from '@/interfaces/TicketInterface.js';

// Seed Data
export const ticketSeeder: TicketInterface[] = [
  {
    id: 1,
    price: 50,
    status: 'USED',
    quantity: 1,
    eventId: 1,
    userId: 1,
  },
  {
    id: 2,
    price: 45,
    status: 'UNUSED',
    quantity: 1,
    eventId: 2,
    userId: 2,
  },
  {
    id: 3,
    price: 50,
    status: 'USED',
    quantity: 1,
    eventId: 1,
    userId: 3,
  },
];
