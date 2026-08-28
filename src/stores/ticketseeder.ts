// Imports
import type { TicketInterface } from '@/interfaces/TicketInterface.js';

// Seed Data
export const ticketSeeder: TicketInterface[] = [
  {
    id: 1,
    price: 50,
    status: 'USED',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z',
    eventId: 1,
    userId: 1,
  },
  {
    id: 2,
    price: 45,
    status: 'UNUSED',
    createdAt: '2026-08-05T14:30:00Z',
    updatedAt: '2026-08-05T14:30:00Z',
    eventId: 2,
    userId: 2,
  },
  {
    id: 3,
    price: 50,
    status: 'USED',
    createdAt: '2026-08-10T09:15:00Z',
    updatedAt: '2026-08-10T09:15:00Z',
    eventId: 1,
    userId: 3,
  },
];
