// Imports
import type { VenueInterface } from '@/interfaces/VenueInterface.js';

// Seed Data
export const venueSeeder: VenueInterface[] = [
  {
    id: 1,
    imageURL:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80',
    name: 'Grand Convention Center',
    city: 'Bogotá',
    address: 'Calle 100 # 15-20',
    capacity: 1500,
    eventIds: [1],
  },
  {
    id: 2,
    imageURL:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    name: 'Metropolitan Music Hall',
    city: 'Medellín',
    address: 'Carrera 43A # 1-50',
    capacity: 3000,
    eventIds: [2],
  },
  {
    id: 3,
    imageURL:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    name: 'Creative Hub Cowork & Studios',
    city: 'Cali',
    address: 'Avenida 6N # 22-10',
    capacity: 250,
    eventIds: [3],
  },
];
