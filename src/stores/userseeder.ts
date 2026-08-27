// Imports
import type { UserInterface } from '@/interfaces/UserInterface.js';

// Seed Data
export const userSeeder: UserInterface[] = [
  {
    id: 1,
    name: 'Mariana Carrascal',
    email: 'mariana@example.com',
    password: 'password123',
    isAdmin: true,
    phone: '3001234567',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z',
    eventIds: [1, 2],
    ticketIds: [1],
  },
  {
    id: 2,
    name: 'Test User',
    email: 'user@example.com',
    password: 'password123',
    isAdmin: false,
    phone: '3009876543',
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-01T10:00:00Z',
    eventIds: [3],
    ticketIds: [2],
  },
];
