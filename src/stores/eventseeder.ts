// Imports
import type { EventInterface } from '@/interfaces/EventInterface.js';

// Seed Data
export const eventSeeder: EventInterface[] = [
  {
    id: 1,
    imageURL:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
    title: 'Tech Innovation Summit 2026',
    description: 'Conference on artificial intelligence and modern web development.',
    type: 'Conference',
    category: 'Technology',
    date: '2026-09-15',
    time: '09:00 AM',
    duration: '8 hours',
    status: 'Active',
    venueId: 1,
    ticketIds: [1, 3],
  },
  {
    id: 2,
    imageURL:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    title: 'Indie Music Festival',
    description: 'Live band performances, urban art, and outdoor food stands.',
    type: 'Festival',
    category: 'Music',
    date: '2026-09-20',
    time: '04:00 PM',
    duration: '6 hours',
    status: 'Active',
    venueId: 2,
    ticketIds: [2],
  },
  {
    id: 3,
    imageURL:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
    title: 'UI/UX Design Workshop',
    description: 'Learn to design attractive interfaces using Figma and modern tools.',
    type: 'Workshop',
    category: 'Design',
    date: '2026-10-05',
    time: '02:00 PM',
    duration: '3 hours',
    status: 'Active',
    venueId: 3,
    ticketIds: [],
  },
];
