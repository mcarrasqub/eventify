// Imports
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { EventService } from '@/services/EventService';
import { TicketService } from '@/services/TicketService';
import { useEventStore } from '@/stores/eventstore';
import { useTicketStore } from '@/stores/ticketstore';
import { useVenueStore } from '@/stores/venuestore';

// Test Suite
describe('TicketService y EventService', () => {
  beforeEach(() => {
    // Inicializar Pinia limpio antes de cada prueba
    setActivePinia(createPinia());
  });

  it('debe calcular la disponibilidad de tickets basándose en la capacidad del venue', () => {
    const venueStore = useVenueStore();
    const eventStore = useEventStore();
    const ticketStore = useTicketStore();

    // 1. Configurar Venue con capacidad 100
    venueStore.venues = [
      {
        id: 1,
        name: 'Auditorio Central',
        address: 'Calle 10 # 5-20',
        city: 'Medellín',
        capacity: 100,
        imageURL: '',
        latitude: 6.25,
        longitude: -75.56,
      },
    ];

    // 2. Configurar Evento asociado al Venue 1
    eventStore.events = [
      {
        id: 1,
        title: 'Concierto Rock',
        description: 'En vivo',
        type: 'Concert',
        duration: '2 hours',
        date: '2026-10-10',
        time: '20:00',
        venueId: 1,
        category: 'Concerts',
        status: 'Active',
        price: 50,
        imageURL: '',
      },
    ];

    // 3. Simular 2 tickets vendidos
    ticketStore.tickets = [
      { id: 1, eventId: 1, userId: 1, status: 'Confirmed' },
      { id: 2, eventId: 1, userId: 2, status: 'Confirmed' },
    ];

    const available = TicketService.getAvailableTickets(1);
    expect(available).toBe(98); // 100 capacidad - 2 vendidos
  });

  it('no debe permitir comprar más tickets que los disponibles', () => {
    const venueStore = useVenueStore();
    const eventStore = useEventStore();

    venueStore.venues = [
      {
        id: 1,
        name: 'Sala Pequeña',
        address: 'Cra 43A',
        city: 'Medellín',
        capacity: 2,
        imageURL: '',
        latitude: 6.2,
        longitude: -75.5,
      },
    ];

    eventStore.events = [
      {
        id: 1,
        title: 'Taller Privado',
        description: 'Exclusivo',
        type: 'Workshop',
        duration: '2 hours',
        date: '2026-10-15',
        time: '18:00',
        venueId: 1,
        category: 'Workshops',
        status: 'Active',
        price: 100,
        imageURL: '',
      },
    ];

    // Intentar comprar 5 boletos cuando la capacidad es 2
    const result = TicketService.create({
      eventId: 1,
      userId: 1,
      quantity: 5,
      status: 'Confirmed',
    });

    expect(result).toBeNull();
  });

  it('debe calcular los ingresos (revenue) del evento correctamente', () => {
    const eventStore = useEventStore();
    const ticketStore = useTicketStore();

    eventStore.events = [
      {
        id: 1,
        title: 'Festival Musical',
        description: 'Gran festival',
        type: 'Festival',
        duration: '4 hours',
        date: '2026-11-01',
        time: '16:00',
        venueId: 1,
        category: 'Festivals',
        status: 'Active',
        price: 80,
        imageURL: '',
      },
    ];

    ticketStore.tickets = [
      { id: 1, eventId: 1, userId: 1, status: 'Confirmed' },
      { id: 2, eventId: 1, userId: 2, status: 'Confirmed' },
      { id: 3, eventId: 1, userId: 3, status: 'Confirmed' },
    ];

    const revenue = EventService.getRevenue(1);
    expect(revenue).toBe(240); // 3 boletos * $80
  });
});
