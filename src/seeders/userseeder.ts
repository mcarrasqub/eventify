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
    role: 'admin',
    phone: '3001234567',
    eventIds: [1, 2],
    ticketIds: [1],
  },
  {
    id: 2,
    name: 'Test User',
    email: 'user@example.com',
    password: 'password123',
    isAdmin: false,
    role: 'user',
    phone: '3009876543',
    eventIds: [3],
    ticketIds: [2],
  },
];
