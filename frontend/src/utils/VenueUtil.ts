// Internal Imports
import type { VenueInterface } from '@/interfaces/VenueInterface.js';

export class VenueUtil {
  static getUniqueCities(venues: VenueInterface[]): string[] {
    const cities = venues.map((venue) => venue.city);
    return Array.from(new Set(cities));
  }
}
