// Imports
import type { VenueInterface } from '@/interfaces/VenueInterface.js';

// DTO Definitions
export type CreateVenueDTO = Omit<VenueInterface, 'id'>;

export type UpdateVenueDTO = Partial<CreateVenueDTO>;
