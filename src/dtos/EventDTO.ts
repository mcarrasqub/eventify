// Imports
import type { EventInterface } from '@/interfaces/EventInterface.js';

// DTO Definitions
export type CreateEventDTO = Omit<EventInterface, 'id' | 'createdAt' | 'updatedAt'> & {
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateEventDTO = Partial<CreateEventDTO>;
