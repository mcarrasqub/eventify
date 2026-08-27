// Imports
import type { EventInterface } from '@/interfaces/EventInterface.js';

// DTO Definitions
export type CreateEventDTO = Omit<EventInterface, 'id'>;

export type UpdateEventDTO = Partial<CreateEventDTO>;
