// Internal Imports
import type { CreateVenueDTO, UpdateVenueDTO } from '@/dtos/VenueDTO.js';
import httpClient from '@/utils/httpClient.js';
import type { VenueInterface } from '@/interfaces/VenueInterface.js';

// Service Class
export class VenueService {
  // CRUD Methods
  static async create(venueDTO: CreateVenueDTO): Promise<VenueInterface> {
    const response = await httpClient.post<VenueInterface>('/venues', venueDTO);
    return response.data;
  }

  static async update(id: number, venueDTO: UpdateVenueDTO): Promise<VenueInterface> {
    const response = await httpClient.patch<VenueInterface>(`/venues/${id}`, venueDTO);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await httpClient.delete(`/venues/${id}`);
  }

  // Getters
  static async getAll(): Promise<VenueInterface[]> {
    const response = await httpClient.get<VenueInterface[]>('/venues');
    return response.data;
  }

  static async getById(id: number): Promise<VenueInterface> {
    const response = await httpClient.get<VenueInterface>(`/venues/${id}`);
    return response.data;
  }

  static getUniqueCities(venues: VenueInterface[]): string[] {
    const cities = venues.map((venue) => venue.city);
    return Array.from(new Set(cities));
  }
}
