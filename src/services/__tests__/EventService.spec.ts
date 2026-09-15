// Imports
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import type { CreateEventDTO, UpdateEventDTO } from '@/dtos/EventDTO';
import { EventService } from '@/services/EventService';
import { useEventStore } from '@/stores/eventstore';

// Test Suite
describe('EventService', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('debe crear un evento nuevo con ID incremental y agregarlo al store', () => {
    const store = useEventStore();
    store.events = [];

    const newEventDTO: CreateEventDTO = {
      title: 'Conferencia Tech',
      description: 'Charla sobre Inteligencia Artificial',
      type: 'Conference',
      duration: '4 hours',
      date: '2026-11-20',
      time: '09:00',
      venueId: 1,
      category: 'Technology',
      status: 'Active',
      price: 150,
      imageURL: 'https://example.com/tech.jpg',
    };

    const createdEvent = EventService.create(newEventDTO);

    expect(createdEvent.id).toBe(1);
    expect(createdEvent.title).toBe('Conferencia Tech');
    expect(store.events.length).toBe(1);
  });

  it('debe filtrar eventos por búsqueda de texto y selector de categoría', () => {
    const store = useEventStore();
    store.events = [
      {
        id: 1,
        title: 'Festival de Jazz',
        description: 'Música en vivo al aire libre',
        type: 'Festival',
        duration: '3 hours',
        date: '2026-12-01',
        time: '19:00',
        venueId: 1,
        category: 'Concerts',
        status: 'Active',
        price: 45,
        imageURL: '',
      },
      {
        id: 2,
        title: 'Taller de Pintura',
        description: 'Aprende arte y técnicas',
        type: 'Workshop',
        duration: '2 hours',
        date: '2026-12-05',
        time: '10:00',
        venueId: 2,
        category: 'Workshops',
        status: 'Active',
        price: 30,
        imageURL: '',
      },
    ];

    // Búsqueda por texto que coincide con título
    const resultsByQuery = EventService.search('jazz', 'All');
    expect(resultsByQuery.length).toBe(1);
    expect(resultsByQuery[0]?.title).toBe('Festival de Jazz');

    // Búsqueda por categoría específica
    const resultsByCategory = EventService.search('', 'Workshops');
    expect(resultsByCategory.length).toBe(1);
    expect(resultsByCategory[0]?.title).toBe('Taller de Pintura');

    // Búsqueda sin coincidencias
    const emptyResults = EventService.search('deportes', 'All');
    expect(emptyResults.length).toBe(0);
  });

  it('debe actualizar un evento existente y retornar true', () => {
    const store = useEventStore();
    store.events = [
      {
        id: 1,
        title: 'Título Antiguo',
        description: 'Descripción',
        type: 'Concert',
        duration: '2 hours',
        date: '2026-10-10',
        time: '18:00',
        venueId: 1,
        category: 'Concerts',
        status: 'Active',
        price: 20,
        imageURL: '',
      },
    ];

    const updateDTO: UpdateEventDTO = {
      title: 'Título Nuevo Modificado',
      price: 25,
    };

    const isUpdated = EventService.update(1, updateDTO);

    expect(isUpdated).toBe(true);
    expect(store.events[0]?.title).toBe('Título Nuevo Modificado');
    expect(store.events[0]?.price).toBe(25);
  });

  it('debe retornar false al intentar actualizar un evento inexistente', () => {
    const isUpdated = EventService.update(999, { title: 'No existe' });
    expect(isUpdated).toBe(false);
  });

  it('debe eliminar un evento existente', () => {
    const store = useEventStore();
    store.events = [
      {
        id: 1,
        title: 'Evento a eliminar',
        description: 'Desc',
        type: 'Concert',
        duration: '2 hours',
        date: '2026-10-10',
        time: '10:00',
        venueId: 1,
        category: 'Concerts',
        status: 'Active',
        price: 10,
        imageURL: '',
      },
    ];

    const isDeleted = EventService.delete(1);

    expect(isDeleted).toBe(true);
    expect(store.events.length).toBe(0);
  });

  it('debe retornar false al intentar eliminar un evento inexistente', () => {
    const isDeleted = EventService.delete(999);
    expect(isDeleted).toBe(false);
  });

  it('debe obtener categorías y estados únicos correctamente', () => {
    const store = useEventStore();
    store.events = [
      {
        id: 1,
        title: 'Evento 1',
        description: '',
        type: 'Concert',
        duration: '2 hours',
        date: '2026-10-10',
        time: '10:00',
        venueId: 1,
        category: 'Concerts',
        status: 'Active',
        price: 10,
        imageURL: '',
      },
      {
        id: 2,
        title: 'Evento 2',
        description: '',
        type: 'Concert',
        duration: '2 hours',
        date: '2026-10-11',
        time: '11:00',
        venueId: 1,
        category: 'Concerts',
        status: 'Cancelled',
        price: 10,
        imageURL: '',
      },
      {
        id: 3,
        title: 'Evento 3',
        description: '',
        type: 'Workshop',
        duration: '2 hours',
        date: '2026-10-12',
        time: '12:00',
        venueId: 1,
        category: 'Workshops',
        status: 'Active',
        price: 10,
        imageURL: '',
      },
    ];

    const categories = EventService.getUniqueCategories();
    expect(categories).toEqual(['Concerts', 'Workshops']);

    const statuses = EventService.getUniqueStatuses();
    expect(statuses).toEqual(['Active', 'Cancelled']);
  });

  it('debe obtener eventos por venueId y eventos destacados', () => {
    const store = useEventStore();
    store.events = [
      {
        id: 1,
        title: 'Evento Venue 1',
        description: '',
        type: 'Concert',
        duration: '2 hours',
        date: '2026-10-10',
        time: '10:00',
        venueId: 1,
        category: 'Concerts',
        status: 'Active',
        price: 10,
        imageURL: '',
      },
      {
        id: 2,
        title: 'Evento Venue 2',
        description: '',
        type: 'Workshop',
        duration: '2 hours',
        date: '2026-10-11',
        time: '11:00',
        venueId: 2,
        category: 'Workshops',
        status: 'Active',
        price: 20,
        imageURL: '',
      },
    ];

    const venue1Events = EventService.getByVenueId(1);
    expect(venue1Events.length).toBe(1);
    expect(venue1Events[0]?.id).toBe(1);

    const featured = EventService.getFeatured();
    expect(featured.length).toBe(2);
  });
});
