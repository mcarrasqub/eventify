// Imports
import type { VenueInterface } from '@/interfaces/VenueInterface.js';

// Seed Data
export const venueSeeder: VenueInterface[] = [
  {
    id: 1,
    imageURL:
      'https://api2.teatrometropolitano.com/storage/365/conversions/WLwSo1wAZsvD99VZgmXh-thumb.jpg',
    name: 'Ágora Bogotá: Convention Center',
    city: 'Bogotá',
    address: 'Ac. 24 #38-47',
    capacity: 1500,
    latitude: 4.629912473204121,
    longitude: -74.09285016916155,
  },
  {
    id: 2,
    imageURL:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    name: 'Metropolitan Theatre',
    city: 'Medellín',
    address: 'Cl. 41 #57 - 30',
    capacity: 3000,
    latitude: 6.2432250326929575,
    longitude: -75.57743584587902,
  },
  {
    id: 3,
    imageURL:
      'https://epicoworkspace.com/wp-content/uploads/epico-workspace-coworking-cali-2-1.jpg',
    name: 'Épico Workspace',
    city: 'Cali',
    address: 'Cl. 3 #4-19',
    capacity: 250,
    latitude: 3.4490760129625153,
    longitude: -76.5387579248174,
  },
];
