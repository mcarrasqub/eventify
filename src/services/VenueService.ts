// Internal Imports
import type { CreateVenueDTO, UpdateVenueDTO } from '@/dtos/VenueDTO.js';
import type { VenueInterface } from '@/interfaces/VenueInterface.js';
import { useVenueStore } from '@/stores/venuestore.js';
import Utils from '@/utils/Utils.js';

// Service Class
export class VenueService {
  static getAll(): VenueInterface[] {
    return useVenueStore().venues;
  }

  static getById(id: number): VenueInterface | undefined {
    return useVenueStore().venues.find((venue) => venue.id === id);
  }

  static create(venueDTO: CreateVenueDTO): VenueInterface {
    const store = useVenueStore();

    const newVenue: VenueInterface = {
      ...venueDTO,
      id: Utils.generateNextId(store.venues),
      eventIds: venueDTO.eventIds ?? [],
    };

    store.venues.push(newVenue);
    return newVenue;
  }

  static update(id: number, venueDTO: UpdateVenueDTO): boolean {
    const store = useVenueStore();
    const index = store.venues.findIndex((venue) => venue.id === id);

    if (index === -1) {
      return false;
    }

    const currentVenue = store.venues[index];
    if (!currentVenue) {
      return false;
    }

    store.venues[index] = {
      ...currentVenue,
      ...venueDTO,
      id,
    };

    return true;
  }

  static delete(id: number): boolean {
    const store = useVenueStore();
    const initialLength = store.venues.length;
    store.venues = store.venues.filter((venue) => venue.id !== id);
    return store.venues.length < initialLength;
  }

  static getUniqueCities(): string[] {
    const venues = this.getAll();
    const cities = venues.map((venue) => venue.city);
    return Array.from(new Set(cities));
  }

  static getByCity(citySelector: string): VenueInterface[] {
    if (!citySelector || citySelector === 'All') {
      return this.getAll();
    }
    return this.getAll().filter((venue) => venue.city === citySelector);
  }
}
