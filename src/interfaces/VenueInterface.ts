/**
 * ============================================================================
 * INTERFACE: VenueInterface
 * Responsibility: Defines the data contract for an event's location/venue.
 * Programming Rule: 1.2 (Domain Typing) & 2 (Interfaces in src/interfaces/).
 * ============================================================================
 */
export interface VenueInterface {
  /** Name of the venue or place (e.g., "Madison Square Garden", "Metropolitan Theater") */
  name: string;

  /** Physical street address */
  address: string;

  /** City where the event is hosted (crucial for city-based filtering) */
  city: string;

  /** Maximum attendance capacity of the venue */
  capacity: number;
}
