// Internal Imports
import { BaseService } from '@/services/BaseService.js';
import type { CreateVenueDTO, UpdateVenueDTO } from '@/dtos/VenueDTO.js';
import type { VenueInterface } from '@/interfaces/VenueInterface.js';

// Service Class
export class VenueService extends BaseService {
  // CRUD Methods
  static async create(venueDTO: CreateVenueDTO): Promise<VenueInterface> {
    return await this.post<VenueInterface>('/venues', venueDTO);
  }

  static async update(id: number, venueDTO: UpdateVenueDTO): Promise<VenueInterface> {
    return await this.patch<VenueInterface>(`/venues/${id}`, venueDTO);
  }

  static async delete(id: number): Promise<void> {
    await this.deleteHttp(`/venues/${id}`);
  }

  // Getters
  static async getAll(): Promise<VenueInterface[]> {
    return await this.get<VenueInterface[]>('/venues');
  }

  static async getById(id: number): Promise<VenueInterface> {
    return await this.get<VenueInterface>(`/venues/${id}`);
  }
}
