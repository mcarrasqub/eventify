import type { VenueInterface } from './VenueInterface';

/**
 * Valid event categories in Eventify.
 * Using a union type prevents typos and magic strings across the codebase.
 */
export type EventCategory = 'Concert' | 'Festival' | 'Conference' | 'Fair' | 'Theater';

/**
 * Event lifecycle status.
 */
export type EventStatus = 'Active' | 'Draft' | 'Completed' | 'Cancelled';

/**
 * ============================================================================
 * INTERFACE: EventInterface
 * Responsibility: Represents the core Event entity across the system.
 * Programming Rule: 1.2 (Domain Typing) & 2 (Interfaces in src/interfaces/).
 * ============================================================================
 */
export interface EventInterface {
  /** Unique identifier for the event (e.g., "evt_1700000000000") */
  id: string;

  /** Descriptive title/name of the event */
  title: string;

  /** Comprehensive event description */
  description: string;

  /** Category classification */
  category: EventCategory;

  /** Date in ISO format (YYYY-MM-DD) */
  date: string;

  /** Time in 24h format (HH:mm) */
  time: string;

  /** Base ticket price */
  price: number;

  /** Total number of tickets available for sale */
  totalTickets: number;

  /** Number of tickets sold so far */
  soldTickets: number;

  /** Current lifecycle status */
  status: EventStatus;

  /** Promotional cover image URL */
  imageUrl: string;

  /** Venue where the event takes place (typed VenueInterface object) */
  venue: VenueInterface;

  /** Creation timestamp (ISO string) */
  createdAt: string;
}
