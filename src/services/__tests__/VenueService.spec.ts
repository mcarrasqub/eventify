// Imports
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import type { CreateVenueDTO, UpdateVenueDTO } from '@/dtos/VenueDTO';
import { VenueService } from '@/services/VenueService';
import { useVenueStore } from '@/stores/venuestore';

// Test Suite
describe('VenueService', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('debe crear un nuevo venue asignando el siguiente ID', () => {
    const store = useVenueStore();
    store.venues = [];

    const venueDTO: CreateVenueDTO = {
      name: 'Centro de Convenciones Plaza',
      address: 'Cra 43 # 10-50',
      city: 'Medellín',
      capacity: 500,
      imageURL: 'https://example.com/venue.jpg',
      latitude: 6.251,
      longitude: -75.563,
    };

    const createdVenue = VenueService.create(venueDTO);

    expect(createdVenue.id).toBe(1);
    expect(createdVenue.name).toBe('Centro de Convenciones Plaza');
    expect(store.venues.length).toBe(1);
  });

  it('debe actualizar un venue existente correctamente', () => {
    const store = useVenueStore();
    store.venues = [
      {
        id: 1,
        name: 'Teatro Antiguo',
        address: 'Calle 10',
        city: 'Bogotá',
        capacity: 200,
        imageURL: '',
        latitude: 4.6,
        longitude: -74.08,
      },
    ];

    const updateDTO: UpdateVenueDTO = {
      name: 'Teatro Renovado',
      capacity: 350,
    };

    const isUpdated = VenueService.update(1, updateDTO);

    expect(isUpdated).toBe(true);
    expect(store.venues[0]?.name).toBe('Teatro Renovado');
    expect(store.venues[0]?.capacity).toBe(350);
  });

  it('debe retornar false al intentar actualizar un venue que no existe', () => {
    const isUpdated = VenueService.update(999, { name: 'Fantasma' });
    expect(isUpdated).toBe(false);
  });

  it('debe eliminar un venue existente', () => {
    const store = useVenueStore();
    store.venues = [
      {
        id: 1,
        name: 'Venue a borrar',
        address: 'Calle 1',
        city: 'Cali',
        capacity: 100,
        imageURL: '',
        latitude: 3.4,
        longitude: -76.5,
      },
    ];

    const isDeleted = VenueService.delete(1);

    expect(isDeleted).toBe(true);
    expect(store.venues.length).toBe(0);
  });

  it('debe retornar false al intentar eliminar un venue inexistente', () => {
    const isDeleted = VenueService.delete(999);
    expect(isDeleted).toBe(false);
  });

  it('debe obtener la lista de ciudades únicas sin duplicados', () => {
    const store = useVenueStore();
    store.venues = [
      {
        id: 1,
        name: 'Venue 1',
        address: 'Dir 1',
        city: 'Medellín',
        capacity: 100,
        imageURL: '',
        latitude: 6.2,
        longitude: -75.5,
      },
      {
        id: 2,
        name: 'Venue 2',
        address: 'Dir 2',
        city: 'Bogotá',
        capacity: 200,
        imageURL: '',
        latitude: 4.6,
        longitude: -74.08,
      },
      {
        id: 3,
        name: 'Venue 3',
        address: 'Dir 3',
        city: 'Medellín',
        capacity: 300,
        imageURL: '',
        latitude: 6.25,
        longitude: -75.56,
      },
    ];

    const uniqueCities = VenueService.getUniqueCities();
    expect(uniqueCities).toEqual(['Medellín', 'Bogotá']);
  });
});
