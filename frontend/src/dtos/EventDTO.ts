// Imports
import type { EventInterface } from '@/interfaces/EventInterface.js';

// DTO Definitions
export type CreateEventDTO = Omit<EventInterface, 'id'>;

export type UpdateEventDTO = Partial<CreateEventDTO>;

export interface EventSummaryDTO {
  totalEvents: number;
  citiesCovered: number;
  topCity: string;
  topCityEventCount: number;
}

export interface EventsByCityDTO {
  city: string;
  eventCount: number;
  percentage: number;
}
